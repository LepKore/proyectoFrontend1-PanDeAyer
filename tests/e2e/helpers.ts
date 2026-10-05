import { expect, type APIResponse, type Page } from "@playwright/test";

export type Role = "admin" | "docente" | "estudiante";

export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3000";

// Usuarios de prueba del README (todos con la misma clave)
export const USERS: Record<Role, { email: string; password: string }> = {
  admin: { email: "admin@universidad.edu", password: "Secret123!" },
  docente: { email: "laura.lopez89@universidad.edu", password: "Secret123!" },
  estudiante: { email: "juliana.herrera147@universidad.edu", password: "Secret123!" },
};

// true si el backend responde (con cualquier codigo). Las pruebas que lo necesitan se saltan si esta apagado
export async function isBackendUp(): Promise<boolean> {
  try {
    await fetch(BACKEND_URL, { signal: AbortSignal.timeout(3000) });
    return true;
  } catch {
    return false;
  }
}

// JWT falso (sin firma valida). Sirve para probar src/proxy.ts, que solo LEE el token y no lo valida
export function fakeToken(role: Role, { expired = false } = {}): string {
  const exp = Math.floor(Date.now() / 1000) + (expired ? -3600 : 3600);
  const b64 = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  return `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ sub: "test-user", email: `${role}@test.edu`, role, exp })}.firma`;
}

export async function setSessionCookie(page: Page, token: string) {
  await page.context().addCookies([{ name: "token", value: token, url: "http://localhost:3001" }]);
}

// Inicia sesion contra el backend real; la cookie httpOnly queda guardada en el contexto del navegador
export async function loginAs(page: Page, role: Role) {
  const res = await page.request.post("/api/auth/login", { data: USERS[role] });
  expect(res.ok(), `login de ${role} fallo: ${res.status()} ${await res.text()}`).toBeTruthy();
}

// Junta los errores de JavaScript y de consola que ocurran en la pagina
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

// Ruta a la que redirige una respuesta (el header Location puede venir relativo)
export function redirectPath(res: APIResponse): string {
  return new URL(res.headers().location ?? "", "http://localhost").pathname;
}
