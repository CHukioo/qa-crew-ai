import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-167 — [OP-13] Navigation bar displays Travel The World and home link
 * Type: Positive
 * Priority: Medium
 *
 * Preconditions: User is on https://blazedemo.com/ homepage
 *
 * This test verifies the navigation bar contains:
 * 1. The website title 'Travel The World'
 * 2. A clickable 'home' link
 * 3. Clicking 'home' keeps user on the homepage
 */
test.describe('[OP-13] Navigation bar displays Travel The World and home link', () => {

  test('TC-167: Navigation bar contains Travel The World title and home link', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Locate the navigation bar at the top of the page
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();

    // Step 3: Check the navigation bar for the website logo/title 'Travel The World'
    const brandLink = navbar.locator('.navbar-brand');
    await expect(brandLink).toBeVisible();
    await expect(brandLink).toHaveText('Travel The World');

    // Step 4: Find the 'home' link in the navigation bar
    const homeLink = navbar.locator('a:has-text("home")');
    await expect(homeLink).toBeVisible();

    // Step 5: Click on the 'home' link
    await homeLink.click();

    // Verify clicking 'home' keeps user on the homepage or refreshes the page
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Verify the homepage should still be visible with the heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the Simple Travel Agency!');
  });
});
