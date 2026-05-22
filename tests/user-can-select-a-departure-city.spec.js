import { test, expect } from '@playwright/test';

test.describe('Departure city selection', () => {
  // Runs before each test in this describe block
  test.beforeEach(async ({ page }) => {
    // Navigate to the page that contains the departure city dropdown
    await page.goto('https://example.com/flight-search');
    // Ensure the dropdown is visible before interacting
    await expect(page.locator('[data-testid="departure-city-dropdown"]')).toBeVisible();
  });

  test('User can select a departure city', async ({ page }) => {
    // 1. Open the departure city dropdown
    const dropdown = page.locator('[data-testid="departure-city-dropdown"]');
    await dropdown.click();

    // 2. Select "Paris" from the list
    // Assuming each option has a data-testid like "option-Paris" or can be located by role="option"
    const parisOption = page.locator('[role="option"]', { hasText: 'Paris' });
    await expect(parisOption).toBeVisible();
    await parisOption.click();

    // Expected result: the dropdown now shows "Paris" as the selected value
    const selectedValue = dropdown.locator('[data-testid="selected-value"]');
    await expect(selectedValue).toHaveText('Paris');
  });
});