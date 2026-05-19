import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-165 — [OP-13] Homepage loads successfully with correct title
 * Type: Positive
 * Priority: High
 *
 * Preconditions: User has access to a modern web browser (Chrome/Firefox/Edge/Safari)
 *
 * This test verifies that the BlazeDemo homepage loads without errors
 * and displays the correct heading: "Welcome to the Simple Travel Agency!"
 */
test.describe('[OP-13] Homepage loads successfully with correct title', () => {

  test('TC-165: Homepage loads and displays correct heading', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');

    // Verify the page loaded without errors by checking the URL is correct
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Observe the page heading
    // Locate the main heading element and verify its text matches expected content
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
  });
});
