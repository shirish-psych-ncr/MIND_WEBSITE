/**
 * ============================================
 * HTTP-CLIENT.JS - Robust HTTP Client Wrapper
 * Mind Grace Neuropsychiatric Clinic
 * ============================================
 * Provides a robust HTTP client with automatic retry,
 * timeout handling, and better error management.
 * Falls back to native fetch with AbortController if Ky is unavailable.
 */
(function () {
  "use strict";

  let apiInstance = null;

  /**
   * Create Ky API instance with default configuration
   * @returns {Object|null} Ky instance or null if Ky is not loaded
   */
  function createApiClient() {
    if (typeof ky === "undefined") {
      console.warn(
        "[HttpClient] Ky library not loaded, using native fetch fallback.",
      );
      return null;
    }

    try {
      const api = ky.create({
        prefixUrl: "/api/",
        timeout: 8000,
        retry: {
          limit: 2,
          methods: ["get", "post", "put", "delete"],
          statusCodes: [408, 413, 429, 500, 502, 503, 504],
          afterStatusCodes: [],
        },
        hooks: {
          beforeRetry: [
            ({ request, retryCount }) => {
              console.log(
                `[HttpClient] Retry ${retryCount} for ${request.url}`,
              );
            },
          ],
          afterResponse: [
            (request, options, response) => {
              if (!response.ok) {
                console.error(
                  `[HttpClient] HTTP Error: ${response.status} ${response.statusText} for ${request.url}`,
                );
              }
              return response;
            },
          ],
        },
      });

      console.log("[HttpClient] ✓ Ky HTTP client initialized");
      return api;
    } catch (error) {
      console.error("[HttpClient] Failed to initialize Ky:", error);
      return null;
    }
  }

  /**
   * Native fetch wrapper with timeout support
   * @param {string} url
   * @param {Object} options
   * @param {number} timeout
   * @returns {Promise<Response>}
   */
  async function nativeFetchWithTimeout(url, options = {}, timeout = 8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      if (error.name === "AbortError") {
        throw new Error(
          `[HttpClient] Request to ${url} timed out after ${timeout}ms`,
        );
      }
      throw error;
    }
  }

  /**
   * Fetch with ky or fallback to native fetch
   * @param {string} url
   * @param {Object} options
   * @returns {Promise<Response>}
   */
  async function fetchWithRetry(url, options = {}) {
    // Lazy initialize apiInstance if ky becomes available later
    if (!apiInstance && typeof ky !== "undefined") {
      apiInstance = createApiClient();
    }

    if (apiInstance) {
      try {
        return await apiInstance(url, options);
      } catch (error) {
        console.error(
          "[HttpClient] Ky request failed, falling back to native fetch:",
          error,
        );
      }
    }

    // Fallback to native fetch with timeout
    // Note: Native fetch doesn't support Ky's `json` option natively
    const fetchOptions = { ...options };
    if (fetchOptions.json) {
      fetchOptions.body = JSON.stringify(fetchOptions.json);
      fetchOptions.headers = {
        "Content-Type": "application/json",
        ...(fetchOptions.headers || {}),
      };
      delete fetchOptions.json;
    }

    return nativeFetchWithTimeout(url, fetchOptions, options.timeout || 8000);
  }

  /**
   * Get JSON with automatic error handling
   * @param {string} url
   * @param {Object} [options={}]
   * @returns {Promise<any>}
   */
  async function getJson(url, options = {}) {
    const response = await fetchWithRetry(url, { method: "GET", ...options });
    if (!response.ok) {
      throw new Error(
        `[HttpClient] Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  }

  /**
   * Post JSON with automatic error handling
   * @param {string} url
   * @param {Object} data
   * @param {Object} [options={}]
   * @returns {Promise<any>}
   */
  async function postJson(url, data, options = {}) {
    // Use Ky's `json` option if available, otherwise nativeFetchWithTimeout handles it
    const response = await fetchWithRetry(url, {
      method: "POST",
      json: data,
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `[HttpClient] Failed to post to ${url}: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  }

  // Initialize and expose to window
  apiInstance = createApiClient();

  window.HttpClient = {
    get api() {
      return apiInstance || createApiClient();
    },
    fetch: fetchWithRetry,
    getJson,
    postJson,
  };
})();
