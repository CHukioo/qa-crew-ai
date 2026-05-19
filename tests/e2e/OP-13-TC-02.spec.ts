import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-02
 * Title: Verify navigation bar displays 'Travel The World' logo and 'home' link
 * Type: Positive
 * Priority: Medium
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Observe the top navigation bar.
 *      -> The nav bar contains the logo 'Travel The World' and a clickable 'home' link.
 *   2. Click the 'home' link.
 *      -> Clicking 'home' stays on the same page or refreshes (no error).
 */
test.describe('OP-13: Navigation Bar Verification', () => {
  test('OP-13-TC-02: Verify navigation bar displays logo and home link', async ({ page }) => {
    // Precondition: Navigate to the homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Observe the top navigation bar
    // The nav bar should contain the branding text 'Travel The World'
    const navBrand = page.locator('.navbar-brand');
    await expect(navBrand).toBeVisible();
    await expect(navBrand).toContainText('Travel The World');

    // Verify the 'home' link exists in the navigation bar
    const homeLink = page.locator('a.nav-link:has-text("Home")');
    await expect(homeLink).toBeVisible();

    // Step 2: Click the 'home' link and verify the page stays on the homepage
    await homeLink.click();
    await expect(page).toHaveURL('https://blazedemo.com/');
  });
});
