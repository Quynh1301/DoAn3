import { test, expect } from '@playwright/test';

test('Tìm kiếm truyện Naruto bằng cách nhập vào ô tìm kiếm và nhấn Enter', async ({ page }) => {
  
  await page.goto('https://hangtruyen.org');

  const searchInput = page.locator('input[placeholder="Tìm kiếm"]');
  await searchInput.click();
  await searchInput.fill('Naruto');
  await searchInput.press('Enter');

  await page.waitForLoadState('networkidle');

  const resultTitle = page.locator('.m-title.title'); 
  await expect(resultTitle).toContainText('Naruto');

  console.log('Đã tìm thấy kết quả chứa "Naruto"');

  await page.close();
});
