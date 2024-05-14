// Scenario name: 1 - ورود به اینلب با نام کاربری و رمز عبور صحیح
// Related drive folder: https://drive.google.com/drive/u/0/folders/1k1C1HkSM6VCwVDDS4oUiaula_4TO2RmY
// Note: 1. Due to  fast page changes of inlab during low code inlab development, assertions are not necessarily complete and ideal.
//       2. After page stability ideal assertions like whole page HTML comparison or page screenshot comparison can be added.

import { test, expect } from '@playwright/test';
// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } }); 

test('test', async ({ page }) => {
  // root page call
  await page.goto('https://synappsdemo.tums.ac.ir/new_inlab/');
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/inlab_login/');
  await expect(page.getByText('به اینلب خوش آمدید')).toHaveText('به اینلب خوش آمدید');
  // authentication process with correct information
  await page.getByPlaceholder('نام کاربری').click();
  await page.getByPlaceholder('نام کاربری').fill('09107498203');
  await page.getByPlaceholder('رمز عبور').click();
  await page.getByPlaceholder('رمز عبور').fill('emam1376');
  await page.getByRole('button', { name: 'ورود به اینلب' }).click();
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/api/v2/user/user_namespaces');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/user/setting/namespace/');
  await expect(page.getByText('بیمارستان خود را انتخاب کنید')).toHaveText('بیمارستان خود را انتخاب کنید');
});