import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('/')

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/mameaw14.xyz/)
})

test('blog link', async ({ page }) => {
	await page.goto('/')

	// Click the get started link.
	await page.getByRole('link', { name: 'blog' }).click()

	// Expects the URL to contain blog.
	await expect(page).toHaveURL(/.*blog/)
})
