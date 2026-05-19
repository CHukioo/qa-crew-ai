import { test, expect } from '@playwright/test';

/**
 * TC-212: [TC-8] Negative – Submit with Default / Unchanged Dropdown Values
 * 
 * Preconditions: Browser is open and connected to the internet. First-time load with no prior selections.
 * Priority: Medium
 * Type: Negative
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Do NOT change any dropdown selections (leave default values as-is)
 * 3. Click the 'Find Flights' button
 */
test.describe('TC-212: Default Values Submission (Edge Case)', () => {
  test('should handle submission with default dropdown values gracefully', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Do NOT change any dropdown selections (leave default values as-is)
    // Expected: Both dropdowns show their default selected values
    const departureSelect = page.locator('select[name="fromPort"]');
    const destinationSelect = page.locator('select[name="toPort"]');
    
    // Verify dropdowns are visible with default values
    await expect(departureSelect).toBeVisible();
    await expect(destinationSelect).toBeVisible();
    
    // Get the default selected values
    const defaultDeparture = await page.$eval('select[name="fromPort"]', el => (el as HTMLSelectElement).value);
    const defaultDestination = await page.$eval('select[name="toPort"]', el => (el as HTMLSelectElement).value);
    
    // Verify defaults are selected (not empty)
    expect(defaultDeparture).toBeTruthy();
    expect(defaultDestination).toBeTruthy();

    // Step 3: Click the 'Find Flights' button (without changing any selections)
    // Expected: System handles the submission - either shows results, displays an error message, or prompts user
    await page.click('input[type="submit"][value="Find Flights"]');
    
    // Wait for navigation
    await page.waitForURL('**/reserve.php**', { timeout: 10000 });
    
    // Verify the system handled the submission gracefully
    const currentUrl = page.url();
    expect(currentUrl).toContain('reserve.php');
    
    // Verify results page is rendered
    const heading = page.locator('h3');
    await expect(heading).toBeVisible();
  });
});