import { test, expect } from '@playwright/test';

test('Click vào menu Tin tức và kiểm tra điều hướng và nội dung', async ({ page }) => {
  
  await page.goto('https://hangtruyen.org/');

  const tinTucLink = page.locator('a[href="/tin-tuc"]').first();
  await tinTucLink.waitFor({ state: 'visible' });
  await tinTucLink.click();

  await page.waitForURL('**/tin-tuc');
  expect(page.url()).toContain('/tin-tuc');

  const subTitle = page.locator('span.sub', { hasText: 'Tin tức được quan tâm' });
  await expect(subTitle).toBeVisible();

  await page.close();
});
