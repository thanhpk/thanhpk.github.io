// .prettierrc.mjs
/** @type {import("prettier").Config} */

import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	plugins: ['prettier-plugin-astro'],
	site: 'https://thanh.kieu.co',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: 'vi',
		locales: ['vi', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
	output: 'static',
})
