import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-10
 * Title: Verify 'Find Flights' button redirects to a valid flight results page
 * Type: Positive
 * Priority: High
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Boston' from the departure dropdown.
 *      -> 'Boston' is selected.
 *   2. Select 'Buenos Aires' from the destination dropdown.
 *      -> 'Buenos Aires' is selected.
 *   3. Click the 'Find Flights' button.
 *      -> URL changes to /reserve.php.
 *      -> Results page displays a table with flight details.
 */
test.describe('OP-13: Flight Search - Boston to Buenos Aires', () => {
  test('OP-13-TC-10: Verify Find Flights redirects to a valid flight results page', async ({ page }) => {
    // Precondition: Navigate to the homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Select 'Boston' from the departure city dropdown
    await page.selectOption('select[name="fromPort"]', 'Boston');
    const departureValue = await page.locator('select[name="fromPort"]').inputValue();
    expect(departureValue).toBe('Boston');

    // Step 2: Select 'Buenos Aires' from the destination city dropdown
    await page.selectOption('select[name="toPort"]', 'Buenos Aires');
    const destinationValue = await page.locator('select[name="toPort"]').inputValue();
    expect(destinationValue).toBe('Buenos Aires');

    // Step 3: Click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify the URL changes to the flight results page (/reserve.php)
    await expect(page).toHaveURL(/\/reserve\.php/);

    // Verify the results page displays a table with flight details
    const flightsTable = page.locator('table');
    await expect(flightsTable).toBeVisible();

    // Verify the table contains flight detail columns
    const tableHeaders = flightsTable.locator('thead th');
    await expect(tableHeaders.first()).toBeVisible();

    // Verify at least one flight row is displayed in the table body
    const flightRows = flightsTable.locator('tbody tr');
    const rowCount = await flightRows.count();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });
});
