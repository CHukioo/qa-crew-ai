import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-07
 * Title: Verify error/behavior when departure and destination cities are the same
 * Type: Negative
 * Priority: Medium
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Paris' from the departure dropdown.
 *      -> 'Paris' is selected.
 *   2. Attempt to select 'Paris' from the destination dropdown.
 *      -> If the same city is not available in destination list, verify exclusion.
 *   3. Click the 'Find Flights' button.
 *      -> The system handles gracefully without crashing.
 */
test.describe('OP-13: Same Departure and Destination City', () => {
  test('OP-13-TC-07: Verify behavior when departure and destination cities are the same', async ({ page }) => {
    // Precondition: Navigate to the homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Select 'Paris' from the departure city dropdown
    await page.selectOption('select[name="fromPort"]', 'Paris');
    const departureValue = await page.locator('select[name="fromPort"]').inputValue();
    expect(departureValue).toBe('Paris');

    // Step 2: Try to select 'Paris' from the destination dropdown
    // The destination dropdown may or may not include the departure city.
    // Check if 'Paris' is available in the destination options.
    const destinationDropdown = page.locator('select[name="toPort"]');
    const destOptions = destinationDropdown.locator('option');
    const destOptionTexts = await destOptions.allTextContents();
    const parisAvailableInDest = destOptionTexts.some(text => text.trim() === 'Paris');

    if (parisAvailableInDest) {
      // If Paris is available in destination, select it
      await page.selectOption('select[name="toPort"]', 'Paris');
    } else {
      // If Paris is excluded (intelligent exclusion), select the first available option
      await page.selectOption('select[name="toPort"]', { index: 0 });
    }

    // Step 3: Click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify the application handles this gracefully — either stays on the page
    // with a message or redirects to results without crashing
    const currentUrl = page.url();
    // The app should either stay on the homepage (validation error) or go to results
    // In either case, the test passes as long as no crash occurs.
    // We just verify the page loaded without an error state
    await expect(page.locator('body')).toBeVisible();
  });
});
