/** @type {import("tailwindcss").Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans],
			serif: ['IBM Plex Serif', 'Trirong', ...defaultTheme.fontFamily.serif],
			mono: [...defaultTheme.fontFamily.mono],
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#fff8af',
					100: '#fffdf6',
					500: '#fff8af',
				},
				secondary: {
					DEFAULT: '#ff23bf',
					200: '#fface7',
					500: '#ff23bf',
				},
				gray: colors.neutral,
				neutral: colors.neutral,
				display: colors.neutral[700],
				border: colors.neutral[700],
				bg: '#fffdf6',
			},
			typography: {
				DEFAULT: {
					css: {
						code: {
							fontWeight: 'normal',
							fontFamily: defaultTheme.fontFamily.mono,
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function ({ addBase, theme }) {
			addBase({
				html: {
					backgroundColor: theme('colors.bg'),
					fontSize: 18,
					lineHeight: 1.5,
					color: theme('colors.display'),
				},
			})
		}),
	],
}
