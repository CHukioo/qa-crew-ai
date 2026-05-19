import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-110
 * Title: [Positive] Both departure and destination dropdowns are visible on the page
 * Priority: High
 * Type: Positive
 *
 * Preconditions:
 *   - User is on the homepage at https://blazedemo.com/
 */
test.describe('TC-110: Both departure and destination dropdowns are visible on the page', () => {

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

  test('should display the departure city dropdown', async ({ page }) => {
    // Step 2: Locate the departure city dropdown on the page
    // Expected: A dropdown/select element for departure city is visible and labeled appropriately
    const departureDropdown = page.locator('select[name="fromPort"]');
    await expect(departureDropdown).toBeVisible();

    // Verify it has a label/associated text indicating it's for departure
    const departureLabel = page.locator('text=Departure');
    await expect(departureLabel).toBeVisible();
  });

  test('should display the destination city dropdown', async ({ page }) => {
    // Step 3: Locate the destination city dropdown on the page
    // Expected: A dropdown/select element for destination city is visible and labeled appropriately
    const destinationDropdown = page.locator('select[name="toPort"]');
    await expect(destinationDropdown).toBeVisible();

    // Verify it has a label/associated text indicating it's for destination
    const destinationLabel = page.locator('text=Destination');
    await expect(destinationLabel).toBeVisible();
  });
});
