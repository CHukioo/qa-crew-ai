import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-229 / [OP-13] TC-05
 * Title: Positive - User can select different departure and destination cities
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 * 
 * Description:
 *   This test verifies that a user can select different cities from the
 *   departure and destination dropdowns, that the selections display
 *   correctly, and that the two selected cities are different.
 */
test.describe('[OP-13] TC-05: Select Different Cities', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Select 'Paris' from departure dropdown
   * Step 3: Select 'London' from destination dropdown
   * Step 4: Verify the two selected cities are different
   */
  test('TC-229: User can select different departure and destination cities', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Locate the two dropdowns
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');

    // Step 2: Select 'Paris' from the departure dropdown
    await departureDropdown.selectOption('Paris');
    const selectedDeparture = await departureDropdown.inputValue();
    expect(selectedDeparture).toBe('Paris');
    console.log('✓ "Paris" selected and displayed in the departure dropdown');

    // Step 3: Select 'London' from the destination dropdown
    await destinationDropdown.selectOption('London');
    const selectedDestination = await destinationDropdown.inputValue();
    expect(selectedDestination).toBe('London');
    console.log('✓ "London" selected and displayed in the destination dropdown');

    // Step 4: Verify departure and destination are NOT the same
    expect(selectedDeparture).not.toBe(selectedDestination);
    console.log('✓ Departure and destination cities are different (Paris ≠ London)');
  });
});
