// =============================================================================
// Test Case: TC-143
// Title:    [OP-13] TC-06: Click "Find Flights" with default (unselected)
//           dropdown values
// Type:     negative
// Priority: medium
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Preconditions:
// 1. User is on the homepage at https://blazedemo.com/
// 2. No changes have been made to the dropdown selections
//    (they remain at their default/first option).
test.describe('[OP-13] TC-06: Click "Find Flights" with default dropdown values', () => {

  // Navigate to the homepage before each test to ensure a clean state
  // Important: We do NOT modify any dropdown selections to test default behavior
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-143: Submitting with default dropdown selections still redirects to results page', async ({ page }) => {
    // Step 1: Do NOT change any dropdown values — leave both departure
    // and destination at their default selections.
    // Expected: Departure dropdown shows the first/default option (e.g., 'Paris').
    // Destination dropdown shows the first/default option (e.g., 'Buenos Aires').
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');

    await expect(departureDropdown).toBeVisible();
    await expect(destinationDropdown).toBeVisible();

    // Capture the default selected values for documentation purposes
    const defaultDeparture = await departureDropdown.inputValue();
    const defaultDestination = await destinationDropdown.inputValue();
    console.log(`Default departure: ${defaultDeparture}, Default destination: ${defaultDestination}`);

    // Step 2: Click the 'Find Flights' button.
    // Expected: The application still submits the form and redirects to the
    // flight results page with the default cities selected. No validation error
    // should block navigation.
    const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsButton).toBeVisible();
    await expect(findFlightsButton).toBeEnabled();

    await findFlightsButton.click();

    // Wait for navigation to the reservation page
    await page.waitForURL('**/reserve.php', { timeout: 10000 });
    await expect(page).toHaveURL(/reserve\.php/);

    // Verify that flight results are displayed (even if limited)
    const flightsTable = page.locator('table');
    await expect(flightsTable).toBeVisible();
  });
});
