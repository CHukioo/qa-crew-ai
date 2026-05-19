import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-122
 * [OP-13] TC-02: Verify departure and destination dropdowns are visible on the page
 * 
 * Preconditions:
 *   1. User is on the homepage at https://blazedemo.com/
 * 
 * Steps:
 *   1. Locate the departure city dropdown.
 *   2. Locate the destination city dropdown.
 *   3. Click on the departure city dropdown to expand it.
 *   4. Click on the destination city dropdown to expand it.
 * 
 * Expected:
 *   - Departure dropdown is visible and interactive.
 *   - Destination dropdown is visible and interactive.
 *   - Departure dropdown contains Paris, Philadelphia, Boston.
 *   - Destination dropdown contains Buenos Aires, Rome, London.
 */
test.describe('OP-13 - Dropdown Visibility', () => {
  test('TC-122: Verify departure and destination dropdowns are visible on the page', async ({ page }) => {
    // Precondition: Navigate to homepage
    await page.goto('https://blazedemo.com/');

    // Step 1: Locate the departure city dropdown (select element)
    await test.step('Locate the departure city dropdown', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await expect(departureDropdown).toBeVisible();
      await expect(departureDropdown).toBeEnabled();
    });

    // Step 2: Locate the destination city dropdown (select element)
    await test.step('Locate the destination city dropdown', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await expect(destinationDropdown).toBeVisible();
      await expect(destinationDropdown).toBeEnabled();
    });

    // Step 3: Click on the departure city dropdown to expand it
    await test.step('Click departure dropdown and verify options', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.click();
      // Get all option texts from the dropdown
      const options = await departureDropdown.locator('option').allTextContents();
      // Verify expected cities are present
      expect(options).toContain('Paris');
      expect(options).toContain('Philadelphia');
      expect(options).toContain('Boston');
    });

    // Step 4: Click on the destination city dropdown to expand it
    await test.step('Click destination dropdown and verify options', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.click();
      // Get all option texts from the dropdown
      const options = await destinationDropdown.locator('option').allTextContents();
      // Verify expected cities are present
      expect(options).toContain('Buenos Aires');
      expect(options).toContain('Rome');
      expect(options).toContain('London');
    });
  });
});
