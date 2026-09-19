import { expect, test, type Locator, type Page } from "@playwright/test";
import { siteConfig } from "@/config/site";

const sectionIds = ["sobre-mi", "proyectos", "stack", "experiencia", "contacto"];

// Clicks before hydration are silently dropped. React tags hydrated DOM
// nodes with a __reactFiber key, so wait for it before interacting.
async function waitForHydration(locator: Locator) {
  await expect
    .poll(() =>
      locator.evaluate((el) =>
        Object.keys(el).some((key) => key.startsWith("__reactFiber")),
      ),
    )
    .toBe(true);
}

// Chrome drops a smooth scroll if another one is still running, so anchor
// activations have to be spaced out.
async function waitForScrollToSettle(page: Page) {
  await expect
    .poll(async () => {
      const before = await page.evaluate(() => window.scrollY);
      await page.waitForTimeout(100);
      return before === (await page.evaluate(() => window.scrollY));
    })
    .toBe(true);
}

test("muestra el hero y todas las secciones sin errores", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");

  await expect(page).toHaveTitle(`${siteConfig.name} — ${siteConfig.role}`);
  await expect(
    page.getByRole("heading", { level: 1, name: siteConfig.name }),
  ).toBeVisible();
  for (const name of [
    "Sobre mí",
    "Proyectos",
    "Stack y herramientas",
    "Experiencia y educación",
    "Contacto",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeAttached();
  }
  expect(errors).toEqual([]);
});

test("el tema oscuro es el predeterminado y el cambio persiste al recargar", async ({
  page,
}) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: "Cambiar tema" });

  await expect(html).toHaveClass(/\bdark\b/);
  await waitForHydration(toggle);
  await toggle.click();
  await expect(html).not.toHaveClass(/\bdark\b/);

  await page.reload();
  await expect(html).not.toHaveClass(/\bdark\b/);
});

test("el menú lleva a cada sección", async ({ page, isMobile }) => {
  test.skip(isMobile, "El menú de secciones está oculto en móvil");
  await page.goto("/");
  const nav = page.getByRole("navigation");

  for (const [name, id] of [
    ["Proyectos", "proyectos"],
    ["Sobre mí", "sobre-mi"],
    ["Stack", "stack"],
    ["Contacto", "contacto"],
  ]) {
    await waitForScrollToSettle(page);
    await nav.getByRole("link", { name }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport({ timeout: 15_000 });
  }
});

test("con teclado se puede saltar el header e ir a proyectos", async ({
  page,
}) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();

  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  const cta = page.getByRole("link", { name: "Ver proyectos" });
  await expect(cta).toBeFocused();

  await waitForScrollToSettle(page);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#proyectos$/);
  await expect(page.locator("#proyectos")).toBeInViewport({ timeout: 15_000 });
});

test("la página no se desborda horizontalmente", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test.describe("animaciones de entrada", () => {
  test.skip(({ isMobile }) => isMobile, "Usa un viewport de escritorio fijo");

  // Regression: a `cover` animation range left the last section stuck at
  // 70-82% opacity on tall viewports.
  test("todas las secciones quedan opacas al llegar al final en pantallas altas", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 2000 });
    await page.goto("/");
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toHaveCSS("opacity", "1");
    }
  });

  test("al imprimir ninguna sección queda invisible", async ({ page }) => {
    await page.goto("/");
    await page.emulateMedia({ media: "print" });
    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toHaveCSS("opacity", "1");
    }
  });
});
