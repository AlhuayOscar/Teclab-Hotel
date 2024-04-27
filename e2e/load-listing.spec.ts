import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const listingCards = await page.$$("#listingCard");

  const randomIndex = Math.floor(Math.random() * listingCards.length);
  const randomListingCard = listingCards[randomIndex];
  if (randomListingCard) {
    const initialUrl = page.url();
    await randomListingCard.click();
    await page.waitForTimeout(3000);
    const finalUrl = page.url();
    expect(finalUrl).not.toBe(initialUrl);
    console.log(
      "✔✔✔ Random card found"
    );
  } else {
    console.error(
      "💥💥💥 This test couldn't click the card by some reason, You should retry"
    );
  }
});
