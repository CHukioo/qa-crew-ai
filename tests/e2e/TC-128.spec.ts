import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-128
 * Title: [OP-13] Positive: Select departure "Boston" and destination "Buenos Aires" and click Find Flights
 * Type: Positive
 * Priority: High
 *
 * Preconditions: Application URL is https://blazedemo.com/
 */
test.describe('OP-13 - Valid City Pair: Boston to Buenos Aires', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-128: Select Boston as departure, Buenos Aires as destination and find flights', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads successfully
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Select 'Boston' from the departure city dropdown
    await test.step("Select 'Boston' from the departure city dropdown", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Boston');
      // Assert: Boston is selected in the departure dropdown
      await expect(departureDropdown).toHaveValue('Boston');
    });

    // Step 3: Select 'Buenos Aires' from the destination city dropdown
    await test.step("Select 'Buenos Aires' from the destination city dropdown", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.selectOption('Buenos Aires');
      // Assert: Buenos Aires is selected in the destination dropdown
      await expect(destinationDropdown).toHaveValue('Buenos Aires');
    });

    // Step 4: Click the 'Find Flights' button
    await test.step("Click the 'Find Flights' button", async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();

      // Assert: User is redirected to the flight results page (URL contains '/reserve')
      await expect(page).toHaveURL(/\/reserve/);

      // Assert: The results page shows flights (table body should have rows)
      const flightsTable = page.locator('table tbody tr');
      await expect(flightsTable.first()).toBeVisible();
    });
  });
});
