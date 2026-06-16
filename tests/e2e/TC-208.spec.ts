import { test, expect } from '@playwright/test';

/**
 * TC-208: [TC-5] Positive – Select Departure (Philadelphia) and Destination (Rome), Click Find Flights
 * 
 * Preconditions: Browser is open and connected to the internet. Both dropdowns are populated.
 * Priority: High
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Select 'Philadelphia' from the departure city dropdown
 * 3. Select 'Rome' from the destination city dropdown
 * 4. Click the 'Find Flights' button
 */
test.describe('TC-208: Flight Search - Philadelphia to Rome', () => {
  test('should search flights from Philadelphia to Rome successfully', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');

    // Step 2: Select 'Philadelphia' from the departure city dropdown
    // Expected: 'Philadelphia' is selected and displayed in the departure field
    await page.selectOption('select[name="fromPort"]', 'Philadelphia');
    const departureValue = await page.$eval('select[name="fromPort"]', el => (el as HTMLSelectElement).value);
    expect(departureValue).toBe('Philadelphia');

    // Step 3: Select 'Rome' from the destination city dropdown
    // Expected: 'Rome' is selected and displayed in the destination field
    await page.selectOption('select[name="toPort"]', 'Rome');
    const destinationValue = await page.$eval('select[name="toPort"]', el => (el as HTMLSelectElement).value);
    expect(destinationValue).toBe('Rome');

    // Step 4: Click the 'Find Flights' button
    // Expected: User is redirected to a flight results page showing available flights from Philadelphia to Rome
    await page.click('input[type="submit"][value="Find Flights"]');
    
    // Wait for navigation to complete
    await page.waitForURL('**/reserve.php**');
    
    // Verify we're on the flight results page
    await expect(page).toHaveURL(/reserve\.php/);
    
    // Verify the page shows flight information
    const heading = page.locator('h3');
    await expect(heading).toContainText(' from Philadelphia to Rome');
    
    // Verify flight table is present with available flights
    const flightTable = page.locator('div.container table.table');
    await expect(flightTable).toBeVisible();
  });
});