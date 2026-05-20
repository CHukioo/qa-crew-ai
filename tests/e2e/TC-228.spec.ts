import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-228 / [OP-13] TC-04
 * Title: Verify destination city dropdown is visible and populated with cities
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 * 
 * Description:
 *   This test verifies that the destination city dropdown is visible on the
 *   homepage, can be clicked to expand, and contains expected cities such
 *   as 'Buenos Aires', 'Rome', and 'London'.
 */
test.describe('[OP-13] TC-04: Destination City Dropdown Verification', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Locate and verify destination dropdown is visible
   * Step 3: Click dropdown and verify it contains expected cities
   */
  test('TC-228: Destination city dropdown is visible and populated', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Locate the destination city dropdown (select element with name 'toPort')
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();
    console.log('✓ Destination city dropdown is visible on the page');

    // Step 3: Verify it contains expected cities
    // Get all option texts from the dropdown
    const options = destinationDropdown.locator('option');
    const optionTexts = await options.allTextContents();

    // Verify the dropdown contains key expected cities
    expect(optionTexts).toContain('Buenos Aires');
    expect(optionTexts).toContain('Rome');
    expect(optionTexts).toContain('London');
    console.log('✓ Destination dropdown contains Buenos Aires, Rome, and London');
  });
});
