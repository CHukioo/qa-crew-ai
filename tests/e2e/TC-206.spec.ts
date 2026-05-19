import { test, expect } from '@playwright/test';

/**
 * TC-206: [TC-2] Verify Navigation Bar Contains Logo and Home Link
 * 
 * Preconditions: Browser is open and connected to the internet
 * Priority: Medium
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Locate the navigation bar at the top of the page
 * 3. Verify 'Travel The World' is displayed as the logo/title
 * 4. Verify the 'home' link is present in the navigation bar
 */
test.describe('TC-206: Navigation Bar Verification', () => {
  test('should display the navigation bar with logo and home link', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Locate the navigation bar at the top of the page
    // Expected: Navigation bar is visible at the top
    const navBar = page.locator('nav.navbar');
    await expect(navBar).toBeVisible();

    // Step 3: Verify the navigation bar displays 'Travel The World' as the website logo/title
    // Expected: 'Travel The World' is displayed in the navigation bar
    const brand = navBar.locator('.navbar-brand');
    await expect(brand).toBeVisible();
    await expect(brand).toHaveText('Travel The World');

    // Step 4: Verify the 'home' link is present in the navigation bar
    // Expected: 'home' link is visible and clickable in the navigation bar
    const homeLink = navBarlocator('a:has-text("Home")');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toBeEnabled();
    await expect(homeLink).toHaveAttribute('href', '/'); });
});