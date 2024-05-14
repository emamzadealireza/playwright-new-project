// Scenario name: 8 - چک صفحات رادیولوژی
// Related drive folder: https://drive.google.com/drive/u/0/folders/14Wn8OAKWTfm2hs1jRQ3w6MVzR9KJ-7Xt
// Note: 1. Due to  fast page changes of inlab during low code inlab development, assertions are not necessarily complete and ideal.
//       2. After page stability ideal assertions like whole page HTML comparison or page screenshot comparison can be added.

// notice: do not confuse (un)bookmark-image with (un)bookmark-icon; they're named according to plasmic project. first group are symbols used in homepage textbox when there is no bookmarhed patients, and second group are bookmark action buttons in patient card.

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
  // click on radiology report button.
  await page.locator('.PlasmicHomepage_radiologyReport__wgKE8 > .__wab_picture > .__wab_img').click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patient/670175/report/list/');
  // need review, error of "Test timeout of 30000ms exceeded" --> await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/api/v2/patient/670175/radiology_services/recent'));
  // need review, error of "Test timeout of 30000ms exceeded" --> await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/api/v2/patient/670175'));
  await expect(page.getByText('سکینه وطن پناه 53 ♀️')).toHaveText('سکینه وطن پناه 53 ♀️');
  await expect(page.getByText('View PACS')).toHaveText('View PACS')
  await expect(page.getByText('سی تی اسکن').first()).toHaveText('سی تی اسکن');
  await expect(page.getByText('سی تی اسکن اسپیرال مغز بدون تزریق')).toHaveText('سی تی اسکن اسپیرال مغز بدون تزریق');
  // click on a first report to go to radiology_report_detail page
  await page.getByText('سی تی اسکن1402/12/16 11:38:00سی تی اسکن اسپیرال مغز بدون تزریق').click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patient/670175/report/detail/4539185/');
  // need review, error of "Test timeout of 30000ms exceeded" --> await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/api/v2/patient/670175/radiology_services/recent'));
  // need review, error of "Test timeout of 30000ms exceeded" --> await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/api/v2/patient/670175'));
  await expect(page.getByText('سکینه وطن پناه 53 ♀️')).toHaveText('سکینه وطن پناه 53 ♀️');
  // need review --> "toHaveTest" method return error to compare the whole text of report, till now i do not know better way.
});