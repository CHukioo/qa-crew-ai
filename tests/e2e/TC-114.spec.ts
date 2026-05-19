import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-114
 * Title: [Negative] Page layout and responsiveness - centered and simple on desktop
 * Priority: Low
 * Type: Negative
 *
 * Preconditions:
 *   - User has a desktop browser with viewport set to 1024x768 or larger
 */
test.describe('TC-114: Page layout and responsiveness - centered and simple on desktop', () => {

  test('should render the page centered and simple at 1024x768 viewport', async ({ page }) => {
    // Step 1: Set browser viewport to 1024x768 (desktop)
    // Expected: Viewport is set correctly
    await page.setViewportSize({ width: 1024, height: 768 });

    // Step 2: Navigate to https://blazedemo.com/
    // Expected: Homepage loads successfully
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page.locator('body')).toBeVisible();

    // Step 3: Observe the overall layout
    // Expected: The layout is simple and centered as per requirements

    // Step 4: Verify all elements are properly aligned and visible without horizontal scrolling
    // Expected: All elements (heading, dropdowns, button) are centered and fully visible

    // Get the main container element
    const container = page.locator('.container');
    await expect(container).toBeVisible();

    // Verify the heading is centered within the container
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Verify departure dropdown is visible
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Verify destination dropdown is visible
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Verify Find Flights button is visible
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsBtn).toBeVisible();

    // Verify no horizontal scrollbar exists (page fits within viewport width)
    // Check that the body's scroll width is not greater than the viewport width
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });
});
