import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-218
 * Title: [Negative] TC-09: Verify dropdown options contain expected cities
 * Priority: medium
 * 
 * Preconditions:
 *   - Homepage is loaded successfully.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect homepage loads
 *   2. Click the departure city dropdown to expand options - expect dropdown expands
 *   3. Verify the dropdown lists 'Paris', 'Philadelphia', and 'Boston' as options
 *   4. Click the destination city dropdown to expand options - expect dropdown expands
 *   5. Verify the dropdown lists 'Buenos Aires', 'Rome', and 'London' as options
 */
test.describe('TC-218: Dropdown City Options Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should display expected cities in departure and destination dropdowns', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('select[name="fromPort"]', { timeout: 10000 });
    });

    // Step 2: Click the departure city dropdown to expand options
    await test.step('Click the departure city dropdown to expand options', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      await departureDropdown.click();
      // Verify the dropdown has options
      const options = departureDropdown.locator('option');
      await expect(options.first()).toBeVisible();
    });

    // Step 3: Verify the dropdown lists 'Paris', 'Philadelphia', and 'Boston' as options
    await test.step("Verify the dropdown lists 'Paris', 'Philadelphia', and 'Boston' as options", async () => {
      const departureOptions = await page.locator('select[name="fromPort"] option').allTextContents();
      const trimmedOptions = departureOptions.map(opt => opt.trim());
      
      expect(trimmedOptions).toContain('Paris');
      expect(trimmedOptions).toContain('Philadelphia');
      expect(trimmedOptions).toContain('Boston');
    });

    // Step 4: Click the destination city dropdown to expand options
    await test.step('Click the destination city dropdown to expand options', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      await destinationDropdown.click();
      // Verify the dropdown has options
      const options = destinationDropdown.locator('option');
      await expect(options.first()).toBeVisible();
    });

    // Step 5: Verify the dropdown lists 'Buenos Aires', 'Rome', and 'London' as options
    await test.step("Verify the dropdown lists 'Buenos Aires', 'Rome', and 'London' as options", async () => {
      const destinationOptions = await page.locator('select[name="toPort"] option').allTextContents();
      const trimmedOptions = destinationOptions.map(opt => opt.trim());
      
      expect(trimmedOptions).toContain('Buenos Aires');
      expect(trimmedOptions).toContain('Rome');
      expect(trimmedOptions).toContain('London');
    });
  });
});
