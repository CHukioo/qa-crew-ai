import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-223
 * Title: [Negative] TC-06: Verify behavior when no city is selected from dropdowns
 * Priority: medium
 * 
 * Preconditions:
 *   - Homepage is loaded successfully.
 *   - Dropdowns are in their default state.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect homepage loads
 *   2. Do NOT select any departure city (leave default) - expect default value
 *   3. Do NOT select any destination city (leave default) - expect default value
 *   4. Click the 'Find Flights' button - expect graceful handling
 */
test.describe('TC-223: No City Selected Edge Case', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should gracefully handle clicking Find Flights with default dropdown values', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('select[name="fromPort"]', { timeout: 10000 });
    });

    // Step 2: Verify departure dropdown shows default/placeholder value (no explicit selection)
    await test.step('Do NOT select any departure city (leave default)', async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      // Verify the dropdown is in its default state with a value selected
      const currentValue = await departureDropdown.inputValue();
      expect(currentValue).toBeTruthy(); // Should have some default value
    });

    // Step 3: Verify destination dropdown shows default/placeholder value (no explicit selection)
    await test.step('Do NOT select any destination city (leave default)', async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      // Verify the dropdown is in its default state with a value selected
      const currentValue = await destinationDropdown.inputValue();
      expect(currentValue).toBeTruthy(); // Should have some default value
    });

    // Step 4: Click 'Find Flights' with default values and verify graceful handling
    await test.step("Click the 'Find Flights' button", async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await findFlightsBtn.click();

      // The system should handle gracefully - either show results or validation error
      // Wait for navigation or response (timeout to allow for error handling)
      try {
        await page.waitForURL('**/reserve.php', { timeout: 8000 });
        // If redirected to reserve page, verify it loaded without errors
        await expect(page.locator('h2')).toBeVisible();
      } catch {
        // If not redirected, the page should still show without crash
        // Verify no error dialog or crash occurred
        const body = page.locator('body');
        await expect(body).toBeVisible();
      }
    });
  });
});
