
// Chạy rồi tạo auth.json lưu kết quả sau đó khi chạy test case đăng nhập sẽ không phải đăng nhập lại nữa
import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://hangtruyen.org/', { timeout: 60000, waitUntil: 'load' });

  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.locator('#google-authen-btn').click();

  console.log('⏳ Hãy đăng nhập bằng Google trong cửa sổ trình duyệt đang mở...');
  await page.pause();

  await context.storageState({ path: 'auth.json' });
  console.log('Đã lưu trạng thái đăng nhập vào auth.json');

  await browser.close();
})();
