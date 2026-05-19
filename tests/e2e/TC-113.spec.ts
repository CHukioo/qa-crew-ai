import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-113
 * Title: [Positive] User can select a destination city from the dropdown list
 * Priority: Medium
 * Type: Positive
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 *   - The destination city dropdown is visible
 */
test.describe('TC-113: User can select a destination city from the dropdown list', () => {

  // Navigate to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('should expand the destination city dropdown and show available cities', async ({ page }) => {
    // Step 1: Click on the destination city dropdown to expand it
    // Expected: A list of destination cities is displayed, including Buenos Aires, Rome, and London
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.click();

    // Verify that the dropdown options include the expected cities
    const options = page.locator('select[name="toPort"] option');
    await expect(options).toContainText(['Buenos Aires', 'Rome', 'London']);
  });

  test('should select Buenos Aires as destination city', async ({ page }) => {
    // Step 2: Select 'Buenos Aires' from the destination city list
    // Expected: 'Buenos Aires' is selected and displayed in the dropdown field
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('Buenos Aires');
    await expect(destinationDropdown).toHaveValue('Buenos Aires');
  });

  test('should select Rome as destination city', async ({ page }) => {
    // Step 3: Repeat by selecting 'Rome'
    // Expected: 'Rome' is selected and displayed in the dropdown field
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('Rome');
    await expect(destinationDropdown).toHaveValue('Rome');
  });

  test('should select London as destination city', async ({ page }) => {
    // Step 4: Repeat by selecting 'London'
    // Expected: 'London' is selected and displayed in the dropdown field
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('London');
    await expect(destinationDropdown).toHaveValue('London');
  });
});
