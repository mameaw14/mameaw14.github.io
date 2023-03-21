/** @type {import('ts-jest').JestConfigWithTsJest} */
// for esm support see https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
export default {
	testEnvironment: 'node',
	preset: 'ts-jest/presets/default-esm',
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	testMatch: ['<rootDir>/src/**/*.spec.[tj]s'],
	transform: {
		// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
}
