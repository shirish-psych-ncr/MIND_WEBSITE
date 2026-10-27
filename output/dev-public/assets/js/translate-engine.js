/* Compatibility shim for old cached translation controls. No cross-origin fetch. */
window.mgTranslateEngine = { setLanguage: function(code) { if (window.mgTranslateTo) window.mgTranslateTo(code); } };
