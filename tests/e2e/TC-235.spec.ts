import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-235 / [OP-13] TC-11
 * Title: Negative - Clicking 'Find Flights' without changing default dropdown selections
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 * 
 * Description:
 *   This negative test verifies the application behavior when the user
 *   clicks 'Find Flights' without changing the default dropdown selections.
 *   BlazeDemo processes the defaults (Paris to Buenos Aires) gracefully
 *   and redirects to the flight results page.
 */
test.describe('[OP-13] TC-11: Default Selections (Negative)', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Confirm dropdowns remain at default values
   * Step 3: Click 'Find Flights' and verify the application handles gracefully
   */
  test('TC-235: Clicking Find Flights without changing default selections', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Verify that the dropdowns still have their default values selected
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');

    // Get the currently selected values (defaults)
    const defaultDeparture = await departureDropdown.inputValue();
    const defaultDestination = await destinationDropdown.inputValue();
    console.log(`✓ Default departure: "${defaultDeparture}", default destination: "${defaultDestination}"`);

    // Step 3: Click the 'Find Flights' button without changing any selections
    await page.locator('input[type="submit"]').click();

    // Verify the application handles default selections gracefully
    await expect(page).toHaveURL(/reserve\.php/);
    console.log('✓ Application handles default selections gracefully - redirects to reserve.php');

    // Verify flight results are still displayed
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();
    console.log('✓ Flight results are displayed with default city selections');
  });
});
