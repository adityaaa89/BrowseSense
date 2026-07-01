import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyYoutubeTitle } from '../src/utils/youtubeClassifier.js';

test('classifies technical and learning YouTube titles into richer categories', () => {
  assert.equal(classifyYoutubeTitle('React Hooks in 2026 | Full Tutorial'), 'Programming');
  assert.equal(classifyYoutubeTitle('Official React Documentation Explained'), 'Documentation');
  assert.equal(classifyYoutubeTitle('AWS Certified Solutions Architect Course'), 'Cloud');
  assert.equal(classifyYoutubeTitle('Machine Learning with GPT and LLMs'), 'AI');
  assert.equal(classifyYoutubeTitle('Resume and Interview Tips for Developers'), 'Career');
  assert.equal(classifyYoutubeTitle('Crash Course in Python for Beginners'), 'Learning');
  assert.equal(classifyYoutubeTitle('Investing in Stocks and Mutual Funds'), 'Finance');
  assert.equal(classifyYoutubeTitle('Cricket Highlights 2026'), 'Sports');
  assert.equal(classifyYoutubeTitle('Minecraft Gameplay with Friends'), 'Gaming');
  assert.equal(classifyYoutubeTitle('Official Music Video Live Concert'), 'Music');
});
