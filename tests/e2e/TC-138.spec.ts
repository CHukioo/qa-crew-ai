// =============================================================================
// Test Case: TC-138
// Title:    [OP-13] TC-03: User can select a departure city from the dropdown
// Type:     positive
// Priority: high
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Precondition: User is on the homepage at https://blazedemo.com/
test.describe('[OP-13] TC-03: User can select a departure city from the dropdown', () => {

  // Navigate to the homepage before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-138: Select each departure city option and verify selection', async ({ page }) => {
    // Locate the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Step 1: Click on the departure city dropdown to expand options.
    // Expected: The dropdown expands showing available departure cities (Paris, Philadelphia, Boston).
    await departureDropdown.click();

    // Step 2: Select 'Paris' from the departure city dropdown.
    // Expected: 'Paris' is selected and displayed in the departure city field.
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 3: Change the selection to 'Philadelphia'.
    // Expected: 'Philadelphia' is now selected and displayed in the departure city field.
    await departureDropdown.selectOption('Philadelphia');
    await expect(departureDropdown).toHaveValue('Philadelphia');

    // Step 4: Change the selection to 'Boston'.
    // Expected: 'Boston' is now selected and displayed in the departure city field.
    await departureDropdown.selectOption('Boston');
    await expect(departureDropdown).toHaveValue('Boston');
  });
});
