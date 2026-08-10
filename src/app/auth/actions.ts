"use server";

import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  createPasswordResetToken,
  createSessionToken,
  hashPassword,
  hashToken,
  setSessionCookie,
  verifyPassword
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectWithError(path: string, message: string) {
  redirect(`${path}?erro=${encodeURIComponent(message)}`);
}

export async function registerAction(formData: FormData) {
  const name = readString(formData, "name");
  const email = normalizeEmail(readString(formData, "email"));
  const password = readString(formData, "password");

  if (name.length < 2) {
    redirectWithError("/cadastro", "Informe seu nome.");
  }

  if (!email.includes("@")) {
    redirectWithError("/cadastro", "Informe um email valido.");
  }

  if (password.length < 8) {
    redirectWithError("/cadastro", "A senha precisa ter pelo menos 8 caracteres.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    redirectWithError("/cadastro", "Este email ja esta cadastrado.");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPassword(password)
    }
  });

  setSessionCookie(
    createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  );

  redirect("/perfil");
}

export async function loginAction(formData: FormData) {
  const email = normalizeEmail(readString(formData, "email"));
  const password = readString(formData, "password");

  if (!email || !password) {
    redirectWithError("/login", "Informe email e senha.");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
    redirectWithError("/login", "Email ou senha invalidos.");
  }

  setSessionCookie(
    createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  );

  redirect("/perfil");
}

export async function logoutAction() {
  clearSessionCookie();
  redirect("/login");
}

export async function requestPasswordResetAction(formData: FormData) {
  const email = normalizeEmail(readString(formData, "email"));
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const token = createPasswordResetToken();

    await prisma.passwordResetToken.create({
      data: {
        tokenHash: hashToken(token),
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30)
      }
    });

    console.info(`Password reset token for ${email}: ${token}`);
  }

  redirect("/recuperar-senha/enviado");
}

export async function resetPasswordAction(formData: FormData) {
  const token = readString(formData, "token");
  const password = readString(formData, "password");

  if (password.length < 8) {
    redirectWithError("/recuperar-senha/nova", "A senha precisa ter pelo menos 8 caracteres.");
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true }
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    redirectWithError("/recuperar-senha/nova", "Token invalido ou expirado.");
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash: hashPassword(password) }
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() }
    })
  ]);

  redirect(`/login?sucesso=${encodeURIComponent("Senha atualizada. Entre novamente.")}`);
}
