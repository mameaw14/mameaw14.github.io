import { BlogDate } from "./BlogDate"

describe(`Blog Date`, () => {

    it(`should init BlogDate`, () => {
        const result = BlogDate.fromDateString("2023-01-11 11:39:00 +0700")

        expect(result).toBeInstanceOf(BlogDate)
    })

    it(`should format date`, () => {
        const blogDate = new BlogDate(new Date(2023, 0, 11, 10, 10))

        expect(blogDate.toDateString()).toBe("11 January 2023")
    })
})