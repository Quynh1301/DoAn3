import { test, expect } from '@playwright/test';

test('Click vào menu Hot nhất và lần lượt các tab ALL, Ngày, Tuần, Tháng (có delay)', async ({ page }) => {
  await page.goto('https://hangtruyen.org/');
//Tìm liên kết dẫn đến
  const hotNhatLink = page.locator('a[href="/hot-nhat?type=all"]').first();
  await hotNhatLink.waitFor({ state: 'visible' });
  await hotNhatLink.click();
// / đợi URL chứa và kiểm tra
  await page.waitForURL('**/hot-nhat?type=all');
  expect(page.url()).toContain('/hot-nhat?type=all');

  const pageTitle = page.locator('h1.m-title.title');
  await expect(pageTitle).toHaveText('Truyện hot nhất');

  await page.waitForTimeout(1000);
  const ngayTab = page.locator('a[href="/hot-nhat?type=day"]').first();
  await ngayTab.waitFor({ state: 'visible' });
  await ngayTab.click();

  await page.waitForURL('**/hot-nhat?type=day');
  expect(page.url()).toContain('/hot-nhat?type=day');

  await page.waitForTimeout(1000);
  const tuanTab = page.locator('a[href="/hot-nhat?type=week"]').first();
  await tuanTab.waitFor({ state: 'visible' });
  await tuanTab.click();

  await page.waitForURL('**/hot-nhat?type=week');
  expect(page.url()).toContain('/hot-nhat?type=week');

  await page.waitForTimeout(1000);
  const thangTab = page.locator('a[href="/hot-nhat?type=month"]').first();
  await thangTab.waitFor({ state: 'visible' });
  await thangTab.click();

  await page.waitForURL('**/hot-nhat?type=month');
  expect(page.url()).toContain('/hot-nhat?type=month');

  await page.close();
});
