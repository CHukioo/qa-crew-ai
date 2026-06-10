import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-134
 * Title: [OP-13] Negative: Click Find Flights without changing any dropdown selections (default values)
 * Type: Negative
 * Priority: Medium
 *
 * Preconditions: Application URL is https://blazedemo.com/.
 * Note the default selected values of both dropdowns.
 * Expected behavior: Application navigates to /reserve with default city pair (documented behavior).
 */
test.describe('OP-13 - Default Values Behavior', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-134: Click Find Flights without changing any dropdown selections', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads successfully
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Verify the departure city dropdown is at default
    await test.step("Do NOT change the departure city dropdown — leave it at the default selected value", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      // Assert: Departure dropdown shows the default selected option
      await expect(departureDropdown).toBeVisible();
      // Record the default value
      const defaultDeparture = await departureDropdown.inputValue();
      console.log(`Default departure value: ${defaultDeparture}`);
    });

    // Step 3: Verify the destination city dropdown is at default
    await test.step("Do NOT change the destination city dropdown — leave it at the default selected value", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      // Assert: Destination dropdown shows the default selected option
      await expect(destinationDropdown).toBeVisible();
      // Record the default value
      const defaultDestination = await destinationDropdown.inputValue();
      console.log(`Default destination value: ${defaultDestination}`);
    });

    // Step 4: Click the 'Find Flights' button
    await test.step("Click the 'Find Flights' button", async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();

      // Assert: Application navigates to the flight results page (URL contains '/reserve')
      // This is the documented actual behavior — the app accepts default selections
      await expect(page).toHaveURL(/\/reserve/);
    });
  });
});
