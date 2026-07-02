/**
 * Location Page - Leaflet Map Initialization
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    if (!window.L) return;

    const map = L.map('leaflet-map', { scrollWheelZoom: false })
      .setView([28.4910152, 77.5132324], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 16,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([28.4910152, 77.5132324])
      .addTo(map)
      .bindPopup('Mind Grace Neuropsychiatric Clinic, Gamma-2, Greater Noida');
  });
})();
