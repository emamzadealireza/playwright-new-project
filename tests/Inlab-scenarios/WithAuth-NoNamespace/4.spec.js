// Scenario name: 4 - انتخاب بیمارستان در صفحه انتخاب نیم اسپیس و برگشت به این صفحه
// Related drive folder: https://drive.google.com/drive/u/0/folders/1LTaR-DQ-E8Cw-T1fQkFxY0mRChn97aJa
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
  // namespace selection
  await page.getByText('بیمارستان تست').click();
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard?search=&namespace_id=1');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patients/');
  await expect(page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید')).toBeEmpty();
  await expect(page.getByText('با استفاده از "آیکون بوکمارک" بیمار خود را به لیست "بیمار های من" اضافه یا حذف کنید')).toHaveText('با استفاده از "آیکون بوکمارک" بیمار خود را به لیست "بیمار های من" اضافه یا حذف کنید');
  // you need to run the test twice to use screenshot assertions, in first run a snapshot created automatically and stored in file beside the test file, so keep calm if face with an error said: "there is no snapshot" in first time when there is no snapshot refrences. in second test run, comparison between mentioned snapshot and what achieved during test is done.
  // also notice that if you've had a change in app, you need to update the snapshots with this command:npx playwright test --update-snapshotsan update or change 
  await expect(page.locator('svg:nth-child(2) > path')).toHaveScreenshot('bookmarked-image.png');
  await expect(page.getByRole('img').nth(2)).toHaveScreenshot('bookmark-image.png');
  // click on setting button
  await page.locator('path').first().click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/user/setting/');
  await expect(page.getByText('علیرضا امامزاده')).toHaveText('علیرضا امامزاده');
  await expect(page.getByText('09107498203')).toHaveText('09107498203');
  await expect(page.getByText('بیمارستان تست')).toHaveText('بیمارستان تست');
  // go back to namespace_selection page
  await page.locator('div').filter({ hasText: /^بیمارستان بیمارستان تست$/ }).nth(2).click();
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/api/v2/user/user_namespaces');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/user/setting/namespace/');
  await expect(page.getByText('بیمارستان خود را انتخاب کنید')).toHaveText('بیمارستان خود را انتخاب کنید');
});