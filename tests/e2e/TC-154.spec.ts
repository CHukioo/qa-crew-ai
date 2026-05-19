import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-154
 * Title: [Negative] Verify Find Flights button with no city selection (default values)
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Do not change any dropdown values (leave defaults)
 *   2. Click the 'Find Flights' button
 */
test.describe('TC-154 - Verify Find Flights button with no city selection (default values)', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('Clicking Find Flights with default dropdown values redirects to results page', async ({ page }) => {
    // Step 1: Verify that the dropdowns have default values selected
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');

    // Get the default selected values without changing anything
    const defaultDeparture = await departureDropdown.inputValue();
    const defaultDestination = await destinationDropdown.inputValue();

    // Verify that both dropdowns have a value selected by default
    expect(defaultDeparture).toBeTruthy();
    expect(defaultDestination).toBeTruthy();

    // Step 2: Click the 'Find Flights' button without changing any selections
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();

    // Verify user is redirected to the flight results page
    // The application handles default values gracefully
    await expect(page).toHaveURL(/\/flights/);

    // Verify the results page displays flight information
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();
  });
});
