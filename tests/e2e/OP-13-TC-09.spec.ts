import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-09
 * Title: Verify page layout and responsiveness on desktop viewport
 * Type: Negative
 * Priority: Low
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/ with desktop viewport (1024x768 or larger).
 * 
 * Steps:
 *   1. Open the page in a desktop browser (1280x720 default viewport).
 *      -> Layout is clean, centered, elements properly aligned.
 *   2. Resize to 1024x768.
 *      -> Elements remain visible and usable without horizontal scrolling.
 */
test.describe('OP-13: Page Layout and Responsiveness', () => {
  test('OP-13-TC-09: Verify page layout and responsiveness on desktop viewport', async ({ page }) => {
    // Step 1: Set a standard desktop viewport and navigate to the homepage
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('https://blazedemo.com/');

    // Verify all core elements are visible and properly aligned
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const navBar = page.locator('.navbar');
    await expect(navBar).toBeVisible();

    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    const findFlightsBtn = page.locator('input[type="submit"]');
    await expect(findFlightsBtn).toBeVisible();

    // Step 2: Resize the viewport to 1024x768
    await page.setViewportSize({ width: 1024, height: 768 });

    // Verify all elements remain visible and there is no horizontal overflow
    // Check that key elements are still visible
    await expect(heading).toBeVisible();
    await expect(navBar).toBeVisible();
    await expect(departureDropdown).toBeVisible();
    await expect(destinationDropdown).toBeVisible();
    await expect(findFlightsBtn).toBeVisible();

    // Verify no horizontal scrolling by checking the page body scroll width
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 1024;
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth * 1.05); // Allow 5% tolerance
  });
});
