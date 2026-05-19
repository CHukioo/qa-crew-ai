import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-151
 * Title: [Positive] User can select a destination city from dropdown
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Click on the destination city dropdown to expand it
 *   2. Select 'Buenos Aires' from the destination dropdown
 *   3. Repeat by selecting 'Rome'
 *   4. Repeat by selecting 'London'
 */
test.describe('TC-151 - User can select a destination city from dropdown', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  // Steps 1-4: Test selecting each available destination city
  test('User can select Buenos Aires, Rome, and London from the destination dropdown', async ({ page }) => {
    // Locate the destination city dropdown (select element)
    const destinationDropdown = page.locator('select[name="toPort"]');
    
    // Step 1: Click on the destination city dropdown to expand it (verify it's interactive)
    await destinationDropdown.click();
    
    // Step 2: Select 'Buenos Aires' from the destination dropdown
    await destinationDropdown.selectOption('Buenos Aires');
    // Verify 'Buenos Aires' is selected and visible in the dropdown field
    await expect(destinationDropdown).toHaveValue('Buenos Aires');
    
    // Step 3: Select 'Rome' from the destination dropdown
    await destinationDropdown.selectOption('Rome');
    // Verify 'Rome' is selected and visible in the dropdown field
    await expect(destinationDropdown).toHaveValue('Rome');
    
    // Step 4: Select 'London' from the destination dropdown
    await destinationDropdown.selectOption('London');
    // Verify 'London' is selected and visible in the dropdown field
    await expect(destinationDropdown).toHaveValue('London');
  });
});
