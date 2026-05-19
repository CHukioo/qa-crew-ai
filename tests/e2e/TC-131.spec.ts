import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-131
 * Title: [OP-13] Verify navigation bar contains "Travel The World" logo and "home" link
 * Type: Positive
 * Priority: Medium
 *
 * Preconditions: None required. Application URL is https://blazedemo.com/
 */
test.describe('OP-13 - Navigation Bar Verification', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-131: Verify navigation bar contains logo text and home link', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads successfully
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Look at the top navigation bar
    await test.step('Look at the top navigation bar', async () => {
      const navbar = page.locator('.navbar');
      // Assert: Navigation bar is visible
      await expect(navbar).toBeVisible();
    });

    // Step 3: Verify the leftmost element in the navbar
    await test.step("Verify the leftmost element in the navbar", async () => {
      // The brand/logo is typically inside a .navbar-brand element
      const brandElement = page.locator('.navbar-brand');
      // Assert: Navbar displays "Travel The World"
      await expect(brandElement).toBeVisible();
      await expect(brandElement).toHaveText('Travel The World');
    });

    // Step 4: Verify the link labelled 'home' exists in the navbar
    await test.step("Verify the link labelled 'home' exists in the navbar", async () => {
      // Look for a link with text 'home' inside the navbar
      const homeLink = page.locator('.navbar a', { hasText: 'Home' });
      // Assert: A clickable 'home' link is present in the navigation bar
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href');
    });
  });
});
