import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-166 — [OP-13] Negative - Click Find Flights with no cities selected
 * Type: Negative
 * Priority: Medium
 *
 * Preconditions: User is on https://blazedemo.com/ homepage with default dropdown selections
 *
 * This test verifies the behavior when clicking 'Find Flights' without explicitly selecting
 * any departure or destination city (leaving default selections).
 * Documents actual behavior: the application uses default dropdown values and proceeds.
 */
test.describe('[OP-13] Negative - Click Find Flights with no cities selected', () => {

  test('TC-166: Click Find Flights with default dropdown selections', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Do NOT select any departure or destination city (leave defaults)
    // Verify both dropdowns show default values (first option is pre-selected)
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');

    // Get the currently selected values (defaults)
    const defaultDeparture = await departureDropdown.inputValue();
    const defaultDestination = await destinationDropdown.inputValue();

    // The default values should be non-empty (first city options)
    expect(defaultDeparture).toBeTruthy();
    expect(defaultDestination).toBeTruthy();

    // Step 3: Click the 'Find Flights' button without changing any selections
    const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsButton.click();

    // Document actual behavior: The application proceeds with default values
    // and redirects to the flight results page
    // Check if we navigated to a results page
    const currentUrl = page.url();
    // The app uses default values and redirects and proceeds (no validation error shown)
    // We just verify the page changed from the homepage
    expect(currentUrl).not.toBe('https://blazedemo.com/');
  });
});
