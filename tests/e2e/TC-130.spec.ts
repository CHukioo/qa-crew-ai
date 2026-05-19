import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-130
 * Title: [OP-13] Verify both departure and destination dropdowns are visible on the page
 * Type: Positive
 * Priority: High
 *
 * Preconditions: None required. Application URL is https://blazedemo.com/
 */
test.describe('OP-13 - Dropdown Visibility and Options', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test('TC-130: Verify departure and destination dropdowns have correct options', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await test.step('Navigate to https://blazedemo.com/', async () => {
      await page.goto(BASE_URL);
      // Assert: Page loads successfully
      await expect(page).toHaveURL(BASE_URL);
    });

    // Step 2: Locate the departure city dropdown and verify its options
    await test.step("Locate the departure city dropdown (select[name='fromPort'])", async () => {
      const departureDropdown = page.locator('select[name="fromPort"]');
      // Assert: Departure city dropdown is visible
      await expect(departureDropdown).toBeVisible();

      // Get all option texts from the dropdown
      const departureOptions = await departureDropdown.locator('option').allTextContents();
      const trimmedOptions = departureOptions.map(opt => opt.trim()).filter(opt => opt !== '');

      // Assert: Contains expected cities: Paris, Philadelphia, Boston
      expect(trimmedOptions).toContain('Paris');
      expect(trimmedOptions).toContain('Philadelphia');
      expect(trimmedOptions).toContain('Boston');
    });

    // Step 3: Locate the destination city dropdown and verify its options
    await test.step("Locate the destination city dropdown (select[name='toPort'])", async () => {
      const destinationDropdown = page.locator('select[name="toPort"]');
      // Assert: Destination city dropdown is visible
      await expect(destinationDropdown).toBeVisible();

      // Get all option texts from the dropdown
      const destinationOptions = await destinationDropdown.locator('option').allTextContents();
      const trimmedOptions = destinationOptions.map(opt => opt.trim()).filter(opt => opt !== '');

      // Assert: Contains expected cities: Buenos Aires, Rome, London
      expect(trimmedOptions).toContain('Buenos Aires');
      expect(trimmedOptions).toContain('Rome');
      expect(trimmedOptions).toContain('London');
    });
  });
});
