import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-177 (TC-03)
 * Title: Select departure city Paris and destination London and search for flights
 * Precondition: Open browser and navigate to https://blazedemo.com/
 */
test.describe('Flight Search: Paris to London - TC-177', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('should search flights from Paris to London', async ({ page }) => {
    // Step 1: Select 'Paris' from the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 2: Select 'London' from the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('London');
    await expect(destinationDropdown).toHaveValue('London');

    // Step 3: Click the 'Find Flights' button and verify navigation to results page
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();
    await expect(page).toHaveURL(/reserve\.php/);
    // Verify that a list of flights is displayed
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();
  });
});
