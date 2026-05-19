import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-123
 * [OP-13] TC-04: Select departure city (Philadelphia) and destination city (Rome) and click Find Flights
 * 
 * Preconditions:
 *   1. User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Select 'Philadelphia' from the departure city dropdown.
 *   2. Select 'Rome' from the destination city dropdown.
 *   3. Click the 'Find Flights' button.
 * 
 * Expected:
 *   - Philadelphia is selected in departure.
 *   - Rome is selected in destination.
 *   - User is redirected to /reserve.php showing flights from Philadelphia to Rome.
 */
test.describe('OP-13 - Flight Search - Philadelphia to Rome', () => {
  test('TC-123: Select Philadelphia -> Rome and find flights', async ({ page }) => {
    // Precondition: Navigate to homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Select 'Philadelphia' from the departure city dropdown
    await test.step('Select Philadelphia as departure city', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Philadelphia');
      // Verify Philadelphia is selected
      await expect(departureDropdown).toHaveValue('Philadelphia');
    });

    // Step 2: Select 'Rome' from the destination city dropdown
    await test.step('Select Rome as destination city', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.selectOption('Rome');
      // Verify Rome is selected
      await expect(destinationDropdown).toHaveValue('Rome');
    });

    // Step 3: Click the 'Find Flights' button
    await test.step('Click Find Flights button and verify redirection', async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();
      // Verify user is redirected to the reserve.php page
      await expect(page).toHaveURL(/reserve\.php/);
      // Verify the page shows flight results for the correct city pair
      await expect(page.locator('h3')).toContainText('Flights from Philadelphia to Rome:');
    });
  });
});
