import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sessionCookieName } from "@/config/auth";
import { createSessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type GoogleTokenResponse = {
  access_token?: string;
};

type GoogleUserInfo = {
  sub: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? requestUrl.origin;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? `${appUrl}/api/auth/google/callback`;

  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/login?erro=Sessao Google invalida.", appUrl));
  }

  if (!code || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.redirect(new URL("/login?erro=Falha no login com Google.", appUrl));
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    })
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL("/login?erro=Google nao autorizou o acesso.", appUrl));
  }

  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

  if (!tokenData.access_token) {
    return NextResponse.redirect(new URL("/login?erro=Token do Google ausente.", appUrl));
  }

  const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  });

  if (!userInfoResponse.ok) {
    return NextResponse.redirect(new URL("/login?erro=Nao foi possivel ler o perfil Google.", appUrl));
  }

  const googleUser = (await userInfoResponse.json()) as GoogleUserInfo;

  if (!googleUser.email_verified) {
    return NextResponse.redirect(new URL("/login?erro=Email Google nao verificado.", appUrl));
  }

  const user = await prisma.user.upsert({
    where: { email: googleUser.email.toLowerCase() },
    update: {
      name: googleUser.name ?? googleUser.email,
      imageUrl: googleUser.picture
    },
    create: {
      email: googleUser.email.toLowerCase(),
      name: googleUser.name ?? googleUser.email,
      imageUrl: googleUser.picture,
      accounts: {
        create: {
          provider: "google",
          providerAccountId: googleUser.sub
        }
      }
    }
  });

  await prisma.oAuthAccount.upsert({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: googleUser.sub
      }
    },
    update: { userId: user.id },
    create: {
      provider: "google",
      providerAccountId: googleUser.sub,
      userId: user.id
    }
  });

  const response = NextResponse.redirect(new URL("/perfil", appUrl));
  response.cookies.delete("google_oauth_state");

  response.cookies.set(
    sessionCookieName,
    createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    }
  );

  return response;
}
