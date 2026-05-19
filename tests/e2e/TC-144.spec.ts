// =============================================================================
// Test Case: TC-144
// Title:    [OP-13] TC-05: Clicking "Find Flights" with valid selections
//           redirects to flight results page
// Type:     positive
// Priority: high
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Preconditions:
// 1. User is on the homepage at https://blazedemo.com/
// 2. Departure city is selected (e.g., 'Paris')
// 3. Destination city is selected (e.g., 'London')
// 4. Departure and destination cities are different
test.describe('[OP-13] TC-05: Clicking "Find Flights" redirects to results page', () => {

  // Navigate to the homepage before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-144: Select cities and click Find Flights to verify redirect to results page', async ({ page }) => {
    // Step 1: Select a departure city (e.g., 'Paris') from the departure dropdown.
    // Expected: 'Paris' is selected.
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 2: Select a destination city (e.g., 'London') from the destination dropdown.
    // Expected: 'London' is selected.
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();
    await destinationDropdown.selectOption('London');
    await expect(destinationDropdown).toHaveValue('London');

    // Step 3: Locate and verify the 'Find Flights' button is visible and enabled.
    // Expected: A button labeled 'Find Flights' is visible and clickable (not disabled/greyed out).
    const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsButton).toBeVisible();
    await expect(findFlightsButton).toBeEnabled();

    // Step 4: Click the 'Find Flights' button.
    // Expected: User is redirected to a new page showing available flights.
    // URL changes to https://blazedemo.com/reserve.php or similar flight results page.
    // A table/list of flights is displayed for the selected route.
    await findFlightsButton.click();

    // Wait for navigation to complete and verify the URL is the reservation page
    await page.waitForURL('**/reserve.php', { timeout: 10000 });
    await expect(page).toHaveURL(/reserve\.php/);

    // Verify that flight results are displayed - look for a table with flight data
    const flightsTable = page.locator('table');
    await expect(flightsTable).toBeVisible();

    // Verify at least one flight row exists in the table
    const flightRows = page.locator('table tr');
    await expect(flightRows.first()).toBeVisible();
  });
});
