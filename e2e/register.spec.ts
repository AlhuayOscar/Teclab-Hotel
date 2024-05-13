import { test, expect } from "@playwright/test";

test("Shouldn't register", async ({ page }) => {
  await page.goto("https://teclab-hotel.vercel.app/en");
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
