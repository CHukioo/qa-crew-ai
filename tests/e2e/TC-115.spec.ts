import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-115
 * Title: [Negative] Travel The World logo in navigation bar is displayed correctly
 * Priority: Low
 * Type: Negative
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 */
test.describe('TC-115: Travel The World logo in navigation bar is displayed correctly', () => {

  // Navigate to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Homepage loads successfully
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display the navigation bar at the top of the page', async ({ page }) => {
    // Step 2: Look at the navigation bar at the top of the page
    // Expected: The navigation bar is displayed
    const navBar = page.locator('.navbar');
    await expect(navBar).toBeVisible();
  });

  test('should display "Travel The World" as the logo/title in the navigation bar', async ({ page }) => {
    // Step 3: Find the website logo/title in the navigation bar
    // Expected: The logo/title reads 'Travel The World'
    const brandLink = page.locator('.navbar-brand');
    await expect(brandLink).toBeVisible();
    await expect(brandLink).toHaveText('Travel The World');
  });
});
