import { test, expect } from '@playwright/test';

/**
 * TC-199: [POS] TC-05: Verify navigation bar contains Travel The World logo and home link
 *
 * Preconditions:
 * 1. Browser is launched.
 * 2. Navigate to https://blazedemo.com/
 *
 * Steps:
 * 1. Observe the navigation bar at the top of the page.
 *    - Expected: Navigation bar is visible.
 * 2. Check for the website logo/title in the nav bar.
 *    - Expected: The nav bar displays 'Travel The World' as the logo/title.
 * 3. Check for the 'home' link in the nav bar.
 *    - Expected: A 'home' link is present and clickable.
 * 4. Click the 'home' link.
 *    - Expected: Clicking 'home' stays on or reloads the homepage.
 */
test.describe('OP-13 — Navigation Bar Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before the test
    await page.goto('https://blazedemo.com/');
  });

  test('TC-199: Verify navigation bar contains Travel The World logo and home link', async ({ page }) => {
    // Step 1: Locate the navigation bar and verify it is visible
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();

    // Step 2: Verify the 'Travel The World' logo/title is displayed in the nav bar
    // The brand logo is typically inside an anchor with class 'navbar-brand'
    const brandLogo = page.locator('.navbar-brand');
    await expect(brandLogo).toBeVisible();
    await expect(brandLogo).toHaveText('Travel The World');

    // Step 3: Check for the 'home' link in the navigation bar
    // The home link is typically a list item anchor inside the nav
    const homeLink = page.locator('.navbar-nav a[href="index.php"]');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveText('Home');

    // Step 4: Click the 'home' link and verify the user stays on or reloads the homepage
    await homeLink.click();
    // After clicking home, the page should either stay on the homepage or reload it
    await expect(page).toHaveURL(/blazedemo\.com/);
    // Ensure the main heading is still visible confirming we are on the homepage
    await expect(page.locator('h1')).toBeVisible();
  });
});
