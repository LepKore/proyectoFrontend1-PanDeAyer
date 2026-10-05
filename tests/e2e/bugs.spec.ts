import { test, expect } from "@playwright/test";
import { fakeToken, redirectPath } from "./helpers";

// Cada prueba describe el comportamiento CORRECTO. Si falla, el bug sigue presente.

test.describe("bugs de login", () => {
  test("con clave incorrecta muestra el error del backend y no 'sesion vencida'", async ({ page }) => {
    // El backend responde 401 cuando la clave esta mal; src/lib/api.ts trata TODO 401 como sesion vencida
    await page.route("**/api/auth/login", (route) =>
      route.fulfill({ status: 401, json: { message: "Credenciales invalidas" } }),
    );
    await page.goto("/login");

    await page.getByLabel("Correo institucional").fill("admin@universidad.edu");
    await page.getByLabel("Contraseña").fill("clave-equivocada");
    await page.getByRole("button", { name: "Ingresar" }).click();

    await expect(page.locator("form").getByRole("alert")).toHaveText("Credenciales invalidas");
    await expect(page).not.toHaveURL(/expired=1/);
  });
});

test.describe("bugs de permisos por rol (src/proxy.ts)", () => {
  // Solo se revisa la ruta exacta (/admin), no sus subrutas (/admin/usuarios, ...)
  const cases = [
    { role: "estudiante", path: "/admin/usuarios", home: "/estudiante" },
    { role: "docente", path: "/admin/facultades", home: "/docente" },
    { role: "estudiante", path: "/docente/grupos", home: "/estudiante" },
    { role: "docente", path: "/estudiante/notas", home: "/docente" },
  ] as const;

  for (const { role, path, home } of cases) {
    test(`un ${role} que abre ${path} vuelve a ${home}`, async ({ request }) => {
      const res = await request.get(path, {
        headers: { cookie: `token=${fakeToken(role)}` },
        maxRedirects: 0,
      });
      expect(res.status(), `${role} pudo cargar ${path}`).toBe(307);
      expect(redirectPath(res)).toBe(home);
    });
  }
});
