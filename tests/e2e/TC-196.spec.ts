import { test, expect } from '@playwright/test';

/**
 * TC-196: [POS] TC-01: Verify homepage loads successfully with correct title
 *
 * Preconditions:
 * 1. Browser is launched and ready.
 * 2. No prior session/cache required.
 *
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 *    - Expected: The homepage loads successfully.
 * 2. Observe the page heading/title text.
 *    - Expected: The page displays the heading: "Welcome to the Simple Travel Agency!"
 */
test.describe('OP-13 — Homepage Title Verification', () => {
  test('TC-196: Verify homepage loads with correct title and heading', async ({ page }) => {
    // Step 1: Navigate to the application under test
    await page.goto('https://blazedemo.com/');

    // Verify the homepage loaded by checking the URL contains the base domain
    await expect(page).toHaveURL(/blazedemo\.com/);

    // Step 2: Observe the page heading/title text
    // The main heading should be "Welcome to the Simple Travel Agency!"
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');

    // Additionally verify the page title (browser tab text)
    await expect(page).toHaveTitle(/BlazeDemo/);
  });
});
