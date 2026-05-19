import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-224
 * Title: [Negative] TC-10: Verify page displays correctly at different viewport sizes (desktop responsiveness)
 * Priority: low
 * 
 * Preconditions:
 *   - Browser is open with resizable window functionality.
 * 
 * Steps:
 *   1. Open the page at 1280x800 viewport - expect layout is centered and aligned
 *   2. Verify all elements are visible: heading, both dropdowns, and Find Flights button
 *   3. Resize the browser to 1024x768 - expect graceful adjustment
 *   4. Verify layout remains readable with no horizontal scrollbars
 */
test.describe('TC-224: Desktop Responsiveness Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should display correctly at 1280x800 viewport', async ({ page }) => {
    // Set viewport to 1280x800 for this test
    await page.setViewportSize({ width: 1280, height: 800 });

    // Step 1: Open page at desktop viewport
    await test.step('Open the page at https://blazedemo.com/ in a desktop viewport (1280x800)', async () => {
      await page.goto(BASE_URL);
      await page.waitForSelector('h1', { timeout: 10000 });
    });

    // Step 2: Verify all elements are visible
    await test.step("Verify all elements are visible: heading, both dropdowns, and 'Find Flights' button", async () => {
      // Verify heading
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');

      // Verify departure dropdown
      const departureDropdown = page.locator('select[name="fromPort"]');
      await expect(departureDropdown).toBeVisible();

      // Verify destination dropdown
      const destinationDropdown = page.locator('select[name="toPort"]');
      await expect(destinationDropdown).toBeVisible();

      // Verify Find Flights button
      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await expect(findFlightsBtn).toBeVisible();
    });

    // Step 3: Resize to 1024x768
    await test.step('Resize the browser to 1024x768', async () => {
      await page.setViewportSize({ width: 1024, height: 768 });
      // Give the page a moment to re-render
      await page.waitForTimeout(500);
    });

    // Step 4: Verify layout remains readable with no horizontal scrollbars
    await test.step('Verify the layout remains readable with no horizontal scrollbars appearing', async () => {
      // Check that all critical elements are still visible at the new viewport
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();

      const departureDropdown = page.locator('select[name="fromPort"]');
      await expect(departureDropdown).toBeVisible();

      const destinationDropdown = page.locator('select[name="toPort"]');
      await expect(destinationDropdown).toBeVisible();

      const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
      await expect(findFlightsBtn).toBeVisible();

      // Check that no horizontal scrollbar is present by comparing viewport width to page content width
      const viewportSize = page.viewportSize();
      const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(pageWidth).toBeLessThanOrEqual(viewportSize!.width + 1); // Allow 1px tolerance
    });
  });
});
