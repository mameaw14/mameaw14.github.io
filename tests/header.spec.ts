import { expect, test } from '@playwright/test'

test('mastodon', async ({ page }) => {
	await page.goto('/')
	const locator = page.getByText('mastodon')
	await expect(locator).toHaveAttribute('rel', 'me')
})
