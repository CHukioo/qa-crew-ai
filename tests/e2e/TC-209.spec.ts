import { test, expect } from '@playwright/test';

/**
 * TC-209: [TC-3] Verify Both Departure and Destination Dropdowns Are Visible and Populated
 * 
 * Preconditions: Browser is open and connected to the internet
 * Priority: High
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Locate the departure city dropdown
 * 3. Verify dropdown options include Paris, Philadelphia, Boston
 * 4. Locate the destination city dropdown
 * 5. Verify dropdown options include Buenos Aires, Rome, London
 */
test.describe('TC-209: Dropdown Visibility and Options Verification', () => {
  test('should show populated departure and destination dropdowns', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');

    // Step 2: Locate the departure city dropdown
    // Expected: Departure city dropdown is visible on the page
    const departureSelect = page.locator('select[name="fromPort"]');
    await expect(departureSelect).toBeVisible();

    // Step 3: Verify dropdown options include at least: Paris, Philadelphia, Boston
    // Expected: Dropdown options are displayed including the expected cities
    const departureOptions = departureSelect.locator('option');
    const departureTexts = await departureOptions.allTextContents();
    expect(departureTexts).toContain('Paris');
    expect(departureTexts).toContain('Philadelphia');
    expect(departureTexts).toContain('Boston');

    // Step 4: Locate the destination city dropdown
    // Expected: Destination city dropdown is visible on the page
    const destinationSelect = page.locator('select[name="toPort"]');
    await expect(destinationSelect).toBeVisible();

    // Step 5: Verify dropdown options include at least: Buenos Aires, Rome, London
    // Expected: Dropdown options are displayed including the expected cities
    const destinationOptions = destinationSelect.locator('option');
    const destinationTexts = await destinationOptions.allTextContents();
    expect(destinationTexts).toContain('Buenos Aires');
    expect(destinationTexts).toContain('Rome');
    expect(destinationTexts).toContain('London');
  });
});