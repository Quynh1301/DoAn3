import { test, expect } from '@playwright/test';

test('Tìm kiếm nâng cao truyện Naruto với Manga và tag #có màu', async ({ page }) => {
  test.setTimeout(90000); 

  await page.goto('https://hangtruyen.org/');
//Click vào liên kết "Nâng cao"
  await page.locator('a.i-filter', { hasText: 'Nâng cao' }).click();
  await page.waitForURL('**/tim-kiem');
  console.log('Truy cập trang nâng cao');

  await page.locator('input[placeholder="Tìm kiếm tên truyện"]').fill('naruto');
  console.log('Nhập tên truyện (Naruto)');

  await page.locator('input#cat--1').check();
  console.log('Chọn thể loại (Manga)');

  await page.locator('a#dropdownZoom').click();

  await page.locator('a.dropdown-item[data-value="view_desc"]').click();
  console.log('Chọn sắp xếp (Lượt xem giảm dần)');

  const tagCoMau = page.locator('span', { hasText: '#có màu' }).first();
  await tagCoMau.scrollIntoViewIfNeeded();//đảm bảo phần tử không bị ẩn trước khi click
  await tagCoMau.click();
  console.log('Chọn Tag (#có màu)');

  const searchBtn = page.locator('button:has-text("Tìm kiếm"), a:has-text("Tìm kiếm")').first();
  await searchBtn.scrollIntoViewIfNeeded();
  await expect(searchBtn).toBeVisible({ timeout: 5000 });
  await searchBtn.click();
  console.log('Nhấn nút "Tìm kiếm"');

  await expect(page.locator('h1.m-title.title')).toContainText(/naruto/i, { timeout: 10000 });
  await expect(page.locator('h2.sub')).toContainText(/kết quả có chứa từ/i);
  console.log('Kết quả tìm kiếm hiển thị đúng');

  await page.close();
});
