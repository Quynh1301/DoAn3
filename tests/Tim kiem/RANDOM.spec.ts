import { test, expect } from '@playwright/test';

test('Click vào menu Random và kiểm tra hiển thị truyện ngẫu nhiên', async ({ page }) => {

  await page.goto('https://hangtruyen.org/');
//Tìm thẻ <a> dẫn đến random và loại trừ thẻ bị ẩn với class d-xl-none(để tránh click vào phần tử bị ẩn)
  const randomLink = page.locator('a[href="/random"]:not(.d-xl-none)').first();
  await randomLink.waitFor({ state: 'visible' });
  await randomLink.click();

  await page.waitForLoadState('load');

  const storyTitle = page.locator('h1.m-title, h1.title, .story-title').first();
  await expect(storyTitle).toBeVisible();

  expect(page.url()).toContain('/truyen-tranh/');

  await page.close();
});
