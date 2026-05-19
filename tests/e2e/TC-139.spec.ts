// =============================================================================
// Test Case: TC-139
// Title:    [OP-13] TC-08: Select departure and destination as the same city
//           (edge case for same-city route)
// Type:     negative
// Priority: low
// URL:      https://blazedemo.com/
// =============================================================================

import { test, expect } from '@playwright/test';

// Preconditions:
// 1. User is on the homepage at https://blazedemo.com/
// 2. Note: The dropdowns are independent; this test checks how the app
//    handles logically invalid routes.
test.describe('[OP-13] TC-08: Same city departure and destination edge case', () => {

  // Navigate to the homepage before each test to ensure a clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
  });

  test('TC-139: Verify app handles same-city selection gracefully', async ({ page }) => {
    // Step 1: Select 'Paris' from the departure city dropdown.
    // Expected: 'Paris' is selected as departure city.
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 2: Check the destination city dropdown — note that 'Paris'
    // may or may not be listed.
    // Expected: Paris may or may not appear in destination options
    // depending on city lists. If it does, select it. If not, this test
    // is N/A and should be noted.
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Get all destination option values to check if Paris is available
    const destinationOptions = await destinationDropdown.locator('option').all();
    const destinationValues: string[] = [];
    for (const option of destinationOptions) {
      const value = await option.getAttribute('value');
      if (value) destinationValues.push(value);
    }

    const parisAvailable = destinationValues.includes('Paris');
    console.log(`Is Paris available as a destination? ${parisAvailable}`);
    console.log(`Destination options: ${destinationValues.join(', ')}`);

    if (parisAvailable) {
      // Step 3 (conditional): If 'Paris' is available as a destination, select it
      // and click 'Find Flights'.
      await destinationDropdown.selectOption('Paris');
      await expect(destinationDropdown).toHaveValue('Paris');

      // Click the Find Flights button
      const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
      await expect(findFlightsButton).toBeVisible();
      await expect(findFlightsButton).toBeEnabled();
      await findFlightsButton.click();

      // Wait for navigation
      await page.waitForLoadState('networkidle');

      // The system should handle this gracefully — either show an error
      // message, or display flight results (possibly empty) for same-city travel.
      const currentUrl = page.url();
      console.log(`Redirected to: ${currentUrl}`);

      // Step 4: Verify no application crash or unhandled error occurs.
      // Expected: The application remains stable. No 500/404 errors,
      // no console errors, and user can navigate back.
      // Check that we ended up on a valid page (either reserve or error)
      expect(currentUrl).toMatch(/blazedemo\.com/);

      // Check for crash indicators
      const body = page.locator('body');
      await expect(body).toBeVisible();
    } else {
      // Paris is not available as destination — test is N/A as noted in
      // the expected results. Log this and pass gracefully.
      console.log('Test N/A: Paris is not available in the destination dropdown.');
    }

    // Step 4 (always): Verify no application crash or unhandled error occurs.
    // Expected: The application remains stable. No 500/404 errors, no console
    // errors, and user can navigate back.
    const pageTitle = await page.title();
    expect(pageTitle).not.toContain('404');
    expect(pageTitle).not.toContain('500');
    expect(pageTitle).not.toContain('Error');

    // Verify we can navigate back to homepage
    await page.goto('https://blazedemo.com/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL('https://blazedemo.com/');
  });
});
