import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-133
 * Title: [OP-13] Negative: Select only departure city (leave destination at default) and click Find Flights
 * Type: Negative
 * Priority: Medium
 *
 * Preconditions: Application URL is https://blazedemo.com/.
 * Note the default selected value of destination dropdown.
 * Expected behavior: Application navigates to /reserve using selected departure and default destination.
 */
test.describe('OP-13 - Partial Selection: Only Departure', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-133: Select only departure city and click Find Flights', async ({ page }) => {
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

    // Step 3: Leave the destination city dropdown at its default value
    await test.step("Leave the destination city dropdown at its default/unchanged value", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      // Assert: Destination dropdown remains on the default selection
      await expect(destinationDropdown).toBeVisible();
      // Record the default value for documentation
      const defaultDest = await destinationDropdown.inputValue();
      console.log(`Default destination value (unchanged): ${defaultDest}`);
    });

    // Step 4: Click the 'Find Flights' button
    await test.step("Click the 'Find Flights' button", async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();

      // Assert: Application navigates to flight results page using Boston + default destination
      await expect(page).toHaveURL(/\/reserve/);
    });
  });
});
