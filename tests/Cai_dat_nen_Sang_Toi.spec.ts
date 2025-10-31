import { test, expect } from '@playwright/test';

test('Chuyển đổi màu nền trên hangtruyen.org', async ({ page }) => {
  
  await page.goto('https://hangtruyen.org/');
//Tìm nút chuyển chế độ nền
  const switchButton = page.locator('.dark-mode.d-none.d-xl-block.on .btn-switch');
  await switchButton.waitFor({ state: 'visible' });
//Lưu lại class ban đầu của body
  const bodyBefore = await page.evaluate(() => document.body.className);
  console.log('Trạng thái ban đầu của body:', bodyBefore);

  await switchButton.click();

  await page.waitForTimeout(1000);
//Lấy class sau khi chuyển
  const bodyAfter = await page.evaluate(() => document.body.className);
  console.log('Trạng thái sau khi chuyển của body:', bodyAfter);
//So sánh class trước và sau
  expect(bodyAfter).not.toBe(bodyBefore);

  await page.close();
});
