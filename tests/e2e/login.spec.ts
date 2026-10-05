import { test, expect } from "@playwright/test";
import { fakeToken, redirectPath, setSessionCookie } from "./helpers";

// Pruebas del login con la API simulada (page.route): no necesitan el backend encendido

test.describe("login con API simulada", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("muestra el formulario de ingreso", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Bienvenido de nuevo" })).toBeVisible();
    await expect(page.getByLabel("Correo institucional")).toBeVisible();
    await expect(page.getByLabel("Contraseña")).toBeVisible();
  });

  test("el boton Ingresar esta deshabilitado hasta llenar ambos campos", async ({ page }) => {
    const submit = page.getByRole("button", { name: "Ingresar" });
    await expect(submit).toBeDisabled();

    await page.getByLabel("Correo institucional").fill("admin@universidad.edu");
    await expect(submit).toBeDisabled();

    await page.getByLabel("Contraseña").fill("Secret123!");
    await expect(submit).toBeEnabled();
  });

  test("envia correo y clave al endpoint de login", async ({ page }) => {
    await page.route("**/api/auth/login", (route) => route.fulfill({ status: 500, json: { message: "simulado" } }));

    await page.getByLabel("Correo institucional").fill("admin@universidad.edu");
    await page.getByLabel("Contraseña").fill("Secret123!");
    const [request] = await Promise.all([
      page.waitForRequest("**/api/auth/login"),
      page.getByRole("button", { name: "Ingresar" }).click(),
    ]);

    expect(request.method()).toBe("POST");
    expect(request.postDataJSON()).toEqual({ email: "admin@universidad.edu", password: "Secret123!" });
  });

  test("muestra un aviso si el servidor no responde", async ({ page }) => {
    await page.route("**/api/auth/login", (route) =>
      route.fulfill({ status: 502, json: { message: "No se pudo conectar con el servidor" } }),
    );

    await page.getByLabel("Correo institucional").fill("admin@universidad.edu");
    await page.getByLabel("Contraseña").fill("Secret123!");
    await page.getByRole("button", { name: "Ingresar" }).click();

    await expect(page.locator("form").getByRole("alert")).toHaveText("No se pudo conectar con el servidor");
    await expect(page.getByRole("button", { name: "Ingresar" })).toBeEnabled();
  });

  test("muestra un aviso si se cae la red", async ({ page }) => {
    await page.route("**/api/auth/login", (route) => route.abort());

    await page.getByLabel("Correo institucional").fill("admin@universidad.edu");
    await page.getByLabel("Contraseña").fill("Secret123!");
    await page.getByRole("button", { name: "Ingresar" }).click();

    await expect(page.locator("form").getByRole("alert")).toHaveText("No hay conexion con el servidor");
  });
});

test.describe("sesion y redirecciones (src/proxy.ts)", () => {
  test("sin sesion, cualquier pagina privada manda al login", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("con ?expired=1 avisa que la sesion vencio", async ({ page }) => {
    await page.goto("/login?expired=1");
    await expect(page.locator("form").getByRole("alert")).toHaveText("Tu sesión venció. Ingresa de nuevo.");
  });

  test("un token vencido cuenta como sin sesion", async ({ page }) => {
    await setSessionCookie(page, fakeToken("admin", { expired: true }));
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("con sesion, el login redirige al inicio del rol", async ({ request }) => {
    const res = await request.get("/login", {
      headers: { cookie: `token=${fakeToken("docente")}` },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(307);
    expect(redirectPath(res)).toBe("/docente");
  });

  test("un rol no puede entrar al inicio de otro rol", async ({ request }) => {
    const res = await request.get("/admin", {
      headers: { cookie: `token=${fakeToken("estudiante")}` },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(307);
    expect(redirectPath(res)).toBe("/estudiante");
  });
});
