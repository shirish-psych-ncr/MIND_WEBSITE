import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';
const source = await readFile(new URL('../src/data/developmental-check-in.ts', import.meta.url), 'utf8');
const { code } = await transform(source, { loader: 'ts', format: 'esm' });
const { activeQuestions, pruneAnswers, nextStep, questions } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
test('age routing preserves universal prompts at boundaries', () => {
  for (const age of [0, 11, 12, 35, 36, 71, 72, 155]) {
    const ids = activeQuestions(age, {}).map(q => q.id);
    assert.ok(ids.includes('loss-movement') && ids.includes('other'));
    assert.equal(ids.includes('baby-social'), age < 6);
    assert.equal(ids.includes('social-name'), age >= 12);
    assert.equal(ids.includes('attention'), age >= 36);
    assert.equal(ids.includes('reading'), age >= 72);
    assert.equal(new Set(ids).size, ids.length);
  }
});
test('uncertainty opens a follow-up and changing parent discards its answer', () => {
  assert.ok(activeQuestions(36, { 'social-name': 'unsure' }).some(q => q.id === 'social-name-quiet'));
  const answers = pruneAnswers(36, { 'social-name': 'no', 'social-name-quiet': 'yes', 'loss-movement': 'no', reading: 'yes' });
  assert.deepEqual(answers, { 'social-name': 'no', 'loss-movement': 'no' });
  assert.ok(!activeQuestions(36, answers).some(q => q.id === 'social-name-quiet'));
});
test('result rules never score and loss of skills takes precedence', () => {
  assert.match(nextStep({ 'loss-movement': 'yes', social: 'no' }), /promptly/);
  assert.match(nextStep({ loss: 'no', social: 'yes' }), /noticed some difficulties/);
  assert.match(nextStep({ loss: 'unsure', social: 'na' }), /unsure/);
  assert.match(nextStep({ loss: 'no', social: 'no' }), /does not rule out/);
});
test('every branch has an earlier parent with matching age coverage', () => {
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  questions.forEach((q, i) => { if (q.parent) assert.ok(questions.slice(0, i).some(p => p.id === q.parent && p.min <= q.min && p.max >= q.max)); });
});

test('every month has unique one-question prompts and valid branching', () => {
  assert.ok(questions.length >= 50);
  for (let age=0; age<=155; age++) {
    const base = activeQuestions(age, {});
    const expanded = activeQuestions(age, Object.fromEntries(base.map(q => [q.id, 'yes'])));
    assert.ok(base.length >= 10);
    assert.equal(new Set(expanded.map(q => q.id)).size, expanded.length);
    for (const q of expanded) {
      assert.equal(q.text.split('?').length - 1, 1);
      assert.ok(q.text.length < 150);
    }
  }
});
test('changing age removes unavailable parents and follow-up data', () => {
  assert.deepEqual(pruneAnswers(5, { attention: 'yes', 'attention-interest': 'yes', 'social-name': 'yes', 'social-name-quiet': 'yes', pain: 'unsure' }), { pain: 'unsure' });
});
test('each lost-skill prompt independently requests prompt advice', () => {
  for (const q of questions.filter(q => q.urgent)) assert.match(nextStep({[q.id]:'yes'}), /promptly/);
  assert.match(nextStep({pain:'na'}), /did not apply/);
});
