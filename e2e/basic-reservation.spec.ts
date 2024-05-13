import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://teclab-hotel.vercel.app");
  await page.locator("#userMenu").click();
  await page.getByText("Login").click();
  await page.locator("#email").click();
  await page.locator("#email").fill("aaa");
  await page.locator("#email").press("Alt+6");
  await page.locator("#email").press("Alt+4");
  await page.locator("#email").fill("aaa@aaa.com");
  await page.locator("#password").click();
  await page.locator("#password").fill("aaa123");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.locator("div").filter({ hasText: "Logged in" }).nth(2)
  ).toBeVisible();
  await page.locator("#userMenu").click();
  await page.locator("#userMenu").click();
  await page.locator("#userMenu").click();
  await page.getByText("Be a room owner").click();
  await page.locator(".rounded-xl").first().click(); // This one on chromium gets stuck.
  await page.getByRole("button", { name: "Next" }).click();
  await page.locator(".p-3").first().click();
  await page.getByText("🇦🇼Aruba,Americas").click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.locator("#title").click();
  await page.locator("#title").fill("TestListing");
  await page.locator("#description").click();
  await page.locator("#description").fill("TestDescListing");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByPlaceholder(" ").click();
  await page.getByPlaceholder(" ").fill("99999");
  await page.getByRole("button", { name: "Create" }).click();
  await page
    .locator("div")
    .filter({ hasText: "Listing created!" })
    .nth(2)
    .click();
  await page
    .locator("div")
    .filter({ hasText: "Americas, ArubaBeach House$ 99999per night" })
    .nth(2)
    .click();
  await page.locator("#userMenu").click();
  await page.locator("#userMenu").click();
  await expect(page.getByText(/Hosted by .*aaa123.*/)).toBeVisible();
  await page.getByText("Guests1 Rooms1 Bathrooms").click();
  await page.locator(".col-span-4 > div:nth-child(3) > div").click();
  await page.locator("svg").nth(2).click();
  await page.getByText("Beach House", { exact: true }).click();
  await page.getByText("This property is so close to").click();
  await page.getByText("TestDescListing").click();
  await page.getByText("$ 99999per night").click();
  await page.getByText("Total$").click();
  await page.getByText("$").nth(1).click();
  await page.getByRole("button", { name: "Reserve" }).click();
  await page
    .locator("div")
    .filter({ hasText: "Listing reserved!" })
    .nth(2)
    .click();
  await page.locator("#listingCard").nth(1).click();
  await page.waitForURL(/^(?!\/(es|\/)$).*/);
  await page.locator("#userMenu").click();
  await page.getByText("My trips").click();
  await page.waitForURL("**/trips");
  if (page.locator("#listingCard")) {
    if (page.getByRole("button", { name: "Cancel reservation" })) {
      await page.getByRole("button", { name: "Cancel reservation" }).first().click();
    } else {
      await page.getByRole("button", { name: "Cancel reservation" }).click();
    }
  } else {
    await page.locator("#userMenu").click();
    await page.getByText("Logout").click();
  }
});
