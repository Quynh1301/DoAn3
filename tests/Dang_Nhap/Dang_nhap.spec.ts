import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Kiểm tra người dùng đã đăng nhập', async ({ page }) => {
  await page.goto('https://hangtruyen.org/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await expect(page.getByText('Đăng xuất')).toBeVisible(); 
});
// bởi vì bị Google không cho phép đăng nhập từ trình duyệt headless hoặc không bảo mật