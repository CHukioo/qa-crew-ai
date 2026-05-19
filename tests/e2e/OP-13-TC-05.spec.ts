import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-05
 * Title: Verify user can select a departure city and a destination city, then click 'Find Flights' to search
 * Type: Positive
 * Priority: High
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Paris' from departure dropdown.
 *      -> 'Paris' is selected and displayed.
 *   2. Select 'London' from destination dropdown.
 *      -> 'London' is selected and displayed.
 *   3. Click the 'Find Flights' button.
 *      -> Redirects to /reserve.php showing available flights.
 */
test.describe('OP-13: Flight Search - Paris to London', () => {
  test('OP-13-TC-05: Verify user can search for flights from Paris to London', async ({ page }) => {
    // Precondition: Navigate to the homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Select 'Paris' from the departure city dropdown
    await page.selectOption('select[name="fromPort"]', 'Paris');
    // Confirm 'Paris' is selected
    const departureValue = await page.locator('select[name="fromPort"]').inputValue();
    expect(departureValue).toBe('Paris');

    // Step 2: Select 'London' from the destination city dropdown
    await page.selectOption('select[name="toPort"]', 'London');
    // Confirm 'London' is selected
    const destinationValue = await page.locator('select[name="toPort"]').inputValue();
    expect(destinationValue).toBe('London');

    // Step 3: Click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify navigation to the flight results page
    await expect(page).toHaveURL(/\/reserve\.php/);

    // Verify that a table of available flights is displayed
    const flightsTable = page.locator('table');
    await expect(flightsTable).toBeVisible();
  });
});
