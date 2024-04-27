import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.locator(".p-4").click();
  await page.getByText("Sign up").click();
  await page.locator("#email").click();
  await page.locator("#email").fill("aaaaaaaaaaaa");
  await page.locator("#name").click();
  await page.locator("#name").fill("aaaaaaaaaaaa");
  await page.locator("#password").click();
  await page.locator("#password").fill("aaaaaaaaaaaa");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
});
