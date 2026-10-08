import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../worker.js', import.meta.url), 'utf8');
const { default: worker } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

test('legacy page URLs redirect once without losing their query', async () => {
  for (const [from, to] of [
    ['/about/', '/about'], ['/about.html', '/about'], ['/about/index.html', '/about'],
    ['/index.html', '/'], ['/blog/index.html', '/blog'],
    ['/tools/guided-breathing/', '/tools/guided-breathing'],
    ['/counselling/', '/psychology-counselling'],
    ['/blog/iilm-psychology-internship-greater-noida.html', '/blog/iilm-psychology-internship'],
  ]) {
    const response = await worker.fetch(new Request('https://mindgracencr.in' + from + '?from=old-link'));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), 'https://mindgracencr.in' + to + '?from=old-link');
  }
});

test('canonical pages and asset URLs reach the origin unchanged', async () => {
  const originalFetch = globalThis.fetch;
  const fetched = [];
  globalThis.fetch = async request => { fetched.push(request.url); return new Response('origin'); };
  try {
    for (const pathname of ['/', '/about', '/assets/js/min/visitor-friendly.min.js?v=123']) {
      const url = 'https://mindgracencr.in' + pathname;
      const response = await worker.fetch(new Request(url));
      assert.equal(response.status, 200);
      assert.equal(await response.text(), 'origin');
      assert.equal(fetched.at(-1), url);
      assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
    }
  } finally { globalThis.fetch = originalFetch; }
});

test('www and HTTP requests share the HTTPS canonical host', async () => {
  const response = await worker.fetch(new Request('http://www.mindgracencr.in/services/'));
  assert.equal(response.headers.get('location'), 'https://mindgracencr.in/services');
});

test('CSP permits every Google Analytics connection endpoint used in production', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('origin');
  try {
    const response = await worker.fetch(new Request('https://mindgracencr.in/'));
    const policy = response.headers.get('Content-Security-Policy') ?? '';
    const connectSource = policy.split(';').find((directive) => directive.trim().startsWith('connect-src')) ?? '';
    for (const origin of [
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://stats.g.doubleclick.net',
      'https://www.google.com',
    ]) {
      assert.match(connectSource, new RegExp(origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
