/**
 * Blog Discovery - Adult Mental Health Dynamic Loader
 */
(async () => {
	const SOURCE_DIR = "pages/adult/";
	const MANIFEST_URL = `${SOURCE_DIR}manifest.json`;

	try {
		const response = await fetch(MANIFEST_URL, {
			method: "GET",
			headers: { "Cache-Control": "no-cache" },
		});

		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const data = await response.json();

		// Map manifest files to full paths
		window.ADULT_BLOG_CONFIG = Object.freeze({
			sourceDir: SOURCE_DIR,
			posts: Object.freeze(data.files.map((file) => `${SOURCE_DIR}${file}`)),
			pinned: Object.freeze(data.pinned || []),
			mostSearched: Object.freeze(data.mostSearched || []),
			symptoms: Object.freeze(data.symptoms || []),
			clusters: Object.freeze(data.clusters || []),
		});

		window.dispatchEvent(new CustomEvent("adultBlogConfigLoaded"));
		console.info("AdultBlogConfig: Initialized successfully.");
	} catch (error) {
		console.error("AdultBlogConfig: Failed to load manifest.", error);
	}
})();
