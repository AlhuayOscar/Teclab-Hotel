import { test, expect } from "@playwright/test";

test("Visit a listing card", async ({ page }) => {
  await page.goto("http://localhost:3000/en");

  const maxRetry = 3;
  let randomListingCard = null;
  let state = "retrying";

  for (let i = 0; i < maxRetry; i++) {
    const listingCards = await page.$$("#listingCard");
    const randomIndex = Math.floor(Math.random() * listingCards.length);
    randomListingCard = listingCards[randomIndex] ?? null;

    switch (state) {
      case "retrying":
        if (randomListingCard !== null) {
          state = "found";
        } else if (i === maxRetry - 1) {
          console.error(
            "💥💥💥 This test couldn't click the card after 3 retries."
          );
          return;
        }
        break;
      default:
        break;
    }

    if (state === "found") {
      break;
    } else {
      console.warn("Retrying to find a random card...");
    }
  }

  const initialUrl = page.url();
  await randomListingCard!.click();
  await page.waitForTimeout(3000);
  const finalUrl = page.url();
  expect(finalUrl).not.toBe(initialUrl);
  console.log("✔✔✔ Random card found");
  expect(finalUrl.includes("listings")).toBeTruthy();
});
