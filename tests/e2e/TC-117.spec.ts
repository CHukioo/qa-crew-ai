import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-117
 * Title: [Negative] Clicking "Find Flights" without selecting any city (default values)
 * Priority: Medium
 * Type: Negative
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 *   - Both dropdowns are in their default/unselected state
 */
test.describe('TC-117: Clicking "Find Flights" without selecting any city (default values)', () => {

  // Navigate to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('should load homepage with default dropdown values', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Homepage loads with default dropdown values
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page.locator('body')).toBeVisible();

    // Verify the dropdowns are present with default selections
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(departureDropdown).toBeVisible();
    await expect(destinationDropdown).toBeVisible();
  });

  test('should proceed with default values when clicking Find Flights without changing selections', async ({ page }) => {
    // Step 1: Navigate and verify default state
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Do NOT change any dropdown selections
    // Expected: Both dropdowns show their default placeholder values
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');

    // Capture the default values
    const defaultDeparture = await departureDropdown.inputValue();
    const defaultDestination = await destinationDropdown.inputValue();

    // The default values should be the first option (e.g., 'Paris' for departure, 'London' for destination)
    expect(defaultDeparture).toBeTruthy();
    expect(defaultDestination).toBeTruthy();

    // Step 3: Click the 'Find Flights' button
    // Expected: System proceeds with default values and navigates to flight results page
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();

    // The actual behavior (documented from test execution):
    // System proceeds with default values (Paris to London) and navigates to the flight results page
    await page.waitForURL('**/reserve.php');
    await expect(page).toHaveURL(/reserve\.php/);

    // Verify the results page shows flight options
    const flightTable = page.locator('table.table');
    await expect(flightTable).toBeVisible();
    const flightRows = flightTable.locator('tbody tr');
    const rowCount = await flightRows.count();
    expect(rowCount).toBeGreaterThan(0);
  });
});
