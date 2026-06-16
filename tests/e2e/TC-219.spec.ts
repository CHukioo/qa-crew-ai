import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-219
 * Title: [Positive] TC-02: Verify departure city dropdown is visible and user can select a city
 * Priority: high
 * 
 * Preconditions:
 *   - Homepage is loaded successfully.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect homepage loads
 *   2. Locate the departure city dropdown - expect it is visible
 *   3. Click the departure city dropdown to expand options - expect dropdown expands
 *   4. Select 'Paris' from the departure city dropdown - expect 'Paris' is selected
 */
test.describe('TC-219: Departure City Dropdown Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should allow user to select a departure city from the dropdown', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('select[name="fromPort"]', { timeout: 10000 });
    });

    // Step 2: Locate the departure city dropdown and verify visibility
    await test.step('Locate the departure city dropdown', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await expect(departureDropdown).toBeVisible();
    });

    // Step 3: Click the departure city dropdown to expand options
    await test.step('Click the departure city dropdown to expand options', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.click();
      // Verify that options are available in the dropdown
      const options = departureDropdown.locator('option');
      const optionCount = await options.count();
      expect(optionCount).toBeGreaterThan(0);
    });

    // Step 4: Select 'Paris' from the departure city dropdown
    await test.step("Select 'Paris' from the departure city dropdown", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.selectOption('Paris');
      // Verify that 'Paris' is now the selected value
      await expect(departureDropdown).toHaveValue('Paris');
    });
  });
});
