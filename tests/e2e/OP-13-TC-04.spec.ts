import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-04
 * Title: Verify destination city dropdown is visible and contains expected cities
 * Type: Positive
 * Priority: High
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Locate the destination city dropdown.
 *      -> A dropdown/select element labeled for destination city is visible.
 *   2. Click on the dropdown to expand options.
 *      -> The dropdown displays a list including: Buenos Aires, Rome, London.
 */
test.describe('OP-13: Destination City Dropdown', () => {
  test('OP-13-TC-04: Verify destination city dropdown is visible and contains expected cities', async ({ page }) => {
    // Precondition: Navigate to the homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Locate the destination city dropdown (select element with name "toPort")
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Step 2: Verify available options in the destination dropdown
    const options = destinationDropdown.locator('option');
    const optionTexts = await options.allTextContents();

    // Verify the dropdown contains the expected cities
    const expectedCities = ['Buenos Aires', 'Rome', 'London'];
    for (const city of expectedCities) {
      expect(optionTexts.some(text => text.trim() === city)).toBeTruthy();
    }
  });
});
