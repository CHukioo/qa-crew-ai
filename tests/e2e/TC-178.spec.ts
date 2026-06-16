import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-178 (TC-04)
 * Title: Select departure city Philadelphia and destination Rome and search for flights
 * Precondition: Open browser and navigate to https://blazedemo.com/
 */
test.describe('Flight Search: Philadelphia to Rome - TC-178', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('should search flights from Philadelphia to Rome', async ({ page }) => {
    // Step 1: Select 'Philadelphia' from the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Philadelphia');
    await expect(departureDropdown).toHaveValue('Philadelphia');

    // Step 2: Select 'Rome' from the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('Rome');
    await expect(destinationDropdown).toHaveValue('Rome');

    // Step 3: Click the 'Find Flights' button and verify navigation to results page
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();
    await expect(page).toHaveURL(/reserve\.php/);
    // Confirm flight results are displayed
    const flightTable = page.locator('table');
    await expect(flightTable).toBeVisible();
  });
});
