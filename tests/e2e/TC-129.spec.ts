import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-129
 * Title: [OP-13] Negative: Select the same city for departure and destination and click Find Flights
 * Type: Negative
 * Priority: Medium
 *
 * Preconditions: Application URL is https://blazedemo.com/.
 * Note: Departure cities (Paris, Philadelphia, Boston) and destination cities
 * (Buenos Aires, Rome, London) are completely disjoint sets, so selecting the
 * exact same city is not possible. This test documents the actual behavior.
 */
test.describe('OP-13 - Same City Selection (Disjoint Sets)', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-129: Select a departure city and attempt to find flights', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads successfully
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Select 'Paris' from the departure city dropdown
    await test.step("Select 'Paris' from the departure city dropdown", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Paris');
      // Assert: Paris is selected in the departure dropdown
      await expect(departureDropdown).toHaveValue('Paris');
    });

    // Step 3: Note that same city is not available in destination — select the nearest equivalent
    await test.step("Select a destination city (same cities not shared between dropdowns)", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      // Since Paris is not in destination options, select London (first available)
      await destinationDropdown.selectOption('London');
      // Assert: Destination selection is made
      await expect(destinationDropdown).toHaveValue('London');
    });

    // Step 4: Click the 'Find Flights' button
    await test.step("Click the 'Find Flights' button", async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();

      // Assert: Application navigates to the flight results page
      // Since cities are disjoint, no "same city" validation is triggered
      await expect(page).toHaveURL(/\/reserve/);
    });
  });
});
