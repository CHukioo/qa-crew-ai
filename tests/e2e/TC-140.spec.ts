// =============================================================================
// Test Case: TC-140
// Title:    [OP-13] TC-07: Verify navigation bar displays website logo
//           and home link correctly
// Type:     positive
// Priority: medium
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Precondition: User is on the homepage at https://blazedemo.com/
test.describe('[OP-13] TC-07: Verify navigation bar displays correctly', () => {

  // Navigate to the homepage before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-140: Navigation bar shows logo text and home link, and home link works', async ({ page }) => {
    // Step 1: Observe the top navigation bar of the page.
    // Expected: A navigation bar is visible at the top of the page.
    const navBar = page.locator('.navbar');
    await expect(navBar).toBeVisible();

    // Step 2: Locate the website logo/title text in the navigation bar.
    // Expected: The text 'Travel The World' is displayed in the navigation bar
    // (typically on the left side).
    const brandText = page.locator('.navbar-brand');
    await expect(brandText).toBeVisible();
    await expect(brandText).toContainText('Travel The World');

    // Step 3: Locate the 'home' link in the navigation bar.
    // Expected: A clickable link labeled 'home' is visible in the navigation bar.
    const homeLink = page.locator('.navbar-nav a[href="index.php"]');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveText('home');

    // Step 4: Click the 'home' link.
    // Expected: The page reloads or stays on the homepage (https://blazedemo.com/).
    await homeLink.click();

    // Wait a moment for any page reload to complete
    await page.waitForLoadState('networkidle');

    // Verify we are still on the homepage
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Verify the page content is still intact after clicking home
    const heading = page.locator('h1');
    await expect(heading).toContainText('Welcome to the Simple Travel Agency!');
  });
});
