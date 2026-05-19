// =============================================================================
// Test Case: TC-142
// Title:    [OP-13] TC-02: Verify departure and destination city dropdowns
//           are visible and contain expected cities
// Type:     positive
// Priority: high
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Precondition: User is on the homepage at https://blazedemo.com/
test.describe('[OP-13] TC-02: Verify departure and destination city dropdowns', () => {

  // Navigate to the homepage before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-142: Departure and destination dropdowns are visible with expected cities', async ({ page }) => {
    // Step 1: Locate the departure city dropdown on the page.
    // Expected: A dropdown/select element labeled for departure city selection is visible on the page.
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Step 2: Click on the departure city dropdown to expand the options.
    // Expected: A list of departure city options is displayed.
    // Expected cities include: Paris, Philadelphia, Boston.
    await departureDropdown.click();
    const departureOptions = departureDropdown.locator('option');

    // Verify expected departure cities are present in the dropdown
    const expectedDepartureCities = ['Paris', 'Philadelphia', 'Boston'];
    for (const city of expectedDepartureCities) {
      await expect(departureDropdown.locator(`option[value="${city}"]`)).toBeVisible();
    }

    // Step 3: Locate the destination city dropdown on the page.
    // Expected: A dropdown/select element labeled for destination city selection is visible on the page.
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Step 4: Click on the destination city dropdown to expand the options.
    // Expected: A list of destination city options is displayed.
    // Expected cities include: Buenos Aires, Rome, London.
    await destinationDropdown.click();

    // Verify expected destination cities are present in the dropdown
    const expectedDestinationCities = ['Buenos Aires', 'Rome', 'London'];
    for (const city of expectedDestinationCities) {
      await expect(destinationDropdown.locator(`option[value="${city}"]`)).toBeVisible();
    }
  });
});
