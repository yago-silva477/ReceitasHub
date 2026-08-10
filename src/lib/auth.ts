import crypto from "crypto";
import { cookies } from "next/headers";
import { sessionCookieName } from "@/config/auth";
import { prisma } from "@/lib/prisma";

type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  exp: number;
};

const encoder = new TextEncoder();

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function getAuthSecret() {
  return process.env.AUTH_SECRET ?? "dev-secret-change-before-production";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const hash = crypto.scryptSync(password, salt, 64).toString("base64url");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const hash = crypto.scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHash, "base64url");

  return stored.length === hash.length && crypto.timingSafeEqual(stored, hash);
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createPasswordResetToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">) {
  const expiresInSeconds = 60 * 60 * 24 * 7;
  const sessionPayload: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64Url(JSON.stringify(sessionPayload));
  const signature = sign(`${header}.${body}`);

  return `${header}.${body}.${signature}`;
}

export function verifySessionToken(token?: string): SessionPayload | null {
  if (!token) {
    return null;
  }

  const [header, body, signature] = token.split(".");

  if (!header || !body || !signature) {
    return null;
  }

  const expectedSignature = sign(`${header}.${body}`);
  const signatureBytes = encoder.encode(signature);
  const expectedBytes = encoder.encode(expectedSignature);

  if (
    signatureBytes.length !== expectedBytes.length ||
    !crypto.timingSafeEqual(signatureBytes, expectedBytes)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string) {
  cookies().set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearSessionCookie() {
  cookies().delete(sessionCookieName);
}

export async function getCurrentUser() {
  const token = cookies().get(sessionCookieName)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.sub },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      bio: true,
      role: true,
      createdAt: true
    }
  });
}
