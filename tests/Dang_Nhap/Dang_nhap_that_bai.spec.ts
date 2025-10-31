// bởi vì bị Google không cho phép đăng nhập từ trình duyệt headless hoặc không bảo mật
import { test, expect } from '@playwright/test';

test('Xác minh lỗi khi Google chặn trình duyệt tự động', async ({ page }) => {
  test.setTimeout(60000); 
  await page.goto('https://hangtruyen.org/');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.waitForSelector('#google-authen-btn', { state: 'visible', timeout: 10000 });
  // thực hiện đồng thời clicl và chuyển trang
  await Promise.all([
    page.waitForNavigation({ timeout: 20000 }),
    page.click('#google-authen-btn'),
  ]);

  // tạo biến trỏ đến ô nhập email
  const emailInput = page.locator('input[type="email"]#identifierId');
  await emailInput.waitFor({ state: 'visible', timeout: 15000 });
  await emailInput.fill('qbui14494@gmail.com');

  await page.getByRole('button', { name: 'Next' }).click();
  const insecureMessage = page.locator('text=This browser or app may not be secure');
  await expect(insecureMessage).toBeVisible({ timeout: 10000 });// kiểm tra cảnh báo xem có xuất hiện trong 10s hay không

  console.log('Đăng nhập thất bại được xác minh đúng.');

  await page.close();
});
