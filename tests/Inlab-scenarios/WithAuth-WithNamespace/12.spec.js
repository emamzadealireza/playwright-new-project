// Scenario name: 12 - خروج از اینلب
// Related drive folder: https://drive.google.com/drive/u/0/folders/1QkmRCZoBOL7sYWWQae9957jFZgu_Npl3
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
  // click on logout button
  await page.getByRole('button', { name: 'خروج از اینلب' }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/inlab_login/');
  await expect(page.getByText('به اینلب خوش آمدید')).toHaveText('به اینلب خوش آمدید');
});