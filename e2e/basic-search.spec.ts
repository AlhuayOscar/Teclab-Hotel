import { test, expect } from "@playwright/test";

test("Searchbar works with Map Api + rentModal", async ({ page }) => {
  await page.goto("http://localhost:3000/en");
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Hotel roomsBeach Housesin 1 click$/ })
      .first()
  ).toBeVisible();
  await page
    .locator("div")
    .filter({ hasText: /^Hotel roomsBeach Housesin 1 click$/ })
    .first()
    .click();
  await page.locator(".p-3").first().click();
  await page.locator('div[role="option"]').first().click();
  await expect(
    page
      .locator("div")
      .filter({
        hasText: /.+/,
      })
      .first()
  ).toBeVisible();
  await page.getByRole("button", { name: "Marker" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.locator("button:nth-child(3)").first()).toBeVisible();
  await page.locator("button:nth-child(3)").first().click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("1", { exact: true }).first()).toBeVisible();
  await page.getByText("1", { exact: true }).first().click();
  await expect(page.locator("div:nth-child(3)").first()).toBeVisible();
  await page.locator("div:nth-child(3)").first().click();
  await expect(page.getByText("2", { exact: true })).toBeVisible();
  await page.getByText("2", { exact: true }).click();
  await expect(page.getByText("1", { exact: true }).first()).toBeVisible();
  await page.getByText("1", { exact: true }).first().click();
  await expect(
    page.locator("div:nth-child(4) > div:nth-child(2) > div:nth-child(3)")
  ).toBeVisible();
  await page
    .locator("div:nth-child(4) > div:nth-child(2) > div:nth-child(3)")
    .click();
  await expect(page.getByText("2", { exact: true }).nth(1)).toBeVisible();
  await page.getByText("2", { exact: true }).nth(1).click();
  await expect(page.getByText("1", { exact: true })).toBeVisible();
  await page.getByText("1", { exact: true }).click();
  await expect(
    page.locator("div:nth-child(6) > div:nth-child(2) > div:nth-child(3)")
  ).toBeVisible();
  await page
    .locator("div:nth-child(6) > div:nth-child(2) > div:nth-child(3)")
    .click();
  await expect(page.getByText("2", { exact: true }).nth(2)).toBeVisible();
  await page.getByText("2", { exact: true }).nth(2).click();
  await page.getByRole("button", { name: "Search" }).click();
  await expect(
    page.locator("div").filter({ hasText: "Americas, ArubaCold Areas$" }).nth(1)
  ).toBeVisible();
});
