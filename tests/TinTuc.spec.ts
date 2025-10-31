import { test, expect } from '@playwright/test';
test ('vào trang tin tức', async ({ page }) => {
    await page.goto('https://hangtruyen.org/');
    const tinTucLink = page.locator('a[href="/tin-tuc"]').first();
    await tinTucLink.waitFor({ state: 'visible' });
    await tinTucLink.click();
    await page.waitForURL('**/tin-tuc');
    expect(page.url()).toContain('/tin-tuc');

    const subTitle = page.locator('span.sub', { hasText: 'Tin tức được quan tâm' });
    await expect(subTitle).toBeVisible();
    // Kiểm tra tiêu đề trang
    const pageTitle = await page.title();

    await page.close();
});


