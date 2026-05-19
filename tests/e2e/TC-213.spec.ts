import { test, expect } from '@playwright/test';

/**
 * TC-213: [TC-10] Verify 'Find Flights' Button is Visible and Clickable
 * 
 * Preconditions: Browser is open and connected to the internet
 * Priority: High
 * Type: Positive
 * 
 * Steps:
 * 1. Navigate to https://blazedemo.com/
 * 2. Locate the 'Find Flights' button on the page
 * 3. Verify the button is clickable (not disabled)
 */
test.describe('TC-213: Find Flights Button Verification', () => {
  test('should display the Find Flights button as visible and clickable', async ({ page }) => {
    // Step 1: Navigate to https://blazedemo.com/
    // Expected: Page loads successfully
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');

    // Step 2: Locate the 'Find Flights' button on the page
    // Expected: The button labeled 'Find Flights' is visible on the page
    const findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
    await expect(findFlightsButton).toBeVisible();

    // Step 3: Verify the button is clickable (not disabled)
    // Expected: The 'Find Flights' button is interactive and clickable
    await expect(findFlightsButton).toBeEnabled();
    
    // Additionally verify the button has the correct value attribute
    const buttonValue = await findFlightsButton.getAttribute('value');
    expect(buttonValue).toBe('Find Flights');
  });
});