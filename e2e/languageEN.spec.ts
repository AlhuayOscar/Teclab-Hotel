import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Be a room owner")).toBeVisible();
  await page.getByRole("button", { name: "ES Flag" }).click();
  await page.waitForURL("**/es");
});
