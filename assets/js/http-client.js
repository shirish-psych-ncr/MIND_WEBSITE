/**
 * ============================================
 * HTTP-CLIENT.JS - Ky HTTP Client Wrapper
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 *
 * Provides a robust HTTP client with automatic retry,
 * timeout handling, and better error management.
 */

(function() {
  'use strict';

  /**
   * Create Ky API instance with default configuration
   */
  function createApiClient() {
    /* global ky */
    if (typeof ky === 'undefined') {
      console.warn('Ky library not loaded, falling back to fetch');
      return null;
    }

    const api = ky.create({
      prefixUrl: '/api/',
      timeout: 8000,
      retry: {
        limit: 2,
        methods: ['get', 'post'],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
        afterStatusCodes: []
      },
      hooks: {
        beforeRetry: [
          ({ request, _options, _error, retryCount }) => {
            console.log(`Retry ${retryCount} for ${request.url}`);
          }
        ],
        afterResponse: [
          (request, options, response) => {
            if (!response.ok) {
              console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
            return response;
          }
        ]
      }
    });

    console.log('✓ Ky HTTP client initialized');
    return api;
  }

  /**
   * Fetch with ky or fallback to native fetch
   * @param {string} url
   * @param {Object} options
   * @returns {Promise<Response>}
   */
  async function fetchWithRetry(url, options = {}) {
    if (typeof ky !== 'undefined') {
      try {
        return await ky(url, options);
      } catch (error) {
        console.error('Ky request failed, falling back to fetch:', error);
      }
    }

    // Fallback to native fetch
    return fetch(url, options);
  }

  /**
   * Get JSON with automatic error handling
   * @param {string} url
   * @returns {Promise<any>}
   */
  async function getJson(url) {
    const response = await fetchWithRetry(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return response.json();
  }

  /**
   * Post JSON with automatic error handling
   * @param {string} url
   * @param {Object} data
   * @returns {Promise<any>}
   */
  async function postJson(url, data) {
    const response = await fetchWithRetry(url, {
      method: 'POST',
      json: data
    });
    if (!response.ok) {
      throw new Error(`Failed to post to ${url}: ${response.status}`);
    }
    return response.json();
  }

  // Initialize and expose to window
  const api = createApiClient();

  window.HttpClient = {
    api,
    fetch: fetchWithRetry,
    getJson,
    postJson
  };

})();