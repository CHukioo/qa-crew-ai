import { test, expect } from '@playwright/test';

/**
 * TC-197: [POS] TC-06: Select Boston → Buenos Aires and click Find Flights
 *
 * Preconditions:
 * 1. Browser is launched.
 * 2. Navigate to https://blazedemo.com/
 *
 * Steps:
 * 1. From the departure city dropdown, select 'Boston'.
 *    - Expected: 'Boston' is selected and displayed in the departure field.
 * 2. From the destination city dropdown, select 'Buenos Aires'.
 *    - Expected: 'Buenos Aires' is selected and displayed in the destination field.
 * 3. Click the 'Find Flights' button.
 *    - Expected: User is redirected to the flight results page showing available flights from Boston to Buenos Aires.
 */
test.describe('OP-13 — Flight Search: Boston → Buenos Aires', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before the test
    await page.goto('https://blazedemo.com/');
  });

  test('TC-197: Select Boston → Buenos Aires and click Find Flights', async ({ page }) => {
    // Step 1: Select 'Boston' from the departure city dropdown
    await page.selectOption('select[name="fromPort"]', 'Boston');
    // Verify 'Boston' is selected
    const departureValue = await page.locator('select[name="fromPort"]').inputValue();
    expect(departureValue).toBe('Boston');

    // Step 2: Select 'Buenos Aires' from the destination city dropdown
    await page.selectOption('select[name="toPort"]', 'Buenos Aires');
    // Verify 'Buenos Aires' is selected
    const destinationValue = await page.locator('select[name="toPort"]').inputValue();
    expect(destinationValue).toBe('Buenos Aires');

    // Step 3: Click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify redirection to the flight results page
    await expect(page).toHaveURL(/reserve\.php/);
    // Verify the page displays flights from Boston to Buenos Aires
    await expect(page.locator('h3')).toContainText(/Flights from Boston to Buenos Aires/);
  });
});
