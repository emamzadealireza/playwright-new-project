// Scenario name: 2 - ورود به اینلب با نام کاربری و رمز عبور اشتباه
// Related drive folder: https://drive.google.com/drive/u/0/folders/1dtc80v-soo0q8LwyE22gH-2cQz09qhq9
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
  // authentication process with incorrect information
  await page.getByPlaceholder('نام کاربری').click();
  await page.getByPlaceholder('نام کاربری').fill('123456789');
  await page.getByPlaceholder('رمز عبور').click();
  await page.getByPlaceholder('رمز عبور').fill('123456789');
  await page.getByRole('button', { name: 'ورود به اینلب' }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/inlab_login/');
  await expect(page.getByText('به اینلب خوش آمدید')).toHaveText('به اینلب خوش آمدید');
  await expect(page.getByText('اطلاعات وارد شده نامعتبر است')).toHaveText('اطلاعات وارد شده نامعتبر است');
});
