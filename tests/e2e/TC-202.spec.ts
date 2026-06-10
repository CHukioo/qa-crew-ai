import { test, expect } from '@playwright/test';

/**
 * TC-202: [POS] TC-02: Verify departure and destination dropdowns are visible and populated
 *
 * Preconditions:
 * 1. Browser is launched.
 * 2. Navigate to https://blazedemo.com/
 *
 * Steps:
 * 1. Locate the departure city dropdown — must be visible.
 * 2. Click to expand and verify options include Paris, Philadelphia, Boston.
 * 3. Locate the destination city dropdown — must be visible.
 * 4. Click to expand and verify options include Buenos Aires, Rome, London.
 */
test.describe('OP-13 — Dropdown Visibility and Population', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('https://blazedemo.com/');
  });

  test('TC-202: Verify departure and destination dropdowns are visible and populated', async ({ page }) => {
    // Step 1: Locate the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Step 2: Click to expand and verify options
    const departureOptions = departureDropdown.locator('option');
    await expect(departureOptions).toHaveCount(5); // 5 cities total (including the default/empty option)

    // Verify specific expected cities are present in the departure dropdown
    const departureTexts = await departureOptions.allTextContents();
    const departureOptionsList = departureTexts.map((t) => t.trim());
    expect(departureOptionsList).toContain('Paris');
    expect(departureOptionsList).toContain('Philadelphia');
    expect(departureOptionsList).toContain('Boston');

    // Step 3: Locate the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Step 4: Click to expand and verify options
    const destinationOptions = destinationDropdown.locator('option');
    await expect(destinationOptions).toHaveCount(5); // 5 cities total

    // Verify specific expected cities are present in the destination dropdown
    const destinationTexts = await destinationOptions.allTextContents();
    const destinationOptionsList = destinationTexts.map((t) => t.trim());
    expect(destinationOptionsList).toContain('Buenos Aires');
    expect(destinationOptionsList).toContain('Rome');
    expect(destinationOptionsList).toContain('London');
  });
});
