import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-119
 * [OP-13] TC-06: Verify navigation bar displays logo and home link
 * 
 * Preconditions:
 *   1. User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Observe the top navigation bar of the page.
 *   2. Check the left side of the navigation bar for the website logo/title.
 *   3. Check the right side of the navigation bar for the 'home' link.
 *   4. Click the 'home' link.
 * 
 * Expected:
 *   - Navigation bar is visible at the top.
 *   - Logo/title 'Travel The World' is displayed on the left.
 *   - A clickable 'home' link is visible.
 *   - Clicking 'home' reloads the homepage without errors.
 */
test.describe('OP-13 - Navigation Bar Verification', () => {
  test('TC-119: Verify navigation bar displays logo and home link', async ({ page }) => {
    // Precondition: Navigate to homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Observe the top navigation bar of the page
    await test.step('Observe the top navigation bar', async () => {
      const navbar = page.locator('.navbar');
      await expect(navbar).toBeVisible();
    });

    // Step 2: Check the left side of the navigation bar for the logo/title
    await test.step('Check for logo/title in navigation bar', async () => {
      // The brand/logo is typically in a .navbar-brand element
      const brand = page.locator('.navbar-brand');
      await expect(brand).toBeVisible();
      await expect(brand).toHaveText('Travel The World');
    });

    // Step 3: Check the right side of the navigation bar for the 'home' link
    await test.step('Check for the home link in the navigation bar', async () => {
      // The home link is typically in the nav links section
      const homeLink = page.locator('.navbar-nav .nav-link, .navbar-nav a, a:has-text("Home")');
      await expect(homeLink.first()).toBeVisible();
    });

    // Step 4: Click the 'home' link
    await test.step('Click the home link and verify page reloads', async () => {
      const homeLink = page.locator('a:has-text("Home")');
      await homeLink.click();
      // Verify we stay on or return to the homepage
      await expect(page).toHaveURL('https://blazedemo.com/');
      // Verify the page loaded correctly by checking the main heading
      await expect(page.locator('h1')).toBeVisible();
    });
  });
});
