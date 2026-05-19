import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-170 — [OP-13] Happy path - Select cities and click Find Flights
 * Type: Positive
 * Priority: High
 *
 * Preconditions: User is on https://blazedemo.com/ homepage
 *
 * This test verifies the complete happy path flow:
 * 1. Select Paris as departure city
 * 2. Select London as destination city
 * 3. Click Find Flights
 * 4. Verify redirection to flight results page
 * 5. Verify flight results are displayed with a table of available flights
 */
test.describe('[OP-13] Happy path - Select cities and click Find Flights', () => {

  test('TC-170: Complete flight search happy path from Paris to London', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Select 'Paris' from the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 3: Select 'London' from the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('London');
    await expect(destinationDropdown).toHaveValue('London');

    // Step 4: Click the 'Find Flights' button
    const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsButton.click();

    // Step 5: Verify the URL or page content reflects the flight search results
    // The user should be redirected to a page like /reserve.php
    await expect(page).toHaveURL(/.*reserve\.php.*/);

    // Verify the page displays a table/list of flights with departure and destination details
    const flightTable = page.locator('table').first();
    await expect(flightTable).toBeVisible();

    // Verify the page contains flight choice information
    const pageBody = page.locator('body');
    await expect(pageBody).toContainText('Flight');

    // Verify the departure and destination cities are indicated on the results page
    await expect(pageBody).toContainText('Paris');
    await expect(pageBody).toContainText('London');
  });
});
