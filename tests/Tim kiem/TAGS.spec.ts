import { test, expect } from '@playwright/test';

test('Hover vào menu Tags và lần lượt chọn các tag con, kiểm tra tiêu đề', async ({ page }) => {
  
  await page.goto('https://hangtruyen.org/');
//Tìm phần tử chính của menu “Tags” (nơi cần hover vào để hiển thị danh sách dropdown).
  const tagsMenu = page.locator('ul.navbar-nav > li > a.sub-toggle[href="/genre"]').first();

  const tagsList = [
    { href: '/genre/hangtruyen', expectedTitle: 'Truyện tranh HangTruyen' },
    { href: '/genre/action', expectedTitle: 'Truyện tranh Action' },
    { href: '/genre/romance', expectedTitle: 'Truyện tranh Romance' }
  ];

  // Lặp từng tag con
  for (const { href, expectedTitle } of tagsList) {
    // Hover menu Tags để hiển thị dropdown
    await tagsMenu.hover();
    await page.waitForTimeout(2000);

    // Tìm tag con và Click vào tag cụ thể
    const tagItem = page.locator(`a.dropdown-item[href="${href}"]`).first();
    await tagItem.waitFor({ state: 'visible' });
    await tagItem.click();
    // kiểm tra URL
    await page.waitForURL(`**${href}`);
    expect(page.url()).toContain(href);
    //Kiểm tra tiêu đề
    const title = page.locator('h1.m-title.title');
    await expect(title).toHaveText(expectedTitle);

    console.log(`Đã kiểm tra xong: ${href} với tiêu đề "${expectedTitle}"`);
    
    await page.waitForTimeout(1500);
  }

  await page.close();
});
