//this file: simulate the login action in inlab and recieve token;
//           then set the token in another file in playwright/.auth directory (folder)

import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/auth.json';

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

    // Save the authenticated state
    await page.context().storageState({ path: authFile });
});
