import { defineConfig, devices } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

// Carga .env.local igual que Next, para que las pruebas usen el mismo BACKEND_URL que la app
loadEnvConfig(process.cwd());

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Pruebas end-to-end (deteccion de bugs). Ver tests/e2e.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Descomentar para probar en mas navegadores / moviles
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  ],

  // Levanta el frontend antes de las pruebas (o reutiliza el que ya este corriendo)
  webServer: {
    command: "npm run dev",
    url: `${BASE_URL}/login`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
