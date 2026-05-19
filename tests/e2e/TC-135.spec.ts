import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-135
 * Title: [OP-13] Positive: Select departure "Philadelphia" and destination "Rome" and click Find Flights
 * Type: Positive
 * Priority: High
 *
 * Preconditions: Application URL is https://blazedemo.com/
 */
test.describe('OP-13 - Valid City Pair: Philadelphia to Rome', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-135: Select Philadelphia as departure, Rome as destination and find flights', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads successfully
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Select 'Philadelphia' from the departure city dropdown
    await test.step("Select 'Philadelphia' from the departure city dropdown", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Philadelphia');
      // Assert: Philadelphia is selected in the departure dropdown
      await expect(departureDropdown).toHaveValue('Philadelphia');
    });

    // Step 3: Select 'Rome' from the destination city dropdown
    await test.step("Select 'Rome' from the destination city dropdown", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.selectOption('Rome');
      // Assert: Rome is selected in the destination dropdown
      await expect(destinationDropdown).toHaveValue('Rome');
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
