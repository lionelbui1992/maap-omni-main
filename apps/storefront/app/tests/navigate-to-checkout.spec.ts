import { test, expect } from '@playwright/test';

test('reaches checkout', async ({ page }) => {
    await page.goto(process.env.ENVIRONMENT_URL! || 'https://maap.cc');
    await page.getByRole('link', { name: 'Woman', exact: true }).click();
    await page.getByRole('link', { name: 'Woman', exact: true }).hover();
    await page.getByRole('link', { name: 'Jerseys', exact: true }).click();
    await page
        .getByRole('link', {
            name: "Women's Fragment Pro Air Jersey 2.0",
            exact: true,
        })
        .nth(1)
        .click();
    await page.getByText('M', { exact: true }).click();
    await page.getByRole('button', { name: 'Add To Bag' }).click();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
});
