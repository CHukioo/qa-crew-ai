import { test, expect } from '@playwright/test';

/**
 * TC-201: [POS] TC-04: Select Philadelphia → Rome and click Find Flights
 *
 * Preconditions:
 * 1. Browser is launched.
 * 2. Navigate to https://blazedemo.com/
 *
 * Steps:
 * 1. From the departure city dropdown, select 'Philadelphia'.
 *    - Expected: 'Philadelphia' is selected and displayed in the departure field.
 * 2. From the destination city dropdown, select 'Rome'.
 *    - Expected: 'Rome' is selected and displayed in the destination field.
 * 3. Click the 'Find Flights' button.
 *    - Expected: User is redirected to the flight results page showing available flights from Philadelphia to Rome.
 */
test.describe('OP-13 — Flight Search: Philadelphia → Rome', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before the test
    await page.goto('https://blazedemo.com/');
  });

  test('TC-201: Select Philadelphia → Rome and click Find Flights', async ({ page }) => {
    // Step 1: Select 'Philadelphia' from the departure city dropdown
    await page.selectOption('select[name="fromPort"]', 'Philadelphia');
    // Verify 'Philadelphia' is selected
    const departureValue = await page.locator('select[name="fromPort"]').inputValue();
    expect(departureValue).toBe('Philadelphia');

    // Step 2: Select 'Rome' from the destination city dropdown
    await page.selectOption('select[name="toPort"]', 'Rome');
    // Verify 'Rome' is selected
    const destinationValue = await page.locator('select[name="toPort"]').inputValue();
    expect(destinationValue).toBe('Rome');

    // Step 3: Click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify redirection to the flight results page
    await expect(page).toHaveURL(/reserve\.php/);
    // Verify the page displays flights from Philadelphia to Rome
    await expect(page.locator('h3')).toContainText(/Flights from Philadelphia to Rome/);
  });
});
