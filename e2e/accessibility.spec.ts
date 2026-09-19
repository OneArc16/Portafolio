import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const theme of ["dark", "light"] as const) {
  test(`sin violaciones de axe en el tema ${theme}`, async ({ page }) => {
    await page.addInitScript((value) => {
      localStorage.setItem("theme", value);
    }, theme);
    // Scroll reveals keep sections transparent until scrolled into view,
    // which would hide them from the contrast checks.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const { violations } = await new AxeBuilder({ page }).analyze();
    const summary = violations.map((v) => ({
      rule: v.id,
      nodes: v.nodes.map((n) => n.target.join(" ")),
    }));
    expect(summary).toEqual([]);
  });
}
