//this file: simulate the login action and nemespace selection in inlab and recieve token and namespace ID;
//           then set them in another file in playwright/.auth directory (folder)

import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/auth-namespace.json';

setup('authenticate', async ({ page }) => {

    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://synappsdemo.tums.ac.ir/new_inlab/inlab_login/');
    await page.waitForLoadState("networkidle");
    await page.getByPlaceholder('نام کاربری').click();
    await page.getByPlaceholder('نام کاربری').fill('09107498203');
    await page.getByPlaceholder('رمز عبور').click();
    await page.getByPlaceholder('رمز عبور').fill('emam1376');
    await page.getByRole('button', { name: 'ورود به اینلب' }).click();

    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForResponse('https://synappsdemo.tums.ac.ir/api/v2/user/login');
    await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/user/setting/namespace/');
    

    //select the namespace.
    await page.getByText('بیمارستان تست').click();

    // Wait for the final URL to ensure that the namespace_id are actually set (need review !! --> با انتخاب نیم اسپیس کوئری کال نمی شود که بتوانم جهت اطمنیان از انتخاب نیم اسپیس بتوانم منتظر پاسخ آن بمانم)
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL('https://synappsdemo.tums.ac.ir/new_inlab/patients/');


    // Save the authenticated state
    await page.context().storageState({ path: authFile });
});
