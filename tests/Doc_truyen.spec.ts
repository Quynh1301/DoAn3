import { test, expect } from '@playwright/test';

test('Kiểm thử chức năng đọc truyện Shangri-La Frontier', async ({ page }) => {
  test.setTimeout(60000);

  // Vào trang chủ
  await page.goto('https://hangtruyen.org/');
  await expect(page.locator('h1.main-title')).toContainText('HangTruyen Chính Thức', { timeout: 5000 });
  console.log('Trang chủ hiển thị đúng');
  await page.waitForTimeout(500);

  //  Click vào truyện "Shangri-La Frontier"
  const truyệnShangri = page.locator('a[href="/truyen-tranh/shangri-la-frontier"]').first();
  await expect(truyệnShangri).toBeVisible();//kiểm tra đường dẫn 
  await truyệnShangri.click();
  await page.waitForTimeout(700);

  // Kiểm tra vào đúng trang truyện
  await expect(page).toHaveURL(/shangri-la-frontier/);
  await expect(page.locator('a[href="/truyen-tranh/shangri-la-frontier"]')).toBeVisible();
  console.log('Đã vào trang truyện Shangri-La Frontier');
  await page.waitForTimeout(500);

  // Nhấn nút "Đọc ngay"
  const btnDocNgay = page.locator('a.btn-read[href*="/chapter-1"]').nth(1);
  await expect(btnDocNgay).toBeVisible({ timeout: 5000 });
  await btnDocNgay.click();
  await page.waitForTimeout(700);

  //  Kiểm tra đã vào trang đọc truyện
  await expect(page).toHaveURL(/chapter-1/);
  await expect(page.locator('a[href="/truyen-tranh/shangri-la-frontier"]')).toBeVisible();
  console.log('Đã vào trang đọc Chapter 1');
  await page.waitForTimeout(500);

  // ==== Trường hợp 1: Chọn lý do và gửi báo cáo ngay ====

  const btnBaoCao = page.locator('i.icon-info-circle');
  await expect(btnBaoCao).toBeVisible();
  await btnBaoCao.click();
  await page.waitForTimeout(800);
  console.log('Mở popup báo lỗi');

  // Chọn lý do "Ảnh bị lỗi"
  const checkboxAnhBiLoi = page.locator('#report-reason_3');
  await checkboxAnhBiLoi.waitFor({ state: 'visible', timeout: 7000 });
  await checkboxAnhBiLoi.check();
  await page.waitForTimeout(300);
  console.log('Đã chọn lý do: Ảnh bị lỗi');

  // Nhấn nút "Báo cáo"
  const btnGui = page.getByRole('button', { name: 'Báo cáo' });
  await expect(btnGui).toBeVisible({ timeout: 5000 });
  await btnGui.click();
  await page.waitForTimeout(1000);
  console.log('Đã nhấn nút Báo cáo');

  // Kiểm tra thông báo cảm ơn
  const thongBao = page.locator('text=Cảm ơn bạn đã báo cáo');
  await expect(thongBao).toBeVisible({ timeout: 5000 });
  console.log('Hiển thị thông báo cảm ơn sau khi báo cáo');
  await page.waitForTimeout(500);


  // ==== Trường hợp 2: Không chọn lý do, không nhập, chỉ nhấn nút báo cáo ====

  await btnBaoCao.click();
  await page.waitForTimeout(800);
  console.log('Mở lại popup báo lỗi');

  // Không chọn gì cả, chỉ nhấn nút "Báo cáo" và chờ alert(TB) hiện ra
  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Vui lòng chọn ít nhất 1 lý do báo cáo');
    console.log(`Hiển thị alert: ${dialog.message()}`);
    await dialog.accept(); 
  });

  const btnGui3 = page.locator('.report-form button:has-text("Báo cáo")');
  await btnGui3.click();
  await page.waitForTimeout(1000);


  // ==== Cài đặt chế độ đọc ====

  const btnSetting = page.locator('i.icon-setting-2');
  await expect(btnSetting).toBeVisible();
  await btnSetting.click();
  await page.waitForTimeout(800);
  console.log('Đã mở popup Cài đặt');

  // Chọn chế độ đọc: Ngang 1 trang
  const dropdownCheDoDoc = page.locator('#dropdownMode');
  await dropdownCheDoDoc.click();
  await page.waitForTimeout(300);
  const optionNgang1Trang = page.locator('a.dropdown-item[data-mode="horizon-single"]');
  await expect(optionNgang1Trang).toBeVisible();
  await optionNgang1Trang.click();
  await page.waitForTimeout(500);
  console.log('Đã chọn chế độ đọc: Ngang 1 trang');

  // Đổi nền sang chế độ Sáng
  const dropdownLightmode = page.locator('#dropdownLightmode');
  await dropdownLightmode.click();
  await page.waitForTimeout(300);
  const optionSang = page.locator('a.dropdown-item.dl-mode[data-value="false"]');
  await expect(optionSang).toBeVisible();
  await optionSang.click();
  await page.waitForTimeout(500);
  console.log('Đã đổi nền sang chế độ Sáng');

  const checkCheDoDoc = await page.locator('#dropdownMode sub').textContent();
  expect(checkCheDoDoc?.trim()).toBe('Ngang 1 trang');
  console.log('Kiểm tra lại chế độ đọc: chính xác');

  const checkLightMode = await page.locator('#dropdownLightmode sub').textContent();
  expect(checkLightMode?.trim()).toBe('Sáng');
  console.log('Kiểm tra lại chế độ nền: chính xác');
  await page.waitForTimeout(300);

  const btnThoat = page.locator('i.icon-close-circle').nth(2); 
  await expect(btnThoat).toBeVisible();
  await btnThoat.click();
  await page.waitForTimeout(300);
  console.log('Đã đóng popup Cài đặt');

  await page.close();
});
