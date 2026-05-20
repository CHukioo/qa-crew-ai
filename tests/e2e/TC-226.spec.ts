import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-226 / [OP-13] TC-02
 * Title: Verify navigation bar displays logo and home link
 * 
 * Preconditions:
 *   - User has a browser and internet connectivity
 * 
 * Description:
 *   This test verifies that the top navigation bar is visible, contains
 *   the 'Travel The World' logo/title, and includes a 'Home' link.
 */
test.describe('[OP-13] TC-02: Navigation Bar Verification', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Verify navigation bar is visible at the top
   * Step 3: Verify 'Travel The World' logo/title is in the navbar
   * Step 4: Verify 'Home' link is present in the navbar
   */
  test('TC-226: Navigation bar displays logo and home link', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Locate the navigation bar (typically a <nav> element or .navbar)
    const navbar = page.locator('.navbar, nav');
    await expect(navbar).toBeVisible();
    console.log('✓ Navigation bar is visible at the top of the page');

    // Step 3: Check for 'Travel The World' as the brand/logo (usually in .navbar-brand or .brand)
    const brandLogo = page.locator('.navbar-brand, .brand, a.navbar-brand');
    await expect(brandLogo).toBeVisible();
    await expect(brandLogo).toContainText('Travel The World');
    console.log('✓ Navigation bar displays "Travel The World" as the website logo');

    // Step 4: Check for the 'Home' link inside the navigation bar
    const homeLink = navbar.locator('a:has-text("Home"), a:has-text("home")');
    await expect(homeLink).toBeVisible();
    console.log('✓ "Home" link is present in the navigation bar');
  });
});
