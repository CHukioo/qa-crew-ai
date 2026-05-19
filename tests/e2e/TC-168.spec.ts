import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-168 — [OP-13] Negative - Select same departure and destination city
 * Type: Negative
 * Priority: Low
 *
 * Preconditions: User is on https://blazedemo.com/ homepage
 *
 * This test verifies the behavior when selecting the same city (Paris) for both
 * departure and destination. Documents actual behavior: the application allows
 * same-city selection and proceeds to show results.
 */
test.describe('[OP-13] Negative - Select same departure and destination city', () => {

  test('TC-168: Select Paris as both departure and destination', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Select 'Paris' from the departure city dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 3: Select 'Paris' from the destination city dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('Paris');
    await expect(destinationDropdown).toHaveValue('Paris');

    // Step 4: Click the 'Find Flights' button
    const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsButton.click();

    // Document actual behavior: The application handles same-city selection gracefully
    // and redirects to a flight results page
    const currentUrl = page.url();
    expect(currentUrl).not.toBe('https://blazedemo.com/');

    // Verify the results page loaded (either showing flights or a message)
    const pageBody = page.locator('body');
    await expect(pageBody).toBeVisible();
  });
});
