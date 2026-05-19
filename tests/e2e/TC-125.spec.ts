import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-125
 * [OP-13] TC-03: Select departure city (Paris) and destination city (Buenos Aires) and click Find Flights
 * 
 * Preconditions:
 *   1. User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Paris' from the departure city dropdown.
 *   2. Select 'Buenos Aires' from the destination city dropdown.
 *   3. Click the 'Find Flights' button.
 * 
 * Expected:
 *   - Paris is selected in departure.
 *   - Buenos Aires is selected in destination.
 *   - User is redirected to /reserve.php showing flights from Paris to Buenos Aires.
 */
test.describe('OP-13 - Flight Search - Paris to Buenos Aires', () => {
  test('TC-125: Select Paris -> Buenos Aires and find flights', async ({ page }) => {
    // Precondition: Navigate to homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Select 'Paris' from the departure city dropdown
    await test.step('Select Paris as departure city', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Paris');
      // Verify Paris is selected
      await expect(departureDropdown).toHaveValue('Paris');
    });

    // Step 2: Select 'Buenos Aires' from the destination city dropdown
    await test.step('Select Buenos Aires as destination city', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.selectOption('Buenos Aires');
      // Verify Buenos Aires is selected
      await expect(destinationDropdown).toHaveValue('Buenos Aires');
    });

    // Step 3: Click the 'Find Flights' button
    await test.step('Click Find Flights button and verify redirection', async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();
      // Verify user is redirected to the reserve.php page
      await expect(page).toHaveURL(/reserve\.php/);
      // Verify the page shows flight results
      await expect(page.locator('h3')).toContainText('Flights from Paris to Buenos Aires:');
    });
  });
});
