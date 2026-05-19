import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-108
 * Title: [Positive] User can select a departure city from the dropdown list
 * Priority: Medium
 * Type: Positive
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 *   - The departure city dropdown is visible
 */
test.describe('TC-108: User can select a departure city from the dropdown list', () => {

  // Navigate to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('should expand the departure city dropdown and show available cities', async ({ page }) => {
    // Step 1: Click on the departure city dropdown to expand it
    // Expected: A list of departure cities is displayed, including Paris, Philadelphia, and Boston
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.click();

    // Verify that the dropdown options include the expected cities
    const options = page.locator('select[name="fromPort"] option');
    await expect(options).toContainText(['Paris', 'Philadelphia', 'Boston']);
  });

  test('should select Paris as departure city', async ({ page }) => {
    // Step 2: Select 'Paris' from the departure city list
    // Expected: 'Paris' is selected and displayed in the dropdown field
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');
  });

  test('should select Philadelphia as departure city', async ({ page }) => {
    // Step 3: Repeat by selecting 'Philadelphia'
    // Expected: 'Philadelphia' is selected and displayed in the dropdown field
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Philadelphia');
    await expect(departureDropdown).toHaveValue('Philadelphia');
  });

  test('should select Boston as departure city', async ({ page }) => {
    // Step 4: Repeat by selecting 'Boston'
    // Expected: 'Boston' is selected and displayed in the dropdown field
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Boston');
    await expect(departureDropdown).toHaveValue('Boston');
  });
});
