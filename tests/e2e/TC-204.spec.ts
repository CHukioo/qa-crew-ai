import { test, expect } from '@playwright/test';

/**
 * TC-204: [TC-1] Verify Homepage Loads With Correct Title and Structure
 * 
 * Preconditions: Browser is open and connected to the internet
 * Priority: High
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Verify the page title heading displays 'Welcome to the Simple Travel Agency!'
 * 3. Verify the page layout is centered and clean
 */
test.describe('TC-204: Homepage Load Verification', () => {
  test('should load homepage with correct title and structure', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully with no errors
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Verify the page title heading displays 'Welcome to the Simple Travel Agency!'
    // Expected: The heading 'Welcome to the Simple Travel Agency!' is visible on the page
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');

    // Step 3: Verify the page layout is centered and clean
    // Expected: Content is centered on the page with a clean layout
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    // Verify the overall page structure - the main div should contain the heading
    await expect(container.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');
  });
});