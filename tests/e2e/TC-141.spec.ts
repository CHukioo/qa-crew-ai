// =============================================================================
// Test Case: TC-141
// Title:    [OP-13] TC-04: User can select a destination city from the dropdown
// Type:     positive
// Priority: high
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Precondition: User is on the homepage at https://blazedemo.com/
test.describe('[OP-13] TC-04: User can select a destination city from the dropdown', () => {

  // Navigate to the homepage before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-141: Select each destination city option and verify selection', async ({ page }) => {
    // Locate the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Step 1: Click on the destination city dropdown to expand options.
    // Expected: The dropdown expands showing available destination cities (Buenos Aires, Rome, London).
    await destinationDropdown.click();

    // Step 2: Select 'Buenos Aires' from the destination city dropdown.
    // Expected: 'Buenos Aires' is selected and displayed in the destination city field.
    await destinationDropdown.selectOption('Buenos Aires');
    await expect(destinationDropdown).toHaveValue('Buenos Aires');

    // Step 3: Change the selection to 'Rome'.
    // Expected: 'Rome' is now selected and displayed in the destination city field.
    await destinationDropdown.selectOption('Rome');
    await expect(destinationDropdown).toHaveValue('Rome');

    // Step 4: Change the selection to 'London'.
    // Expected: 'London' is now selected and displayed in the destination city field.
    await destinationDropdown.selectOption('London');
    await expect(destinationDropdown).toHaveValue('London');
  });
});
