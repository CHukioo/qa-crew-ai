import { test, expect } from '@playwright/test';

/**
 * TC-207: [TC-6] Positive – Select Departure (Boston) and Destination (Buenos Aires), Click Find Flights
 * 
 * Preconditions: Browser is open and connected to the internet. Both dropdowns are populated.
 * Priority: High
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Select 'Boston' from the departure city dropdown
 * 3. Select 'Buenos Aires' from the destination city dropdown
 * 4. Click the 'Find Flights' button
 */
test.describe('TC-207: Flight Search - Boston to Buenos Aires', () => {
  test('should search flights from Boston to Buenos Aires successfully', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');

    // Step 2: Select 'Boston' from the departure city dropdown
    // Expected: 'Boston' is selected and displayed in the departure field
    await page.selectOption('select[name="fromPort"]', 'Boston');
    const departureValue = await page.$eval('select[name="fromPort"]', el => (el as HTMLSelectElement).value);
    expect(departureValue).toBe('Boston');

    // Step 3: Select 'Buenos Aires' from the destination city dropdown
    // Expected: 'Buenos Aires' is selected and displayed in the destination field
    await page.selectOption('select[name="toPort"]', 'Buenos Aires');
    const destinationValue = await page.$eval('select[name="toPort"]', el => (el as HTMLSelectElement).value);
    expect(destinationValue).toBe('Buenos Aires');

    // Step 4: Click the 'Find Flights' button
    // Expected: User is redirected to a flight results page showing available flights from Boston to Buenos Aires
    await page.click('input[type="submit"][value="Find Flights"]');
    
    // Wait for navigation to complete
    await page.waitForURL('**/reserve.php**');
    
    // Verify we're on the flight results page
    await expect(page).toHaveURL(/reserve\.php/);
    
    // Verify the page shows flight information
    const heading = page.locator('h3');
    await expect(heading).toContainText(' from Boston to Buenos Aires');
    
    // Verify flight table is present with available flights
    const flightTable = page.locator('div.container table.table');
    await expect(flightTable).toBeVisible();
  });
});