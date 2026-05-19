import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-220
 * Title: [Positive] TC-04: Verify 'Find Flights' button is visible and clickable
 * Priority: high
 * 
 * Preconditions:
 *   - Homepage is loaded successfully.
 * 
 * Steps:
 *   1. Navigate to https://blazedemo.com/ - expect homepage loads
 *   2. Locate the 'Find Flights' button on the page - expect it is visible
 *   3. Verify the button text reads 'Find Flights'
 *   4. Verify the button is not disabled - expect it is clickable/enabled
 */
test.describe('TC-220: Find Flights Button Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should display a visible and clickable Find Flights button', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('input[type="submit"][value="Find Flights"]', { timeout: 10000 });
    });

    // Step 2: Locate the 'Find Flights' button and verify visibility
    await test.step("Locate the 'Find Flights' button on the page", async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await expect(findFlightsBtn).toBeVisible();
    });

    // Step 3: Verify the button text reads 'Find Flights'
    await test.step("Verify the button text reads 'Find Flights'", async () => {
      const findFlightsBtn = page.locator('input[type="submit"]');
      await expect(findFlightsBtn).toHaveValue('Find Flights');
    });

    // Step 4: Verify the button is not disabled
    await test.step('Verify the button is not disabled', async () => {
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await expect(findFlightsBtn).toBeEnabled();
    });
  });
});
