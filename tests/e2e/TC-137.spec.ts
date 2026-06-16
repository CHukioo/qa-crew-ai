// =============================================================================
// Test Case: TC-137
// Title:    [OP-13] TC-01: Verify homepage loads successfully with correct title
// Type:     positive
// Priority: high
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Precondition: Browser is open and connected to the internet.
// No prior session data/cache that might interfere.
test.describe('[OP-13] TC-01: Verify homepage loads successfully with correct title', () => {

  // Navigate to the homepage before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-137: Homepage loads without errors and displays correct heading', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: The page loads successfully without any errors (no 404, 500, or connection errors).
    // The beforeEach hook already navigated; verify no error occurred by checking the URL and page state.
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Verify the page loaded successfully by checking that the body is present and no error elements exist
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Step 2: Observe the page title/heading displayed on the homepage.
    // Expected: A heading containing text 'Welcome to the Simple Travel Agency!' is visible on the page.
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Welcome to the Simple Travel Agency!');

    // Additional verification: Ensure the page has no 404 or error indicators
    const pageTitle = await page.title();
    expect(pageTitle).not.toContain('404');
    expect(pageTitle).not.toContain('Error');
  });
});
