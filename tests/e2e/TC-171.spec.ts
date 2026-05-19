import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-171 — [OP-13] Departure city dropdown is visible and allows selection
 * Type: Positive
 * Priority: High
 *
 * Preconditions: User is on https://blazedemo.com/ homepage
 *
 * This test verifies the departure city dropdown (labeled "From") is visible,
 * expands to show options, and allows selecting a city (Paris).
 */
test.describe('[OP-13] Departure city dropdown is visible and allows selection', () => {

  test('TC-171: Departure city dropdown is visible, expandable, and allows selection', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Locate the departure city dropdown
    // The dropdown is a <select> element with name "fromPort"
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Step 3: Click on the departure dropdown to expand options
    // Select elements expand on click so we just need to verify options exist
    await departureDropdown.click();

    // Verify expected city options are present in the dropdown
    const options = departureDropdown.locator('option');
    const optionTexts = await options.allTextContents();

    // Check that Paris, Philadelphia, and Boston are available as departure cities
    expect(optionTexts).toContain('Paris');
    expect(optionTexts).toContain('Philadelphia');
    expect(optionTexts).toContain('Boston');

    // Step 4: Select 'Paris' from the dropdown
    await departureDropdown.selectOption('Paris');

    // Verify 'Paris' is selected
    await expect(departureDropdown).toHaveValue('Paris');
  });
});
