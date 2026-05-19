import { test, expect } from '@playwright/test';

/**
 * Test Case: OP-13-TC-08
 * Title: Verify behavior when no city is selected in either dropdown (default values)
 * Type: Negative
 * Priority: Medium
 * 
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/ with default dropdown values.
 * 
 * Steps:
 *   1. Without changing any dropdown selections, click the 'Find Flights' button.
 *      -> The system either shows validation or proceeds with defaults. No crash.
 */
test.describe('OP-13: Default Dropdown Values', () => {
  test('OP-13-TC-08: Verify behavior when using default dropdown values', async ({ page }) => {
    // Precondition: Navigate to the homepage (default values are pre-selected)
    await page.goto('https://blazedemo.com/');

    // Step 1: Without changing any selections, click the 'Find Flights' button
    await page.click('input[type="submit"][value="Find Flights"]');

    // Verify the application handles this gracefully
    // The dropdowns have sensible defaults, so the app should proceed to results
    // or show a validation message
    const currentUrl = page.url();
    
    // Check if redirected to results page (default values were accepted)
    if (currentUrl.includes('reserve.php')) {
      // If redirected, verify the flights table is visible
      await expect(page.locator('table')).toBeVisible();
    } else {
      // If staying on homepage, ensure no error/crash occurred
      await expect(page.locator('body')).toBeVisible();
      // The page should still have the main heading
      await expect(page.locator('h1')).toContainText('Welcome to the Simple Travel Agency!');
    }
  });
});
