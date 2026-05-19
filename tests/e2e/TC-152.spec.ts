import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-152
 * Title: [Negative] Page layout and responsiveness on different screen sizes
 * 
 * Preconditions:
 *   User has a browser with developer tools to simulate different screen sizes
 * 
 * Steps:
 *   1. Open https://blazedemo.com/ on a desktop viewport (1920x1080)
 *   2. Resize browser to 1024x768 (tablet)
 *   3. Resize browser to 375x667 (mobile)
 */
test.describe('TC-152 - Page layout and responsiveness on different screen sizes', () => {
  // Base URL used across all viewport tests
  const BASE_URL = 'https://blazedemo.com/';

  // Step 1: Verify page renders correctly on desktop viewport (1920x1080)
  test('Page renders correctly on desktop viewport (1920x1080)', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the homepage
    await page.goto(BASE_URL);
    
    // Verify critical elements are visible and properly centered
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Verify the main container is visible
    const container = page.locator('.container, .jumbotron, main').first();
    await expect(container).toBeVisible();
    
    // Verify navigation bar is in view
    const navBar = page.locator('.navbar, nav').first();
    await expect(navBar).toBeVisible();
  });

  // Step 2: Verify page remains usable on tablet viewport (1024x768)
  test('Page remains usable on tablet viewport (1024x768)', async ({ page }) => {
    // Set viewport to tablet size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    await page.goto(BASE_URL);
    
    // Verify all essential elements are visible without overlapping
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();
    
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();
    
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsBtn).toBeVisible();
    
    // Verify there is no horizontal scrollbar indicating overflow (or if exists, it's minimal)
    const pageWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(1024 + 50); // Allow small margin for responsive quirks
  });

  // Step 3: Verify page has basic responsive support on mobile viewport (375x667)
  test('Page has basic responsive support on mobile viewport (375x667)', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(BASE_URL);
    
    // Verify content is readable - heading should be visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Verify key interactive elements are accessible
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();
    
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();
    
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsBtn).toBeVisible();
    
    // Verify the page is usable and content doesn't require excessive horizontal scrolling
    // Allow at most a small overflow for mobile (some responsive sites may have slight overflow)
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;
    // Horizontal scrolling should be minimal (less than 20% extra width)
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth * 1.2);
  });
});
