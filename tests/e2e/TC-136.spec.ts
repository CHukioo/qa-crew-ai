import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-136
 * Title: [OP-13] Negative: Select only destination city (leave departure at default) and click Find Flights
 * Type: Negative
 * Priority: Medium
 *
 * Preconditions: Application URL is https://blazedemo.com/.
 * Note the default selected value of departure dropdown.
 * Expected behavior: Application navigates to /reserve using default departure and selected destination.
 */
test.describe('OP-13 - Partial Selection: Only Destination', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-136: Select only destination city and click Find Flights', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads successfully
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Leave the departure city dropdown at its default value
    await test.step("Leave the departure city dropdown at its default/unchanged value", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      // Assert: Departure dropdown remains on the default selection
      await expect(departureDropdown).toBeVisible();
      // Record the default value for documentation
      const defaultDep = await departureDropdown.inputValue();
      console.log(`Default departure value (unchanged): ${defaultDep}`);
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

      // Assert: Application navigates to flight results page using default departure + Rome
      await expect(page).toHaveURL(/\/reserve/);
    });
  });
});
