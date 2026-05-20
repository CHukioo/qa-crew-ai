import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-230 / [OP-13] TC-06
 * Title: Positive - Clicking 'Find Flights' redirects to flight results page
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 *   - Departure and destination cities are selected
 * 
 * Description:
 *   This test verifies that after selecting departure and destination cities,
 *   clicking the 'Find Flights' button redirects the user to a flight search
 *   results page (reserve.php).
 */
test.describe('[OP-13] TC-06: Find Flights Redirect', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Select Paris as departure and London as destination
   * Step 3: Click the 'Find Flights' button
   * Step 4: Verify redirection to the flight results page
   */
  test('TC-230: Clicking Find Flights redirects to flight results page', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Select Paris and London from the dropdowns
    await page.locator('select[name="fromPort"]').selectOption('Paris');
    await page.locator('select[name="toPort"]').selectOption('London');
    console.log('✓ Departure (Paris) and destination (London) cities selected');

    // Step 3: Locate and click the 'Find Flights' button
    const findFlightsButton = page.locator('input[type="submit"], button:has-text("Find Flights")');
    await expect(findFlightsButton).toBeVisible();
    await expect(findFlightsButton).toBeEnabled();
    await findFlightsButton.click();
    console.log('✓ "Find Flights" button located and clicked');

    // Step 4: Verify redirection to reserve.php
    await expect(page).toHaveURL(/reserve\.php/);
    console.log('✓ User redirected to flight results page (reserve.php)');
  });
});
