import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-150
 * Title: [Positive] Navigation bar displays Travel The World logo and home link
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Observe the top navigation bar of the page
 *   2. Find the website logo/title element
 *   3. Find the 'home' link in the navigation bar
 *   4. Click on the 'home' link
 */
test.describe('TC-150 - Navigation bar displays Travel The World logo and home link', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  // Step 1+2: Verify navigation bar is visible with Travel The World logo
  test('Navigation bar is visible and displays Travel The World logo', async ({ page }) => {
    // Step 1: Observe the top navigation bar
    // The navigation bar is typically a <nav> element or a div with class 'navbar'
    const navBar = page.locator('.navbar, nav').first();
    await expect(navBar).toBeVisible();

    // Step 2: Find the website logo/title element
    // The logo is typically a brand element with the text 'Travel The World'
    const logo = page.locator('.navbar-brand, .brand');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Travel The World');
  });

  // Step 3+4: Verify home link is present and clickable
  test('Home link is visible in the navigation bar and reloads the homepage when clicked', async ({ page }) => {
    // Step 3: Find the 'home' link in the navigation bar
    const homeLink = page.locator('a:has-text("home"), a[href*="index"]');
    await expect(homeLink).toBeVisible();

    // Step 4: Click on the 'home' link
    await homeLink.click();

    // Verify the page stays on or reloads the homepage
    await expect(page).toHaveURL('https://blazedemo.com/');
  });
});
