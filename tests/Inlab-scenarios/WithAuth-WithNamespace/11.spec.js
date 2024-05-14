// Scenario name: 11 - زدن بر روی دکمه "بازیابی رمز عبور" در صفحه تنظیمات اینلب
// Related drive folder: https://drive.google.com/drive/u/0/folders/1TTl6XnVuFFtJIpLQB5Qc3m8RaJxt1EqU
// Note: 1. Due to  fast page changes of inlab during low code inlab development, assertions are not necessarily complete and ideal.
//       2. After page stability ideal assertions like whole page HTML comparison or page screenshot comparison can be added.

import { test, expect } from '@playwright/test';
test.use ({storageState:'playwright/.auth/auth-namespace.json'})

test('test', async ({ page }) => {
  // root page call
  await page.goto('https://synappsdemo.tums.ac.ir/new_inlab/');
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard?search=&namespace_id=1');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patients/');
  // click on setting
  await page.locator('path').first().click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/user/setting/');
  await expect(page.getByText('علیرضا امامزاده')).toHaveText('علیرضا امامزاده');
  await expect(page.getByText('09107498203')).toHaveText('09107498203');
  await expect(page.getByText('بیمارستان تست')).toHaveText('بیمارستان تست');
  await expect(page.getByText('بازیابی رمز عبور')).toHaveText('بازیابی رمز عبور');
  // click on reset password button
  await page.locator('div').filter({ hasText: /^بازیابی رمز عبور$/ }).first().click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://docs.google.com/forms/d/e/1FAIpQLSe4wNlYlhx_5dvlGE28gca-nJLO_zxGxiMsvPXEjuDz5Xb1_w/viewform');
});