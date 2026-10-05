import { test, expect } from "@playwright/test";
import { COMMON_NAV, NAV } from "../../src/lib/nav";
import { BACKEND_URL, collectErrors, isBackendUp, loginAs, type Role } from "./helpers";

// Recorre TODAS las pantallas del menu de cada rol con el backend real y busca errores.
// Necesita el backend encendido (ver README); si esta apagado estas pruebas se saltan.

test.beforeAll(async () => {
  test.skip(!(await isBackendUp()), `Backend apagado en ${BACKEND_URL}`);
});

const ROLES: Role[] = ["estudiante", "docente", "admin"];

for (const role of ROLES) {
  test.describe(`rol ${role}`, () => {
    test.beforeEach(async ({ page }) => {
      await loginAs(page, role);
    });

    for (const item of [...NAV[role], ...COMMON_NAV]) {
      test(`${item.label} (${item.href}) carga sin errores`, async ({ page }) => {
        const errors = collectErrors(page);

        const res = await page.goto(item.href);

        expect(res?.status(), "codigo HTTP").toBeLessThan(400);
        await expect(page).toHaveURL(new RegExp(`${item.href}$`));
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.getByText(/Error inesperado|Application error|Unhandled Runtime Error/)).toHaveCount(0);
        expect(errors, "errores de consola / JavaScript").toEqual([]);
      });
    }

    test("cerrar sesion vuelve al login", async ({ page }) => {
      await page.goto(NAV[role][0].href);
      await page.getByRole("button", { name: "Cerrar sesión" }).click();
      await expect(page).toHaveURL(/\/login/);

      await page.goto(NAV[role][0].href);
      await expect(page).toHaveURL(/\/login$/);
    });
  });
}

test("el login real rechaza una clave incorrecta con un mensaje claro", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Correo institucional").fill("admin@universidad.edu");
  await page.getByLabel("Contraseña").fill("clave-equivocada");
  await page.getByRole("button", { name: "Ingresar" }).click();

  await expect(page.locator("form").getByRole("alert")).toBeVisible();
  await expect(page.locator("form").getByRole("alert")).not.toHaveText(/sesión venció/);
});
