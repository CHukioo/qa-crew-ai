import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-118
 * [OP-13] TC-01: Verify homepage loads successfully with correct page title
 * 
 * Preconditions:
 *   1. Browser is open and connected to the internet.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/
 *   2. Observe the main heading on the page.
 * 
 * Expected:
 *   - Page loads without errors.
 *   - Page displays the title: 'Welcome to the Simple Travel Agency!'
 */
test.describe('OP-13 - Homepage Load', () => {
  test('TC-118: Verify homepage loads successfully with correct page title', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto('https://blazedemo.com/');
      // Verify the page loaded without errors by checking URL is correct
      await expect(page).toHaveURL('https://blazedemo.com/');
    });

    // Step 2: Observe the main heading on the page
    await test.step('Verify the main heading displays the correct title', async () => {
      // Locate the main heading (h1) element on the page
      const heading = page.locator('h1');
      // Assert that the heading contains the expected welcome text
      await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
    });
  });
});
