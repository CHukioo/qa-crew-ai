import { test, expect } from '@playwright/test';

test.describe('Homepage loads with correct title and navigation', () => {
  // Runs before each test in this describe block
  test.beforeEach(async ({ page }) => {
    // Open the application URL in a desktop viewport
    await page.goto('http://localhost:3000'); // adjust URL as needed
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should display the correct page title', async ({ page }) => {
    // Verify the browser title matches the expected value
    await expect(page).toHaveTitle('Welcome to the Simple Travel Agency!');
  });

  test('should show header and navigation elements', async ({ page }) => {
    // Observe the page header
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check the navigation bar for the logo/title "Travel The World"
    const logo = header.locator('nav >> text=Travel The World');
    await expect(logo).toBeVisible();

    // Verify that a "home" link is present in the navigation bar
    const homeLink = header.locator('nav >> role=link[name="home"]');
    await expect(homeLink).toBeVisible();

    // Optional: ensure the home link is functional (navigates to the root)
    await homeLink.click();
    await expect(page).toHaveURL(/.*\/$/);
  });
});