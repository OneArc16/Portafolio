import { expect, test } from "@playwright/test";

test("expone metadatos para compartir con URLs absolutas", async ({
  page,
  request,
  baseURL,
}) => {
  await page.goto("/");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    baseURL!,
  );
  const ogImage = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  expect(ogImage).toMatch(new RegExp(`^${baseURL}/opengraph-image`));

  const image = await request.get(ogImage!);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toBe("image/png");
});

test("sirve robots.txt y sitemap.xml con el dominio del sitio", async ({
  request,
  baseURL,
}) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`Sitemap: ${baseURL}/sitemap.xml`);

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(`<loc>${baseURL}/</loc>`);
});

test("sirve el favicon generado", async ({ request }) => {
  const icon = await request.get("/icon");
  expect(icon.status()).toBe(200);
  expect(icon.headers()["content-type"]).toBe("image/png");
});
