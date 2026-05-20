import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-231 / [OP-13] TC-07
 * Title: Positive - Verify 'Find Flights' button is visible and labeled correctly
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 * 
 * Description:
 *   This test verifies that the 'Find Flights' button is visible on the
 *   homepage and is labeled with the exact text 'Find Flights'.
 */
test.describe('[OP-13] TC-07: Find Flights Button Verification', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Locate the 'Find Flights' button
   * Step 3: Verify the button text/label
   */
  test('TC-231: Find Flights button is visible and labeled correctly', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Locate the 'Find Flights' button on the page
    const findFlightsButton = page.locator('input[type="submit"], button');
    await expect(findFlightsButton).toBeVisible();
    console.log('✓ "Find Flights" button is visible on the page');

    // Step 3: Verify the button text/label is 'Find Flights'
    const buttonValue = await findFlightsButton.getAttribute('value');
    expect(buttonValue).toBe('Find Flights');
    console.log('✓ Button is labeled "Find Flights"');
  });
});
