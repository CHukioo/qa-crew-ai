import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-234 / [OP-13] TC-10
 * Title: Negative - Selecting same city for departure and destination
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 * 
 * Description:
 *   This negative test verifies the application behavior when the user
 *   selects the same city (Paris) for both departure and destination.
 *   BlazeDemo does not enforce same-city validation - it processes the
 *   request and redirects to results. This test documents that behavior.
 */
test.describe('[OP-13] TC-10: Same City Selection (Negative)', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Select 'Paris' for both departure AND destination
   * Step 3: Click 'Find Flights' and verify the application handles gracefully
   */
  test('TC-234: Selecting same city for departure and destination', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Select 'Paris' from both departure and destination dropdowns
    await page.locator('select[name="fromPort"]').selectOption('Paris');
    await page.locator('select[name="toPort"]').selectOption('Paris');
    console.log('✓ "Paris" selected for both departure and destination');

    // Step 3: Click the 'Find Flights' button
    await page.locator('input[type="submit"]').click();

    // BlazeDemo does not block same-city selection; it redirects to results
    // Verify the application handles this gracefully (no crash, no error page)
    await expect(page).toHaveURL(/reserve\.php/);
    console.log('✓ Application handles same-city selection gracefully - redirects to reserve.php');

    // Verify that the results are still displayed
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();
    console.log('✓ Flight results are still displayed');
  });
});
