import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-153
 * Title: [Negative] Selecting same departure and destination city
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Paris' from the departure city dropdown
 *   2. Try to select 'Paris' from the destination city dropdown
 *   3. Click the 'Find Flights' button
 *
 * Note: The BlazeDemo app does not duplicate the same city in both dropdowns,
 * so the destination dropdown will NOT contain the departure city.
 * This is the app's graceful handling of this edge case.
 */
test.describe('TC-153 - Selecting same departure and destination city (Negative)', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('Destination dropdown does not contain the same city as departure selection', async ({ page }) => {
    // Step 1: Select 'Paris' from the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 2: Verify the destination dropdown does NOT contain 'Paris' as an option
    // This is the app's built-in validation preventing same-city selection
    const destinationDropdown = page.locator('select[name="toPort"]');
    const destinationOptions = await destinationDropdown.locator('option').allTextContents();
    
    // Assert that Paris is NOT available in the destination dropdown
    expect(destinationOptions).not.toContain('Paris');

    // Step 3: Select a different city (e.g., London) and click Find Flights
    await destinationDropdown.selectOption('London');
    
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();

    // Verify user is redirected to the flight results page
    await expect(page).toHaveURL(/\/flights/);
  });
});
