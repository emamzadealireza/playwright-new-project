// Scenario name: 3 - زدن بر روی دکمه "بازیابی رمز عبور" در صفحه لاگین
// Related drive folder: https://drive.google.com/drive/u/0/folders/1JFiZT8fSNkgmudSnESmvyBof4LyL1rmF
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
  // reset password google form test
  const new_tabPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'بازیابی رمز عبور' }).click();
  const google_form_page = await new_tabPromise;
  await page.waitForLoadState("networkidle");
  await expect(google_form_page).toHaveURL('https://docs.google.com/forms/d/e/1FAIpQLScmvuKNhINyeNxRDBA6NRMSCqzl5NCC60Hbkqa6X42kIhXGKQ/viewform');
});