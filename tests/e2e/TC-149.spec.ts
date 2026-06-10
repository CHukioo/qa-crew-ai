import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-149
 * Title: [Positive] User can select a departure city from dropdown
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Click on the departure city dropdown to expand it
 *   2. Select 'Paris' from the departure dropdown
 *   3. Repeat by selecting 'Philadelphia'
 *   4. Repeat by selecting 'Boston'
 */
test.describe('TC-149 - User can select a departure city from dropdown', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  // Steps 1-4: Test selecting each available departure city
  test('User can select Paris, Philadelphia, and Boston from the departure dropdown', async ({ page }) => {
    // Locate the departure city dropdown (select element)
    const departureDropdown = page.locator('select[name="fromPort"]');
    
    // Step 1: Click on the departure city dropdown to expand it (verify it's interactive)
    await departureDropdown.click();
    
    // Step 2: Select 'Paris' from the departure dropdown
    await departureDropdown.selectOption('Paris');
    // Verify 'Paris' is selected and visible in the dropdown field
    await expect(departureDropdown).toHaveValue('Paris');
    
    // Step 3: Select 'Philadelphia' from the departure dropdown
    await departureDropdown.selectOption('Philadelphia');
    // Verify 'Philadelphia' is selected and visible in the dropdown field
    await expect(departureDropdown).toHaveValue('Philadelphia');
    
    // Step 4: Select 'Boston' from the departure dropdown
    await departureDropdown.selectOption('Boston');
    // Verify 'Boston' is selected and visible in the dropdown field
    await expect(departureDropdown).toHaveValue('Boston');
  });
});
