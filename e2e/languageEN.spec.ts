import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://teclab-hotel.vercel.app");
  await expect(page.getByText("Be a room owner")).toBeVisible();
  await page.getByRole("button", { name: "ES Flag" }).click();
  await page.waitForURL("**/es");
});
