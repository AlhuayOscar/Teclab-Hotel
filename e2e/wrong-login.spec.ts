import { test, expect } from "@playwright/test";

test("Shouldn't login", async ({ page }) => {
  await page.goto("http://localhost:3000/en");
  await page.locator("#userMenu").click();
  await page.getByText("Login").click();
  await page.locator("#email").click();
  await page.locator("#email").fill("aaaaaaaaa");
  await page.locator("#password").click();
  await page.locator("#password").fill("aaaaaaaaaaaa");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Invalid credentials" })
  ).toBeVisible();
});
