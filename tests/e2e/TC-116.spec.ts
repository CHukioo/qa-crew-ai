import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-116
 * Title: [Negative] Verify "home" link in navigation bar navigates back to homepage
 * Priority: Low
 * Type: Negative
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 */
test.describe('TC-116: Verify "home" link in navigation bar navigates back to homepage', () => {

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

  test('should display the "home" link in the navigation bar', async ({ page }) => {
    // Step 2: Locate the 'home' link in the navigation bar
    // Expected: The 'home' link is visible in the navigation bar
    const homeLink = page.locator('a.nav-link[href="index.php"]');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveText('Home');
  });

  test('should stay on or reload the homepage when clicking the "home" link', async ({ page }) => {
    // Step 3: Click the 'home' link
    // Expected: The page stays on or reloads the homepage (https://blazedemo.com/) without errors
    const homeLink = page.locator('a.nav-link[href="index.php"]');
    await homeLink.click();

    // Verify the page is still/reloaded to the homepage
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page.locator('body')).toBeVisible();

    // Verify that the main heading is still displayed confirming we're on the homepage
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
  });
});
