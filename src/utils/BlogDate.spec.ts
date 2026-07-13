import { BlogDate } from './BlogDate.js'

describe(`Blog Date`, () => {
	it(`should init BlogDate`, () => {
		const result = BlogDate.fromDateString('2023-01-11 11:39:00 +0700')

		expect(result).toBeInstanceOf(BlogDate)
	})

	it(`should format date`, () => {
		const blogDate = new BlogDate(new Date(2023, 0, 11, 10, 10))

		expect(blogDate.toDateString()).toBe('11 January 2023')
	})

	it(`should format ISO date string`, () => {
		const blogDate = BlogDate.fromDateString('2023-02-09T13:14:14')

		expect(blogDate.toDateString()).toBe('9 February 2023')
	})

	it(`should format date-only string`, () => {
		const blogDate = BlogDate.fromDateString('2025-03-28')

		expect(blogDate.toDateString()).toBe('28 March 2025')
	})
})
