import { test, expect } from '@playwright/test';

/**
 * TC-210: [TC-7] Negative – Select Same City for Departure and Destination
 * 
 * Preconditions: Browser is open and connected to the internet
 * Priority: Medium
 * Type: Negative
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Select 'Paris' from the departure city dropdown
 * 3. Select 'Paris' from the destination city dropdown
 * 4. Click the 'Find Flights' button
 */
test.describe('TC-210: Same City Flight Search (Negative)', () => {
  test('should handle selecting same city for departure and destination gracefully', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Select 'Paris' from the departure city dropdown
    // Expected: 'Paris' is selected
    await page.selectOption('select[name="fromPort"]', 'Paris');
    const departureValue = await page.$eval('select[name="fromPort"]', el => (el as HTMLSelectElement).value);
    expect(departureValue).toBe('Paris');

    // Step 3: Select 'Paris' from the destination city dropdown (if available as both)
    // Expected: 'Paris' is selected as destination OR system prevents selecting same city
    await page.selectOption('select[name="toPort"]', 'Paris');
    const destinationValue = await page.$eval('select[name="toPort"]', el => (el as HTMLSelectElement).value);
    expect(destinationValue).toBe('Paris');

    // Step 4: Click the 'Find Flights' button
    // Expected: System handles gracefully - shows an error message, redirects to results (possibly empty), or prevents submission
    await page.click('input[type="submit"][value="Find Flights"]');
    
    // Wait for navigation
    await page.waitForURL('**/reserve.php**', { timeout: 10000 });
    
    // Verify the system handled the request gracefully (navigated to some page)
    // The system should either redirect to results or stay on the page
    const currentUrl = page.url();
    expect(currentUrl).toContain('reserve.php');
  });
});