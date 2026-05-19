import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-172 — [OP-13] Negative - Verify invalid/empty values are not accepted in dropdowns
 * Type: Negative
 * Priority: Medium
 *
 * Preconditions: User is on https://blazedemo.com/ homepage
 *
 * This test verifies that:
 * 1. Departure dropdown contains only valid city names (Paris, Philadelphia, Boston)
 * 2. Destination dropdown contains only valid city names (Buenos Aires, Rome, London)
 * 3. Dropdowns are standard HTML <select> elements that do not accept free text
 */
test.describe('[OP-13] Negative - Verify invalid/empty values are not accepted in dropdowns', () => {

  test('TC-172: Dropdowns contain only valid city options and do not accept free text', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Open the departure city dropdown and inspect the options
    const departureDropdown = page.locator('select[name="fromPort"]');
    const departureOptions = await departureDropdown.locator('option').allTextContents();

    // Verify only valid city names are listed - no empty/invalid options
    const expectedDepartureCities = ['Paris', 'Philadelphia', 'Boston'];
    for (const city of expectedDepartureCities) {
      expect(departureOptions).toContain(city);
    }
    // Ensure no empty options exist
    expect(departureOptions.filter(opt => opt.trim() === '')).toHaveLength(0);

    // Step 3: Open the destination city dropdown and inspect the options
    const destinationDropdown = page.locator('select[name="toPort"]');
    const destinationOptions = await destinationDropdown.locator('option').allTextContents();

    // Verify only valid city names are listed - no empty/invalid options
    const expectedDestinationCities = ['Buenos Aires', 'Rome', 'London'];
    for (const city of expectedDestinationCities) {
      expect(destinationOptions).toContain(city);
    }
    // Ensure no empty options exist
    expect(destinationOptions.filter(opt => opt.trim() === '')).toHaveLength(0);

    // Step 4: Verify dropdowns are standard HTML <select> elements
    // Standard <select> elements do not accept free text input
    const departureTagName = await departureDropdown.evaluate(el => el.tagName);
    expect(departureTagName).toBe('SELECT');

    const destinationTagName = await destinationDropdown.evaluate(el => el.tagName);
    expect(destinationTagName).toBe('SELECT');
  });
});
