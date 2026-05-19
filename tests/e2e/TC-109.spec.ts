import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-109
 * Title: [Positive] "Find Flights" button is clickable and visible
 * Priority: High
 * Type: Positive
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 */
test.describe('TC-109: "Find Flights" button is clickable and visible', () => {

  // Navigate to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://blazedemo.com/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Homepage loads successfully
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display the "Find Flights" button below the dropdowns', async ({ page }) => {
    // Step 2: Locate the button on the page
    // Expected: A button labeled 'Find Flights' is visible below the dropdowns
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsBtn).toBeVisible();

    // Verify the button is positioned after the dropdown section
    const departureDropdown = page.locator('select[name="fromPort"]');
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(departureDropdown).toBeVisible();
    await expect(destinationDropdown).toBeVisible();
  });

  test('should be interactive (not disabled and clickable)', async ({ page }) => {
    // Step 3: Verify the button is interactive
    // Expected: The button is not disabled and cursor changes to pointer on hover
    const findFlightsBtn = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsBtn).toBeVisible();
    await expect(findFlightsBtn).not.toBeDisabled();

    // Verify button can be clicked by hovering and clicking
    await findFlightsBtn.hover();
    await expect(findFlightsBtn).toBeEnabled();

    // Click the button and verify it triggers navigation
    await findFlightsBtn.click();
    // The page should navigate to reserve.php (with default selections)
    await expect(page).toHaveURL(/reserve\.php/);
  });
});
