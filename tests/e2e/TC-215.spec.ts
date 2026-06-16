import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-215
 * Title: [Positive] TC-01: Verify homepage loads successfully with correct title and navigation
 * Priority: high
 * 
 * Preconditions:
 *   - Browser is open. User has internet access.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect page loads without errors
 *   2. Verify the page heading displays 'Welcome to the Simple Travel Agency!'
 *   3. Verify the navigation bar shows 'Travel The World' logo/title
 *   4. Verify 'home' link is present in the navigation bar
 */
test.describe('TC-215: Homepage Load Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should load homepage with correct title and navigation elements', async ({ page }) => {
    // Step 1: Navigate to the application homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Wait for the page to fully load by waiting for the heading element
      await page.waitForSelector('h1', { timeout: 10000 });
    });

    // Step 2: Verify the page heading displays 'Welcome to the Simple Travel Agency!'
    await test.step("Verify the page heading displays 'Welcome to the Simple Travel Agency!'", async () => {
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
    });

    // Step 3: Verify the navigation bar shows 'Travel The World' logo/title
    await test.step("Verify the navigation bar shows 'Travel The World' logo/title", async () => {
      const navBrand = page.locator('.navbar-brand');
      await expect(navBrand).toBeVisible();
      await expect(navBrand).toHaveText('Travel The World');
    });

    // Step 4: Verify 'home' link is present in the navigation bar
    await test.step("Verify 'home' link is present in the navigation bar", async () => {
      const homeLink = page.locator('a:has-text("home")');
      await expect(homeLink).toBeVisible();
      // Also verify it's a clickable link with proper href
      await expect(homeLink).toHaveAttribute('href', './');
    });
  });
});
