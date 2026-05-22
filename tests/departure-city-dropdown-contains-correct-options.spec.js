import { test, expect } from '@playwright/test';

test.describe('Departure city dropdown', () => {
  // Runs before each test in this describe block
  test.beforeEach(async ({ page }) => {
    // Navigate to the page that contains the departure city dropdown
    await page.goto('https://example.com/flight-search'); // <-- replace with real URL
  });

  test('should expand and list all expected cities', async ({ page }) => {
    // Click the departure city dropdown to expand it
    // Assuming the dropdown has a data-testid attribute for reliable selection
    const dropdown = page.locator('[data-testid="departure-city"]');
    await dropdown.click();

    // Locate the list of options that become visible after clicking
    // This selector targets the dropdown menu; adjust if your markup differs
    const optionsList = page.locator('[data-testid="departure-city-options"] li');

    // Wait for the options to be visible
    await expect(optionsList).toBeVisible();

    // Verify that the expected city names are present in the list
    const expectedCities = ['Paris', 'Philadelphia', 'Boston'];
    await expect(optionsList).toHaveCount(expectedCities.length);
    for (const city of expectedCities) {
      await expect(optionsList.filter({ hasText: city })).toHaveCount(1);
    }

    // Optionally, ensure no extra options are present
    const allOptionTexts = await optionsList.allTextContents();
    expect(allOptionTexts.sort()).toEqual(expectedCities.sort());
  });
});