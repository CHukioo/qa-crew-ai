import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-217
 * Title: [Positive] TC-08: Verify 'home' navigation link redirects back to homepage
 * Priority: medium
 * 
 * Preconditions:
 *   - User has navigated to a results page after a successful flight search.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect homepage loads
 *   2. Select departure/destination cities and click Find Flights - expect results page
 *   3. Click the 'home' link in the navigation bar - expect redirect back to homepage
 *   4. Verify the homepage title is displayed again
 */
test.describe('TC-217: Home Navigation Link Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should navigate back to homepage when clicking the home link from results page', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('select[name="fromPort"]', { timeout: 10000 });
    });

    // Step 2: Select cities and click Find Flights to go to results page
    await test.step("Select a departure city and destination city, then click 'Find Flights' to go to results page", async () => {
      await page.locator('select[name="fromPort"]').selectOption('Paris');
      await page.locator('select[name="toPort"]').selectOption('London');
      await page.locator('input[type="submit"][value="Find Flights"]').click();
      
      // Wait for the results page to load
      await page.waitForURL('**/reserve.php', { timeout: 10000 });
      await expect(page.locator('h2')).toBeVisible();
    });

    // Step 3: Click the 'home' link in the navigation bar
    await test.step("Click the 'home' link in the navigation bar", async () => {
      const homeLink = page.locator('a:has-text("home")');
      await expect(homeLink).toBeVisible();
      await homeLink.click();
      
      // Wait for navigation back to the homepage
      await page.waitForURL(BASE_URL, { timeout: 10000 });
    });

    // Step 4: Verify the homepage title is displayed again
    await test.step("Verify the homepage title 'Welcome to the Simple Travel Agency!' is displayed again", async () => {
      await expect(page).toHaveURL(BASE_URL);
      await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');
    });
  });
});
