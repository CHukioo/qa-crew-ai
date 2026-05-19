import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-124
 * [OP-13] TC-07: Negative - Click Find Flights without selecting any cities (default selections)
 * 
 * Preconditions:
 *   1. User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Do not change any dropdown selections (leave defaults as-is).
 *   2. Click the 'Find Flights' button.
 * 
 * Expected:
 *   - Default options are selected in both dropdowns.
 *   - User is redirected to the flight results page without errors.
 *   - The application handles default values gracefully.
 */
test.describe('OP-13 - Default Selections Negative Test', () => {
  test('TC-124: Click Find Flights with default dropdown selections', async ({ page }) => {
    // Precondition: Navigate to homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Verify default options are selected without changing anything
    await test.step('Do not change any dropdown selections (leave defaults as-is)', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      const destinationDropdown = page.locator('select[name="toPort"]');
      
      // Verify dropdowns have values selected by default
      const departureValue = await departureDropdown.inputValue();
      const destinationValue = await destinationDropdown.inputValue();
      
      // Default values should be non-empty strings
      expect(departureValue).toBeTruthy();
      expect(destinationValue).toBeTruthy();
    });

    // Step 2: Click the 'Find Flights' button with default selections
    await test.step('Click Find Flights button with default values', async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();
      
      // Verify redirection to reserve.php (system uses default values gracefully)
      await expect(page).toHaveURL(/reserve\.php/);
      
      // Verify results page loaded successfully (h3 heading is present)
      await expect(page.locator('h3')).toBeVisible();
    });
  });
});
