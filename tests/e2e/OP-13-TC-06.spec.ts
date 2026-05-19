import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-06
 * Title: Verify 'Find Flights' button is clickable and functional with different city combinations
 * Type: Positive
 * Priority: High
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Philadelphia' from departure dropdown.
 *      -> 'Philadelphia' is selected.
 *   2. Select 'Rome' from destination dropdown.
 *      -> 'Rome' is selected.
 *   3. Click the 'Find Flights' button.
 *      -> Redirects to flight results page for Philadelphia to Rome.
 */
test.describe('OP-13: Flight Search - Philadelphia to Rome', () => {
  test('OP-13-TC-06: Verify different city combination works correctly', async ({ page }) => {
    // Precondition: Navigate to the homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Select 'Philadelphia' from the departure city dropdown
    await page.selectOption('select[name="fromPort"]', 'Philadelphia');
    const departureValue = await page.locator('select[name="fromPort"]').inputValue();
    expect(departureValue).toBe('Philadelphia');

    // Step 2: Select 'Rome' from the destination city dropdown
    await page.selectOption('select[name="toPort"]', 'Rome');
    const destinationValue = await page.locator('select[name="toPort"]').inputValue();
    expect(destinationValue).toBe('Rome');

    // Step 3: Click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify navigation to the flight results page
    await expect(page).toHaveURL(/\/reserve\.php/);

    // Verify that the results table is displayed with flight options
    const flightsTable = page.locator('table');
    await expect(flightsTable).toBeVisible();
  });
});
