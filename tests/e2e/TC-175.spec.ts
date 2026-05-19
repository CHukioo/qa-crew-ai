import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-175 (TC-01)
 * Title: Verify homepage loads successfully with correct title
 * Precondition: Open a web browser, clear cache and cookies
 */
test.describe('Homepage Loading - TC-175', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('should load homepage with correct title', async ({ page }) => {
    // Step 1: Navigate to the homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    // Expect: The page loads without errors - verify by URL
    await expect(page).toHaveURL(BASE_URL);

    // Step 2: Verify the page heading/title text
    const heading = page.locator('h1');
    await expect(heading).toContainText('Welcome to the Simple Travel Agency!');
  });
});
