# Test info

- Name: happy path - article summary @smoke
- Location: /Users/matthewmolinar/Cantaloupe/web/tests/home.spec.ts:3:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: locator('h2')
Expected string: "Test Headline"
Received: <element(s) not found>
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('h2')

    at /Users/matthewmolinar/Cantaloupe/web/tests/home.spec.ts:29:36
```

# Page snapshot

```yaml
- heading "TL;DR-as-a-Service" [level=1]
- paragraph: Transform any article into a concise summary in seconds.
- textbox "https://example.com/article"
- button "Summarize"
- text: Failed to generate summary
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('happy path - article summary @smoke', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000');
   5 |   
   6 |   // Fill the URL input
   7 |   await page.fill('input[type="url"]', 'https://example.com/article');
   8 |   
   9 |   // Click the summarize button
  10 |   await page.click('button:has-text("Summarize")');
  11 |   
  12 |   // Wait for the summary card to appear
  13 |   const summaryCard = await page.waitForSelector('div:has-text("Summarizing...")');
  14 |   expect(summaryCard).toBeTruthy();
  15 |   
  16 |   // Mock API response
  17 |   await page.route('/api/summarize', async (route) => {
  18 |     await route.fulfill({
  19 |       status: 200,
  20 |       contentType: 'application/json',
  21 |       body: JSON.stringify({
  22 |         headline: 'Test Headline',
  23 |         bullets: ['Point 1', 'Point 2', 'Point 3']
  24 |       })
  25 |     });
  26 |   });
  27 |   
  28 |   // Verify the summary appears
> 29 |   await expect(page.locator('h2')).toHaveText('Test Headline');
     |                                    ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
  30 |   await expect(page.locator('li')).toHaveCount(3);
  31 | });
  32 |
```