import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-127
 * Title: [OP-13] Verify homepage loads successfully with correct page title
 * Type: Positive
 * Priority: High
 *
 * Preconditions: None required. Application URL is https://blazedemo.com/
 */
test.describe('OP-13 - Homepage Load Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-127: Verify homepage loads with correct title and heading', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads without errors
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Observe the heading text on the page
    await test.step('Observe the heading text on the page', async () => {
      // Locate the main heading (h1) element
      const heading = page.locator('h1');
      // Assert: The page displays heading: "Welcome to the Simple Travel Agency!"
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
    });
  });
});
