import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.es2022,
				// Third-party libraries available globally
				L: "readonly", // Leaflet
				FloatingUI: "readonly",
				Anime: "readonly",
				Splide: "readonly",
				ScrollReveal: "readonly",
				Iconify: "readonly",
				lucide: "readonly",
				htmx: "readonly",
				Alpine: "readonly",
				Fuse: "readonly",
				Navigo: "readonly",
				Swup: "readonly",
				confetti: "readonly",
				nanoid: "readonly",
				preact: "readonly",
				signals: "readonly",
				Motion: "readonly",
				autoAnimate: "readonly",
				ky: "readonly",
			},
		},
		rules: {
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"no-console": "off",
			"prefer-const": "warn",
			"no-var": "error",
		},
	},
];
