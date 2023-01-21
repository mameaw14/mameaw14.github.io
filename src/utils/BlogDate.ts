export class BlogDate {
	date: Date

	constructor(date: Date) {
		this.date = date
	}

	static fromDateString(dateString: string) {
		return new BlogDate(new Date(dateString))
	}

	toDateString() {
		return this.date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
	}
}
