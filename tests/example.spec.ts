import { test, expect } from '@playwright/test';

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/OSS Compass/);

  // create a locator
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const getStarted = page.getByRole('link', { name: 'Get started' });
});
