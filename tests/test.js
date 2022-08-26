import { expect, test } from '@playwright/test';

test('Empty test', async ({ page }) => {
	await page.goto('');
});
