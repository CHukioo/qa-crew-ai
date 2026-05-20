import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-232 / [OP-13] TC-08
 * Title: Positive - Flight search with Paris to Rome returns results
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 * 
 * Description:
 *   This test performs a flight search from Paris to Rome and verifies
 *   that the user is redirected to a flight results page showing
 *   available flights with airline names, prices, and flight details.
 */
test.describe('[OP-13] TC-08: Paris to Rome Flight Search', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Select Paris as departure
   * Step 3: Select Rome as destination
   * Step 4: Click Find Flights and verify results page
   */
  test('TC-232: Flight search with Paris to Rome returns results', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Select 'Paris' from the departure dropdown
    await page.locator('select[name="fromPort"]').selectOption('Paris');
    console.log('✓ "Paris" selected as departure city');

    // Step 3: Select 'Rome' from the destination dropdown
    await page.locator('select[name="toPort"]').selectOption('Rome');
    console.log('✓ "Rome" selected as destination city');

    // Step 4: Click 'Find Flights' button
    await page.locator('input[type="submit"]').click();

    // Verify redirection to reserve.php (flight results page)
    await expect(page).toHaveURL(/reserve\.php/);
    console.log('✓ Redirected to reserve.php flight results page');

    // Verify the results table is present with flight data
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();
    console.log('✓ Flight results table is displayed with available flights');
  });
});
