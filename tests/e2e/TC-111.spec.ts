import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-111
 * Title: [Positive] Homepage loads successfully with correct title and navigation bar
 * Priority: High
 * Type: Positive
 * 
 * Preconditions:
 *   - User has a modern web browser (Chrome/Firefox/Edge)
 *   - Application is deployed and accessible at https://blazedemo.com/
 */
test.describe('TC-111: Homepage loads successfully with correct title and navigation bar', () => {

  // Navigate to the application before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('should load the homepage without errors and display correct heading', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Already performed in beforeEach

    // Verify the page loads without any errors by checking the URL and no error elements
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page.locator('body')).toBeVisible();

    // Step 2: Observe the page heading on the main content area
    // Expected: The heading displays 'Welcome to the Simple Travel Agency!'
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
  });

  test('should display the navigation bar with logo and home link', async ({ page }) => {
    // Step 1: Navigate to the page (already in beforeEach)

    // Step 3: Observe the navigation bar at the top
    // Expected: The navigation bar is present and displays 'Travel The World' as the logo/title
    //           and contains a 'home' link
    const navBar = page.locator('.navbar');
    await expect(navBar).toBeVisible();

    // Verify the logo/title in the navigation bar
    const brandLink = page.locator('.navbar-brand');
    await expect(brandLink).toBeVisible();
    await expect(brandLink).toHaveText('Travel The World');

    // Verify the 'home' link is present in the navigation bar
    const homeLink = page.locator('a.nav-link[href="index.php"]');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveText('Home');
  });
});
