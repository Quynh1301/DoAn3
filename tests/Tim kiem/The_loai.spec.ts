import { test, expect } from '@playwright/test';

test('Hover vào menu Thể loại và lần lượt chọn các thể loại con, kiểm tra tiêu đề', async ({ page }) => {
  await page.goto('https://hangtruyen.org/');

  // Xác định menu "Thể loại" 
  const theLoaiMenu = page.locator('ul.navbar-nav > li > a.sub-toggle[href="/the-loai"]').first();

  //  thể loại + tiêu đề mong đợi
  const theLoaiList = [
    { href: '/the-loai/manga', expectedTitle: 'Truyện tranh Manga' },
    { href: '/the-loai/manhua', expectedTitle: 'Truyện tranh Manhua' },
    { href: '/the-loai/manhwa', expectedTitle: 'Truyện tranh Manhwa' },
    { href: '/the-loai/marvel-comics', expectedTitle: 'Truyện tranh Marvel Comics' },
    { href: '/the-loai/dc-comics', expectedTitle: 'Truyện tranh DC Comics' }
  ];

  // Lặp qua từng thể loại
  for (const { href, expectedTitle } of theLoaiList) {
    // Hover menu để hiển thị dropdown
    await theLoaiMenu.hover();
    await page.waitForTimeout(2000); 

    // Click vào thể loại cụ thể
    const theLoaiItem = page.locator(`a.dropdown-item[href="${href}"]`).first();
    await theLoaiItem.waitFor({ state: 'visible' });
    await theLoaiItem.click();

    // Kiểm tra URL đúng
    await page.waitForURL(`**${href}`);
    expect(page.url()).toContain(href);

    // Kiểm tra tiêu đề chính xác
    const title = page.locator('h1.m-title.title');
    await expect(title).toHaveText(expectedTitle);

    console.log(`${href} | Đúng tiêu đề: "${expectedTitle}"`);

    await page.waitForTimeout(1500);
  }

  await page.close();
});
