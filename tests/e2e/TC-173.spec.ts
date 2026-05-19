import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-173 — [OP-13] Destination city dropdown is visible and allows selection
 * Type: Positive
 * Priority: High
 *
 * Preconditions: User is on https://blazedemo.com/ homepage
 *
 * This test verifies the destination city dropdown (labeled "To") is visible,
 * expands to show options, and allows selecting a city (London).
 */
test.describe('[OP-13] Destination city dropdown is visible and allows selection', () => {

  test('TC-173: Destination city dropdown is visible, expandable, and allows selection', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Locate the destination city dropdown
    // The dropdown is a <select> element with name "toPort"
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Step 3: Click on the destination dropdown to expand options
    await destinationDropdown.click();

    // Verify expected city options are present in the dropdown
    const options = destinationDropdown.locator('option');
    const optionTexts = await options.allTextContents();

    // Check that Buenos Aires, Rome, and London are available as destination cities
    expect(optionTexts).toContain('Buenos Aires');
    expect(optionTexts).toContain('Rome');
    expect(optionTexts).toContain('London');

    // Step 4: Select 'London' from the dropdown
    await destinationDropdown.selectOption('London');

    // Verify 'London' is selected
    await expect(destinationDropdown).toHaveValue('London');
  });
});
