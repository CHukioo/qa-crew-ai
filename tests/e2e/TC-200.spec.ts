import { test, expect } from '@playwright/test';

/**
 * TC-200: [POS] TC-03: Select Paris → London and click Find Flights
 *
 * Preconditions:
 * 1. Browser is launched.
 * 2. Navigate to https://blazedemo.com/
 *
 * Steps:
 * 1. From the departure city dropdown, select 'Paris'.
 *    - Expected: 'Paris' is selected and displayed in the departure field.
 * 2. From the destination city dropdown, select 'London'.
 *    - Expected: 'London' is selected and displayed in the destination field.
 * 3. Click the 'Find Flights' button.
 *    - Expected: User is redirected to the flight results page showing available flights from Paris to London.
 */
test.describe('OP-13 — Flight Search: Paris → London', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before the test
    await page.goto('https://blazedemo.com/');
  });

  test('TC-200: Select Paris → London and click Find Flights', async ({ page }) => {
    // Step 1: Select 'Paris' from the departure city dropdown
    await page.selectOption('select[name="fromPort"]', 'Paris');
    // Verify 'Paris' is selected
    const departureValue = await page.locator('select[name="fromPort"]').inputValue();
    expect(departureValue).toBe('Paris');

    // Step 2: Select 'London' from the destination city dropdown
    await page.selectOption('select[name="toPort"]', 'London');
    // Verify 'London' is selected
    const destinationValue = await page.locator('select[name="toPort"]').inputValue();
    expect(destinationValue).toBe('London');

    // Step 3: Click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify redirection to the flight results page
    await expect(page).toHaveURL(/reserve\.php/);
    // Optionally, verify the page shows results for the selected route
    await expect(page.locator('h3')).toContainText(/Flights from Paris to London/);
  });
});
