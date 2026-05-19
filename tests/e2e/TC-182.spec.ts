import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-182 (TC-07)
 * Title: Verify Find Flights button is present and clickable
 * Precondition: Open browser and navigate to https://blazedemo.com/
 */
test.describe('Find Flights Button Verification - TC-182', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('should have visible, enabled, and clickable Find Flights button', async ({ page }) => {
    // Step 1: Locate the 'Find Flights' button and verify it is visible
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsBtn).toBeVisible();

    // Step 2: Verify the button is enabled/interactive and not disabled
    await expect(findFlightsBtn).toBeEnabled();

    // Step 3: Click the button and verify it submits the form / navigates
    await findFlightsBtn.click();
    // The button should trigger navigation to the reserve page
    await expect(page).toHaveURL(/reserve\.php/);
  });
});
