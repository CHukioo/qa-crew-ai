import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-03
 * Title: Verify departure city dropdown is visible and contains expected cities
 * Type: Positive
 * Priority: High
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Locate the departure city dropdown.
 *      -> A dropdown/select element labeled for departure city is visible.
 *   2. Click on the dropdown to expand options.
 *      -> The dropdown displays a list including: Paris, Philadelphia, Boston.
 */
test.describe('OP-13: Departure City Dropdown', () => {
  test('OP-13-TC-03: Verify departure city dropdown is visible and contains expected cities', async ({ page }) => {
    // Precondition: Navigate to the homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Locate the departure city dropdown (select element with name "fromPort")
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Step 2: Verify available options in the departure dropdown
    // Get all option elements inside the departure dropdown
    const options = departureDropdown.locator('option');
    const optionTexts = await options.allTextContents();

    // Verify the dropdown contains the expected cities
    const expectedCities = ['Paris', 'Philadelphia', 'Boston'];
    for (const city of expectedCities) {
      expect(optionTexts.some(text => text.trim() === city)).toBeTruthy();
    }
  });
});
