import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-181 (TC-06)
 * Title: Select departure city Boston and destination Buenos Aires and search for flights
 * Precondition: Open browser and navigate to https://blazedemo.com/
 */
test.describe('Flight Search: Boston to Buenos Aires - TC-181', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('should search flights from Boston to Buenos Aires', async ({ page }) => {
    // Step 1: Select 'Boston' from the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Boston');
    await expect(departureDropdown).toHaveValue('Boston');

    // Step 2: Select 'Buenos Aires' from the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('Buenos Aires');
    await expect(destinationDropdown).toHaveValue('Buenos Aires');

    // Step 3: Click the 'Find Flights' button and verify navigation to results page
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();
    await expect(page).toHaveURL(/reserve\.php/);
    // Confirm flight results are displayed
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();
  });
});
