import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-221
 * Title: [Positive] TC-05: Verify successful flight search redirects to results page
 * Priority: high
 * 
 * Preconditions:
 *   - Homepage is loaded successfully.
 *   - Valid departure and destination cities are available in dropdowns.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect homepage loads
 *   2. Select 'Paris' from the departure city dropdown - expect 'Paris' is selected
 *   3. Select 'London' from the destination city dropdown - expect 'London' is selected
 *   4. Click the 'Find Flights' button - expect redirect to results page
 */
test.describe('TC-221: Flight Search Redirect Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should redirect to results page after selecting cities and clicking Find Flights', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('select[name="fromPort"]', { timeout: 10000 });
    });

    // Step 2: Select 'Paris' from the departure city dropdown
    await test.step("Select 'Paris' from the departure city dropdown", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Paris');
      await expect(departureDropdown).toHaveValue('Paris');
    });

    // Step 3: Select 'London' from the destination city dropdown
    await test.step("Select 'London' from the destination city dropdown", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.selectOption('London');
      await expect(destinationDropdown).toHaveValue('London');
    });

    // Step 4: Click the 'Find Flights' button and verify redirect to results page
    await test.step("Click the 'Find Flights' button", async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();

      // Wait for navigation to the results page (URL should contain 'reserve.php')
      await page.waitForURL('**/reserve.php', { timeout: 10000 });

      // Verify we are on the flight results page by checking for expected content
      await expect(page).toHaveURL(/.*reserve\.php.*/);
      
      // Verify the results page shows flight information (heading or table)
      const pageHeading = page.locator('h2');
      await expect(pageHeading).toBeVisible();
      // The results page typically shows "Flights from Paris to London:" or similar
      await expect(pageHeading).toContainText('Flights from');
    });
  });
});
