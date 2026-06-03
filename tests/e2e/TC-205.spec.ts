import { test, expect } from '@playwright/test';

/**
 * TC-205: [TC-9] Verify 'home' Link Navigates Back to Homepage from Results Page
 * 
 * Preconditions: Browser is open and connected to the internet
 * Priority: Medium
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Select 'Paris' from departure and 'London' from destination, click 'Find Flights'
 * 3. Click the 'home' link in the navigation bar
 */
test.describe('TC-205: Home Link Navigation from Results Page', () => {
  test('should navigate back to homepage when clicking home link from results page', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Select 'Paris' from departure and 'London' from destination, click 'Find Flights'
    // Expected: User is redirected to the flight results page
    await page.selectOption('select[name="fromPort"]', 'Paris');
    await page.selectOption('select[name="toPort"]', 'London');
    await page.click('input[type="submit"][value="Find Flights"]');
    
    // Wait for the results page to load
    await page.waitForURL('**/reserve.php**');
    await expect(page).toHaveURL(/reserve\.php/);

    // Step 3: Click the 'home' link in the navigation bar
    // Expected: User is redirected back to the homepage with the original dropdown fields visible
    const homeLink = page.locator('a:has-text("Home")');
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    
    // Wait for navigation back to homepage
    await page.waitForURL('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');
    
    // Verify the homepage elements are present (dropdown fields visible)
    const departureSelect = page.locator('select[name="fromPort"]');
    const destinationSelect = page.locator('select[name="toPort"]');
    await expect(departureSelect).toBeVisible();
    await expect(destinationSelect).toBeVisible();
  });
});