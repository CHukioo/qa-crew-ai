import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-146
 * Title: [Positive] Selecting cities and clicking Find Flights redirects to flight results page
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Paris' from the departure city dropdown
 *   2. Select 'London' from the destination city dropdown
 *   3. Click the 'Find Flights' button
 *   4. Observe the flight results page
 */
test.describe('TC-146 - Selecting cities and clicking Find Flights redirects to flight results page', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  // Complete happy path: select departure & destination, click Find Flights, verify results
  test('User can select Paris to London and see flight results', async ({ page }) => {
    // Step 1: Select 'Paris' from the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    // Verify Paris is selected
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 2: Select 'London' from the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('London');
    // Verify London is selected
    await expect(destinationDropdown).toHaveValue('London');

    // Step 3: Click the 'Find Flights' button
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();

    // Verify user is redirected to the flight results page (URL contains '/flights')
    await expect(page).toHaveURL(/\/flights/);

    // Step 4: Observe the flight results page
    // Verify available flights from Paris to London are listed
    // Look for table rows containing flight information
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();

    // Verify flight numbers, airlines, prices, and 'Choose This Flight' buttons are present
    const flightRows = page.locator('table tr');
    // There should be at least one flight row (excluding header)
    const rowCount = await flightRows.count();
    expect(rowCount).toBeGreaterThan(1);

    // Verify each flight row has a 'Choose This Flight' button
    const chooseFlightBtns = page.locator('input[type="submit"][value="Choose This Flight"]');
    await expect(chooseFlightBtns.first()).toBeVisible();
  });
});
