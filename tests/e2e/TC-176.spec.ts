import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-176 (TC-05)
 * Title: Verify navigation bar contains Travel The World logo and home link
 * Precondition: Open browser and navigate to https://blazedemo.com/
 */
test.describe('Navigation Bar Verification - TC-176', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('should display Travel The World logo and functional home link in navbar', async ({ page }) => {
    // Step 1: Verify the navigation bar is visible at the top of the page
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();

    // Step 2: Check the leftmost element displays the website logo/title 'Travel The World'
    const brandLogo = navbar.locator('.navbar-brand');
    await expect(brandLogo).toContainText('Travel The World');

    // Step 3: Verify a clickable 'home' link is present in the navigation bar
    const homeLink = navbar.locator('a:has-text("Home")');
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toBeEnabled();

    // Step 4: Click the 'home' link and verify it refreshes or stays on the homepage
    await homeLink.click();
    await expect(page).toHaveURL(BASE_URL);
  });
});
