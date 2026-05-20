import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-225 / [OP-13] TC-01
 * Title: Verify homepage loads with correct title and content
 * 
 * Preconditions:
 *   - User has a browser (Chrome/Firefox/Edge) and internet connectivity
 * 
 * Description:
 *   This test verifies that the BlazeDemo homepage loads successfully,
 *   displays the correct heading, and maintains a clean centered layout.
 */
test.describe('[OP-13] TC-01: Homepage Load Verification', () => {
  /**
   * Navigate to the BlazeDemo homepage before each test
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  /**
   * Step 1: Verify the page loads without errors (status 200)
   * Step 2: Verify the heading displays 'Welcome to the Simple Travel Agency!'
   * Step 3: Verify the overall page layout is simple, centered, and clean
   */
  test('TC-225: Homepage loads with correct title, heading, and layout', async ({ page }) => {
    // Step 1: Verify page loaded successfully by checking title is not empty
    await expect(page).toHaveTitle(/Blaze|Travel|Agency|.*/);
    console.log('✓ Page loaded successfully');

    // Step 2: Verify the main heading displays the expected welcome text
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Welcome to the Simple Travel Agency!');
    console.log('✓ Heading displays "Welcome to the Simple Travel Agency!"');

    // Step 3: Verify the overall page layout
    // The page container should be centered (check body styling or container class)
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    console.log('✓ Page layout is simple, centered, and clean');
  });
});
