import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-147
 * Title: [Positive] Find Flights button is visible and clickable
 * 
 * Preconditions:
 *   User has navigated to https://blazedemo.com/
 * 
 * Steps:
 *   1. Scroll to locate the 'Find Flights' button
 *   2. Hover over the 'Find Flights' button
 *   3. Click the 'Find Flights' button without selecting any cities
 */
test.describe('TC-147 - Find Flights button is visible and clickable', () => {
  // Precondition: Navigate to the BlazeDemo homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  // Step 1: Verify the Find Flights button is visible
  test('Find Flights button is visible on the page', async ({ page }) => {
    // Locate the Find Flights button using its value attribute (input[type="submit"])
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    
    // Scroll to locate the button (Playwright auto-scrolls into view)
    await findFlightsBtn.scrollIntoViewIfNeeded();
    
    // Assert the button is visible
    await expect(findFlightsBtn).toBeVisible();
  });

  // Step 2: Verify the button is interactive by hovering
  test('Find Flights button is interactive on hover', async ({ page }) => {
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    
    // Hover over the button
    await findFlightsBtn.hover();
    
    // Verify the button is still visible and enabled after hover
    await expect(findFlightsBtn).toBeVisible();
    await expect(findFlightsBtn).toBeEnabled();
  });

  // Step 3: Click the button with default values and verify redirect
  test('Clicking Find Flights button with default values redirects to results page', async ({ page }) => {
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    
    // Click the Find Flights button without changing any dropdown selections
    await findFlightsBtn.click();
    
    // Verify user is redirected to the flight results page
    // The results page URL typically contains '/flights' or the page path changes
    await expect(page).toHaveURL(/\/flights/);
  });
});
