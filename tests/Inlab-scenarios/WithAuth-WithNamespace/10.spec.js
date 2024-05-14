// Scenario name: 10 - چک swithching tab و دکمه ارتباط با سیناپس
// Related drive folder: https://drive.google.com/drive/u/0/folders/1TwktmARaWBl5Ny0OfT9iuBJwFJKEk00j
// Note: 1. Due to  fast page changes of inlab during low code inlab development, assertions are not necessarily complete and ideal.
//       2. After page stability ideal assertions like whole page HTML comparison or page screenshot comparison can be added.

import { test, expect } from '@playwright/test';
test.use ({storageState:'playwright/.auth/auth-namespace.json'})

test('test', async ({ page }) => {
  // root page call
  await page.goto('https://synappsdemo.tums.ac.ir/new_inlab/');
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard?search=&namespace_id=1');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patients/');
  // search a patient
  await page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید').click();
  await page.getByPlaceholder('نام، نام خانوادگی، شماره پرونده، کد ملی، کد پکس را وارد کنید').fill('سکینه وطن پناه');
  await page.waitForResponse(response => response.url().includes('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard'));
  // click on laboratory data icon
  await page.locator('.PlasmicHomepage_laboratoryData__7fWtn > .__wab_picture > .__wab_img').click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patient/670175/lab/');
  await expect(page.locator('.plasmic_all__ZlbCd > div:nth-child(4) > .plasmic_all__ZlbCd')).toHaveScreenshot('swithcing-bottons.png',{ maxDiffPixels: 10 })
  // click on radiology report switching button.
  await page.locator('.PlasmicSwitchingTab_img__t9RC__YZHxg > .__wab_picture > .__wab_img').click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patient/670175/report/list/');
  await expect(page.locator('.plasmic_all__ZlbCd > div:nth-child(3) > .plasmic_all__ZlbCd')).toHaveScreenshot('swithcing-bottons.png',{ maxDiffPixels: 10 })
  // click on laboratory data switching button.
  await page.locator('.PlasmicSwitchingTab_img___1E1E6__MOMUQ > .__wab_picture > .__wab_img').click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patient/670175/lab/');
  await expect(page.locator('.plasmic_all__ZlbCd > div:nth-child(4) > .plasmic_all__ZlbCd')).toHaveScreenshot('swithcing-bottons.png',{ maxDiffPixels: 10 })
  // click on patient profile switching button.
  await page.locator('.PlasmicSwitchingTab_img__zxtub__syxW7 > .__wab_picture > .__wab_img').click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patient/670175/profile/');
  await expect(page.locator('.plasmic_all__ZlbCd > div:nth-child(3) > .plasmic_all__ZlbCd')).toHaveScreenshot('swithcing-bottons.png',{ maxDiffPixels: 10 })
  // click on homepage switching button.
  await page.locator('.__wab_img').first().click();
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard?search=&namespace_id=1');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patients/');
  // click on setting
  await page.locator('path').first().click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/user/setting/');
  await expect(page.locator('div:nth-child(2) > .plasmic_all__ZlbCd')).toHaveScreenshot('homepage-switching-button.png')
  // click on homepage switching button.  
  await page.locator('.__wab_img').first().click();
  await page.waitForResponse('https://synappsdemo.tums.ac.ir/n8n/webhook/bookmarked_patientcard?search=&namespace_id=1');
  await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patients/');
  // click on comment button
  const new_tabPromise = page.waitForEvent('popup');
  await page.getByText('Enter some textEnter some text').click();
  const google_form_page = await new_tabPromise;
  await page.waitForLoadState("networkidle");
  await expect(google_form_page).toHaveURL('https://docs.google.com/forms/d/e/1FAIpQLSdm--yB5xsMJ_PW-MFyyp_-3APBQ8dzti69zsMuIJz6SfoX-g/viewform');
});