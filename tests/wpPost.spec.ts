import { expect, test } from '@playwright/test'

test.describe('wordpress blog post', () => {
	test.skip('open graph', async ({ page }) => {
		await page.goto('/blog/test')
		await expect(page.locator('xpath=//meta[property="og:image"]')).toHaveText('/placeholder-social.png')
	})
})
