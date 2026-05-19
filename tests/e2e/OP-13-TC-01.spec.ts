import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-01
 * Title: Verify homepage loads successfully with correct title
 * Type: Positive
 * Priority: High
 * 
 * Preconditions:
 *   - User has a modern web browser with internet access.
 *   - No prior session data required.
 * 
 * Steps:
 *   1. Open browser and navigate to https://blazedemo.com/
 *      -> The page loads without errors.
 *      -> The heading text "Welcome to the Simple Travel Agency!" is displayed.
 */
test.describe('OP-13: Homepage Loading', () => {
  test('OP-13-TC-01: Verify homepage loads successfully with correct title', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');

    // Verify the page loads without errors by checking the URL
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Verify the page title is not empty and contains expected branding
    await expect(page).toHaveTitle(/BlazeDemo|Travel/);

    // Verify the main heading is displayed prominently on the page
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Welcome to the Simple Travel Agency!');
  });
});
