import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-174 — [OP-13] Positive - Select all departure city combinations with Rome as destination
 * Type: Positive
 * Priority: Medium
 *
 * Preconditions: User is on https://blazedemo.com/ homepage
 *
 * This test verifies that multiple departure city options work correctly
 * with Rome as the destination:
 * 1. Philadelphia → Rome
 * 2. Boston → Rome
 */
test.describe('[OP-13] Positive - Select all departure city combinations with Rome as destination', () => {

  test('TC-174: Search flights from Philadelphia to Rome and Boston to Rome', async ({ page }) => {
    // Step 1: Navigate to the BlazeDemo homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // --- First combination: Philadelphia to Rome ---
    // Select 'Philadelphia' from the departure dropdown
    const departureDropdown = page.locator('select[name="fromPort"]');
    await departureDropdown.selectOption('Philadelphia');
    await expect(departureDropdown).toHaveValue('Philadelphia');

    // Select 'Rome' from the destination dropdown
    const destinationDropdown = page.locator('select[name="toPort"]');
    await destinationDropdown.selectOption('Rome');
    await expect(destinationDropdown).toHaveValue('Rome');

    // Click 'Find Flights' button
    const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
    await findFlightsButton.click();

    // Verify user is redirected to flight results page showing flights from Philadelphia to Rome
    await expect(page).toHaveURL(/.*reserve\.php.*/);
    const pageBody = page.locator('body');
    await expect(pageBody).toContainText('Flight');

    // --- Second combination: Boston to Rome ---
    // Return to homepage
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Select 'Boston' as departure
    await departureDropdown.selectOption('Boston');
    await expect(departureDropdown).toHaveValue('Boston');

    // Select 'Rome' as destination
    await destinationDropdown.selectOption('Rome');
    await expect(destinationDropdown).toHaveValue('Rome');

    // Click 'Find Flights'
    await findFlightsButton.click();

    // Verify flights from Boston to Rome are displayed successfully
    await expect(page).toHaveURL(/.*reserve\.php.*/);
    await expect(pageBody).toContainText('Flight');
  });
});
