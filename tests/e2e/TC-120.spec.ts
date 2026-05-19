import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-120
 * [OP-13] TC-05: Select departure city (Boston) and destination city (London) and click Find Flights
 * 
 * Preconditions:
 *   1. User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Boston' from the departure city dropdown.
 *   2. Select 'London' from the destination city dropdown.
 *   3. Click the 'Find Flights' button.
 * 
 * Expected:
 *   - Boston is selected in departure.
 *   - London is selected in destination.
 *   - User is redirected to /reserve.php showing flights from Boston to London.
 */
test.describe('OP-13 - Flight Search - Boston to London', () => {
  test('TC-120: Select Boston -> London and find flights', async ({ page }) => {
    // Precondition: Navigate to homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Select 'Boston' from the departure city dropdown
    await test.step('Select Boston as departure city', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Boston');
      // Verify Boston is selected
      await expect(departureDropdown).toHaveValue('Boston');
    });

    // Step 2: Select 'London' from the destination city dropdown
    await test.step('Select London as destination city', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.selectOption('London');
      // Verify London is selected
      await expect(destinationDropdown).toHaveValue('London');
    });

    // Step 3: Click the 'Find Flights' button
    await test.step('Click Find Flights button and verify redirection', async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();
      // Verify user is redirected to the reserve.php page
      await expect(page).toHaveURL(/reserve\.php/);
      // Verify the page shows flight results for the correct city pair
      await expect(page.locator('h3')).toContainText('Flights from Boston to London:');
    });
  });
});
