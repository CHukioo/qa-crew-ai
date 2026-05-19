import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-222
 * Title: [Positive] TC-03: Verify destination city dropdown is visible and user can select a city
 * Priority: high
 * 
 * Preconditions:
 *   - Homepage is loaded successfully.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect homepage loads
 *   2. Locate the destination city dropdown - expect it is visible
 *   3. Click the destination city dropdown to expand options - expect dropdown expands
 *   4. Select 'London' from the destination city dropdown - expect 'London' is selected
 */
test.describe('TC-222: Destination City Dropdown Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should allow user to select a destination city from the dropdown', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('select[name="toPort"]', { timeout: 10000 });
    });

    // Step 2: Locate the destination city dropdown and verify visibility
    await test.step('Locate the destination city dropdown', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await expect(destinationDropdown).toBeVisible();
    });

    // Step 3: Click the destination city dropdown to expand options
    await test.step('Click the destination city dropdown to expand options', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.click();
      // Verify that options are available in the dropdown
      const options = destinationDropdown.locator('option');
      const optionCount = await options.count();
      expect(optionCount).toBeGreaterThan(0);
    });

    // Step 4: Select 'London' from the destination city dropdown
    await test.step("Select 'London' from the destination city dropdown", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.selectOption('London');
      // Verify that 'London' is now the selected value
      await expect(destinationDropdown).toHaveValue('London');
    });
  });
});
