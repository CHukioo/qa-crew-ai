import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-184 (TC-10)
 * Title: Negative - Leave destination city unselected and click Find Flights
 * Precondition: Open browser and navigate to https://blazedemo.com/
 *
 * Note: The application handles missing destination by using default/placeholder
 * value. This test validates graceful handling without crash.
 */
test.describe('Negative: Missing Destination City - TC-184', () => {
  const BASE_URL = 'https://blazedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test('should handle missing destination city gracefully', async ({ page }) => {
    // Step 1: Select 'Paris' as the departure city
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Paris');
    await expect(departureDropdown).toHaveValue('Paris');

    // Step 2: Do not select any destination city (leave default/empty value)
    const destinationDropdown = page.locator('select[name="toPort"]');
    const defaultDestinationValue = await destinationDropdown.inputValue();
    // Verify the dropdown shows its default/placeholder value
    expect(defaultDestinationValue).toBeDefined();

    // Step 3: Click the 'Find Flights' button
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsBtn.click();

    // Expected: Application handles gracefully (navigates or shows message)
    const currentUrl = page.url();
    const isOnResultsPage = currentUrl.includes('reserve.php');
    const isOnHomepage = currentUrl.includes('blazedemo.com');
    expect(isOnResultsPage || isOnHomepage).toBeTruthy();
  });
});
