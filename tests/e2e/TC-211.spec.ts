import { test, expect } from '@playwright/test';

/**
 * TC-211: [TC-4] Positive – Select Departure (Paris) and Destination (London), Click Find Flights
 * 
 * Preconditions: Browser is open and connected to the internet. Both dropdowns are populated.
 * Priority: High
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Select 'Paris' from the departure city dropdown
 * 3. Select 'London' from the destination city dropdown
 * 4. Click the 'Find Flights' button
 */
test.describe('TC-211: Flight Search - Paris to London', () => {
  test('should search flights from Paris to London successfully', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');

    // Step 2: Select 'Paris' from the departure city dropdown
    // Expected: 'Paris' is selected and displayed in the departure field
    await page.selectOption('select[name="fromPort"]', 'Paris');
    const departureValue = await page.$eval('select[name="fromPort"]', el => (el as HTMLSelectElement).value);
    expect(departureValue).toBe('Paris');

    // Step 3: Select 'London' from the destination city dropdown
    // Expected: 'London' is selected and displayed in the destination field
    await page.selectOption('select[name="toPort"]', 'London');
    const destinationValue = await page.$eval('select[name="toPort"]', el => (el as HTMLSelectElement).value);
    expect(destinationValue).toBe('London');

    // Step 4: Click the 'Find Flights' button
    // Expected: User is redirected to a flight results page showing available flights from Paris to London
    await page.click('input[type="submit"][value="Find Flights"]');
    
    // Wait for navigation to complete
    await page.waitForURL('**/reserve.php**');
    
    
    // Verify we're on the flight results page
    await expect(page).toHaveURL(/reserve\.php/);
    
    // Verify the page shows flight information
    const heading = page.locator('h2');
    await expect(heading).toContainText('Flights from Paris to London');
    
    // Verify flight table is present with available flights
    const flightTable = page.locator('table.table');
    await expect(flightTable).toBeVisible();
  });
});