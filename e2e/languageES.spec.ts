import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/es");
  await expect(page.getByText("Publicá tu propiedad")).toBeVisible();
  await page.getByRole("button", { name: "US Flag" }).click();
  await page.waitForURL("**/");
});
