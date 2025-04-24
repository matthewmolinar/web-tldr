import { test, expect } from '@playwright/test';

test('happy path - article summary @smoke', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Fill the URL input
  await page.fill('input[type="url"]', 'https://example.com/article');
  
  // Click the summarize button
  await page.click('button:has-text("Summarize")');
  
  // Wait for the summary card to appear
  const summaryCard = await page.waitForSelector('div:has-text("Summarizing...")');
  expect(summaryCard).toBeTruthy();
  
  // Mock API response
  await page.route('**/api/summarize', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        headline: 'Test Headline',
        bullets: ['Point 1', 'Point 2', 'Point 3']
      })
    });
  });
  
  // Verify the summary appears
  await expect(page.locator('h2')).toHaveText('Test Headline');
  await expect(page.locator('li')).toHaveCount(3);
});
