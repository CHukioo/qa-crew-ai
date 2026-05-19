import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-148
 * Title: [Positive] Both departure and destination dropdowns are visible and populated
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Observe the departure city dropdown on the page
 *   2. Open the departure city dropdown and verify cities: Paris, Philadelphia, Boston
 *   3. Observe the destination city dropdown on the page
 *   4. Open the destination city dropdown and verify cities: Buenos Aires, Rome, London
 */
test.describe('TC-148 - Both departure and destination dropdowns are visible and populated', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  // Step 1+2: Verify departure dropdown (labeled 'From') is visible and contains expected cities
  test('Departure city dropdown is visible and contains Paris, Philadelphia, Boston', async ({ page }) => {
    // Step 1: Locate the departure city dropdown (select element)
    const departureDropdown = page.locator('select[name="fromPort"]');
    
    // Verify the dropdown is visible on the page
    await expect(departureDropdown).toBeVisible();
    
    // Step 2: Get all option text values from the dropdown
    const departureOptions = await departureDropdown.locator('option').allTextContents();
    
    // Verify the expected cities are present in the dropdown
    expect(departureOptions).toContain('Paris');
    expect(departureOptions).toContain('Philadelphia');
    expect(departureOptions).toContain('Boston');
  });

  // Step 3+4: Verify destination dropdown (labeled 'To') is visible and contains expected cities
  test('Destination city dropdown is visible and contains Buenos Aires, Rome, London', async ({ page }) => {
    // Step 3: Locate the destination city dropdown (select element)
    const destinationDropdown = page.locator('select[name="toPort"]');
    
    // Verify the dropdown is visible on the page
    await expect(destinationDropdown).toBeVisible();
    
    // Step 4: Get all option text values from the dropdown
    const destinationOptions = await destinationDropdown.locator('option').allTextContents();
    
    // Verify the expected cities are present in the dropdown
    expect(destinationOptions).toContain('Buenos Aires');
    expect(destinationOptions).toContain('Rome');
    expect(destinationOptions).toContain('London');
  });
});
