// Scenario name: 5 - زدن بر دکمه "برگشت به صفحه ورود به اینلب" در صفحه انتخاب نیم اسپیس
// Related drive folder: https://drive.google.com/drive/u/0/folders/16qpwezxIIXZy_2X3DFexfRVNgRO_JbQE
// Note: 1. Due to  fast page changes of inlab during low code inlab development, assertions are not necessarily complete and ideal.
//       2. After page stability ideal assertions like whole page HTML comparison or page screenshot comparison can be added.

import { test, expect } from '@playwright/test';
// define the precondition file to run the test
test.use ({storageState:'playwright/.auth/auth.json'})

test('test', async ({ page }) => {
  // root page call
  await page.goto('https://synappsdemo.tums.ac.ir/new_inlab/');
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/api/v2/user/user_namespaces');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/user/setting/namespace/');
  await expect(page.getByText('بیمارستان خود را انتخاب کنید')).toHaveText('بیمارستان خود را انتخاب کنید');
  // click on back botton to inlab_login page
  await page.getByText('برگشت به صفحه ورود به اینلب').click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/inlab_login/');
  await expect(page.getByText('به اینلب خوش آمدید')).toHaveText('به اینلب خوش آمدید');
});