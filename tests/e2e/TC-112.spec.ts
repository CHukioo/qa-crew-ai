import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-112
 * Title: [Positive] Selecting departure & destination and clicking "Find Flights" redirects to flight results page
 * Priority: High
 * Type: Positive
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 *   - Both departure and destination dropdowns are populated with valid options
 */
test.describe('TC-112: Selecting departure & destination and clicking "Find Flights" redirects to flight results page', () => {

  // Navigate to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('should redirect to flight results page after selecting cities and clicking Find Flights', async ({ page }) => {
    // Step 1: Select 'Paris' from the departure city dropdown
    // Expected: 'Paris' is selected as the departure city
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 2: Select 'London' from the destination city dropdown
    // Expected: 'London' is selected as the destination city
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('London');
    await expect(destinationDropdown).toHaveValue('London');

    // Step 3: Click the 'Find Flights' button
    // Expected: The browser navigates to a flight results page (URL changes to '/reserve.php' or similar)
    //           showing available flights from Paris to London
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();

    // Wait for navigation to complete and verify URL contains reserve.php
    await page.waitForURL('**/reserve.php');
    await expect(page).toHaveURL(/reserve\.php/);

    // Step 4: Observe the results page
    // Expected: The results page displays a list of flights with details
    //           (airline, flight number, departure time, price)
    // Verify the flight results table is displayed
    const flightTable = page.locator('table.table');
    await expect(flightTable).toBeVisible();

    // Verify table headers for flight details
    const tableHeaders = flightTable.locator('thead th');
    await expect(tableHeaders).toContainText(['Airline', 'Flight #', 'Price!']);

    // Verify that flight rows are present in the table body
    const flightRows = flightTable.locator('tbody tr');
    const rowCount = await flightRows.count();
    expect(rowCount).toBeGreaterThan(0);

    // Verify each row has the expected columns (airline, flight number, and price)
    for (let i = 0; i < rowCount; i++) {
      const cells = flightRows.nth(i).locator('td');
      await expect(cells.nth(0)).not.toBeEmpty();  // Airline
      await expect(cells.nth(1)).not.toBeEmpty();  // Flight number
      await expect(cells.nth(2)).not.toBeEmpty();  // Departure time
      await expect(cells.nth(3)).not.toBeEmpty();  // Price
      await expect(cells.nth(4)).not.toBeEmpty();  // Choose button
    }
  });
});
