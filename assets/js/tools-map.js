/**
 * Location Page - Leaflet Map Initialization
 * Note: Requires Leaflet CSS and JS to be loaded before this script
 */

(() => {
	document.addEventListener("DOMContentLoaded", () => {
		// Check if Leaflet is available
		if (typeof L === "undefined") {
			console.warn("Leaflet library not loaded. Map will not be displayed.");
			return;
		}

		const mapElement = document.getElementById("leaflet-map");
		if (!mapElement) {
			return; // Not on location page
		}

		const map = L.map("leaflet-map", { scrollWheelZoom: false }).setView(
			[28.4910152, 77.5132324],
			14,
		);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 16,
			attribution: "&copy; OpenStreetMap contributors",
		}).addTo(map);

		L.marker([28.4910152, 77.5132324])
			.addTo(map)
			.bindPopup("Mind Grace Neuropsychiatric Clinic, Gamma-2, Greater Noida");
	});
})();
