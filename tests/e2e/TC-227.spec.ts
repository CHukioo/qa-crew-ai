import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-227 / [OP-13] TC-03
 * Title: Verify departure city dropdown is visible and populated with cities
 * 
 * Preconditions:
 *   - User is on the BlazeDemo homepage (https://blazedemo.com/)
 * 
 * Description:
 *   This test verifies that the departure city dropdown is visible on the
 *   homepage, can be clicked to expand, and contains expected cities such
 *   as 'Paris', 'Philadelphia', and 'Boston'.
 */
test.describe('[OP-13] TC-03: Departure City Dropdown Verification', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify page loads
   * Step 2: Locate and verify departure dropdown is visible
   * Step 3: Click dropdown and verify it contains expected cities
   */
  test('TC-227: Departure city dropdown is visible and populated', async ({ page }) => {
    // Step 1: Confirm the page has loaded
    await expect(page).toHaveURL('https://blazedemo.com/');
    console.log('✓ Page loaded successfully');

    // Step 2: Locate the departure city dropdown (select element with name 'fromPort')
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();
    console.log('✓ Departure city dropdown is visible on the page');

    // Step 3: Click to expand and verify it contains expected cities
    // Get all option texts from the dropdown
    const options = departureDropdown.locator('option');
    const optionTexts = await options.allTextContents();

    // Verify the dropdown contains key expected cities
    expect(optionTexts).toContain('Paris');
    expect(optionTexts).toContain('Philadelphia');
    expect(optionTexts).toContain('Boston');
    console.log('✓ Departure dropdown contains Paris, Philadelphia, and Boston');
  });
});
