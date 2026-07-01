import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyVisit } from '../src/utils/categoryEngine.js';

test('classifies documentation sites by hostname', () => {
  const result = classifyVisit({
    url: 'https://developer.mozilla.org/en-US/docs',
    title: 'MDN Web Docs',
    timestamp: Date.now(),
  });

  assert.equal(result.category, 'Documentation');
});

test('classifies programming hosts', () => {
  const result = classifyVisit({
    url: 'https://github.com/aditya/project',
    title: 'BrowseSense',
    timestamp: Date.now(),
  });

  assert.equal(result.category, 'Programming');
});

test('classifies AI hosts', () => {
  const result = classifyVisit({
    url: 'https://chat.openai.com/',
    title: 'ChatGPT',
    timestamp: Date.now(),
  });

  assert.equal(result.category, 'AI');
});

test('classifies productivity hosts', () => {
  const result = classifyVisit({
    url: 'https://www.notion.so/',
    title: 'Notion',
    timestamp: Date.now(),
  });

  assert.equal(result.category, 'Productivity');
});

test('falls back to Other for unknown hosts', () => {
  const result = classifyVisit({
    url: 'https://example.com/random-page',
    title: 'Example',
    timestamp: Date.now(),
  });

  assert.equal(result.category, 'Other');
});
