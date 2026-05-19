import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-179 (TC-02)
 * Title: Verify departure and destination city dropdowns are visible and populated
 * Precondition: Open browser and navigate to https://blazedemo.com/
 */
test.describe('Dropdown Visibility and Population - TC-179', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('should show departure and destination dropdowns with expected cities', async ({ page }) => {
    // Step 1: Locate the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Step 2: Click departure dropdown and verify expected cities are present
    await departureDropdown.click();
    const departureOptions = departureDropdown.locator('option');
    const departureTexts = await departureOptions.allTextContents();
    expect(departureTexts.some(t => t.includes('Paris'))).toBeTruthy();
    expect(departureTexts.some(t => t.includes('Philadelphia'))).toBeTruthy();
    expect(departureTexts.some(t => t.includes('Boston'))).toBeTruthy();

    // Step 3: Locate the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Step 4: Click destination dropdown and verify expected cities are present
    await destinationDropdown.click();
    const destinationOptions = destinationDropdown.locator('option');
    const destinationTexts = await destinationOptions.allTextContents();
    expect(destinationTexts.some(t => t.includes('Buenos Aires'))).toBeTruthy();
    expect(destinationTexts.some(t => t.includes('Rome'))).toBeTruthy();
    expect(destinationTexts.some(t => t.includes('London'))).toBeTruthy();
  });
});
