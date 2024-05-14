// Scenario name: 6 - سرچ نام بیمار و بوکمارک - آن‌بوکمارک کردن
// Related drive folder: https://drive.google.com/drive/u/0/folders/1LyJoOb6-w8LZ0SznDy-PAoIwGDzcSmCR
// Note: 1. Due to  fast page changes of inlab during low code inlab development, assertions are not necessarily complete and ideal.
//       2. After page stability ideal assertions like whole page HTML comparison or page screenshot comparison can be added.

// notice: do not confuse (un)bookmark-image with (un)bookmark-icon; they're named according to plasmic project. first group are symbols used in homepage textbox when there is no bookmarhed patients, and second group are bookmark action button in patient card.

import { test, expect } from '@playwright/test';
test.use ({storageState:'playwright/.auth/auth-namespace.json'})

test('test', async ({ page }) => {
  // root page call
  await page.goto('https://synappsdemo.tums.ac.ir/new_inlab/');
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard?search=&namespace_id=1');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patients/');
  await expect(page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید')).toBeEmpty();
  await expect(page.getByText('با استفاده از "آیکون بوکمارک" بیمار خود را به لیست "بیمار های من" اضافه یا حذف کنید')).toHaveText('با استفاده از "آیکون بوکمارک" بیمار خود را به لیست "بیمار های من" اضافه یا حذف کنید');
  // you need to run the test twice to use screenshot assertions, in first run a snapshot created automatically and stored in file beside the test file, so keep calm if face with an error said: "there is no snapshot" in first time when there is no snapshot refrences. in second test run, comparison between mentioned snapshot and what achieved during test is done.
  // also notice that if you've had a change in app, you need to update the snapshots with this command:npx playwright test --update-snapshots
  await expect(page.locator('svg:nth-child(2) > path')).toHaveScreenshot('bookmarked-image.png');
  await expect(page.getByRole('img').nth(2)).toHaveScreenshot('bookmark-image.png');
  // search a patient
  await page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید').click();
  await page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید').fill('سکینه وطن پناه');
  await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard'));
  await expect(page.getByText('نتایج جست و جو')).toHaveText('نتایج جست و جو');
  await expect(page.getByText('سکینه وطن پناه')).toHaveText('سکینه وطن پناه');
  await expect(page.getByText('اتاق 2-تخت204بخش داخلی')).toHaveText('اتاق 2-تخت204بخش داخلی');
  // you need to run the test twice to use screenshot assertions, in first run a snapshot created automatically and stored in file beside the test file, so keep calm if face with an error said: "there is no snapshot" in first time when there is no snapshot refrences. in second test run, comparison between mentioned snapshot and what achieved during test is done.
  // also notice that if you've had a change in app, you need to update the snapshots with this command:npx playwright test --update-snapshots
  await expect(page.getByRole('img').nth(3)).toHaveScreenshot('bookmark-icon.png');
  await expect(page.locator('.PlasmicHomepage_laboratoryData__7fWtn > .__wab_picture > .__wab_img')).toHaveScreenshot('laboratory-data-icon.png');
  await expect(page.locator('.PlasmicHomepage_radiologyReport__wgKE8 > .__wab_picture > .__wab_img')).toHaveScreenshot('radiology-report-icon.png');
  await expect(page.locator('.__wab_img').first()).toHaveScreenshot('patient-profile-icon.png');
  // bookmark the patient in response of search
  await page.getByRole('img').nth(3).click();
  await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard'));
  await expect(page.getByText('نتایج جست و جو')).toHaveText('نتایج جست و جو');
  await expect(page.locator('.__wab_flex-container > .plasmic-default__svg > path')).toHaveScreenshot('bookmarked-icon.png');
  // delete the value from search bar with the multiplication sign (علامت ضربدر موحود در سرچ بار)
  await page.locator('div:nth-child(3) > .plasmic-default__svg > path').click();
  await expect(page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید')).toBeEmpty();
  await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard'));
  await expect(page.getByText('بیماران من')).toHaveText('بیماران من');
  await expect(page.locator('.__wab_flex-container > .plasmic-default__svg > path')).toHaveScreenshot('bookmarked-icon.png');
  // unbookmark the patient from bookmarked patients list
  await page.locator('.__wab_flex-container > .plasmic-default__svg > path').click();
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard?search=&namespace_id=1');
  await expect(page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید')).toBeEmpty();
  await expect(page.getByText('با استفاده از "آیکون بوکمارک" بیمار خود را به لیست "بیمار های من" اضافه یا حذف کنید')).toHaveText('با استفاده از "آیکون بوکمارک" بیمار خود را به لیست "بیمار های من" اضافه یا حذف کنید');
  // you need to run the test twice to use screenshot assertions, in first run a snapshot created automatically and stored in file beside the test file, so keep calm if face with an error said: "there is no snapshot" in first time when there is no snapshot refrences. in second test run, comparison between mentioned snapshot and what achieved during test is done.
  // also notice that if you've had a change in app, you need to update the snapshots with this command:npx playwright test --update-snapshotsan update or change 
  await expect(page.locator('svg:nth-child(2) > path')).toHaveScreenshot('bookmarked-image.png');
  await expect(page.getByRole('img').nth(2)).toHaveScreenshot('bookmark-image.png');
});