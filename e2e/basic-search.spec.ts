import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.locator(".p-3").first().click();
  await page.getByText("🇦🇼Aruba,Americas").click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^\+− Leaflet \| © OpenStreetMap contributors$/ })
      .first()
  ).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await page.locator("button:nth-child(3)").first().click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^VisitorsHow many people are coming\?1$/ })
      .getByRole("img")
      .nth(1)
  ).toBeVisible();
  await page.getByText("2", { exact: true }).click();
  await page
    .locator("div:nth-child(4) > div:nth-child(2) > div:nth-child(3)")
    .click();
  await page.getByText("2", { exact: true }).nth(1).click();
  await page
    .locator("div:nth-child(6) > div:nth-child(2) > div:nth-child(3)")
    .click();
  await page.getByText("2", { exact: true }).nth(2).click();
  await page.getByRole("button", { name: "Search" }).click();
  await page
    .locator("div")
    .filter({ hasText: "Americas, ArubaCold Areas$" })
    .nth(1)
    .click();
});
