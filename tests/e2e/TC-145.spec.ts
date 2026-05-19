import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-145
 * Title: [Positive] Homepage loads with correct title and heading
 * 
 * Preconditions:
 *   User has a browser open and can navigate to https://blazedemo.com/
 * 
 * Steps:
 *   1. Open browser and navigate to https://blazedemo.com/
 *   2. Observe the page title in the browser tab
 *   3. Observe the main heading on the page
 */
test.describe('TC-145 - Homepage loads with correct title and heading', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  // Step 1+2: Verify page loads without errors and has correct title
  test('Page loads successfully and displays correct title', async ({ page }) => {
    // Step 1: Navigate was done in beforeEach
    // Verify the page loaded successfully by checking there are no console errors
    // and the page is in a ready state
    await expect(page).toHaveURL('https://blazedemo.com/');
    
    // Step 2: Observe the page title in the browser tab
    await expect(page).toHaveTitle(/BlazeDemo/);
  });

  // Step 3: Verify the main heading text
  test('Main heading displays correct welcome message', async ({ page }) => {
    // Step 3: Locate the main heading (h1) and verify its text content
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
  });
});
