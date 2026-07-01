import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAnalytics } from '../src/utils/analytics.js';

test('buildAnalytics returns reusable summary and timeline metrics', () => {
  const history = [
    { url: 'https://github.com/aditya/project', title: 'Project', visitCount: 2, timestamp: Date.now() - 1000 * 60 * 10 },
    { url: 'https://developer.mozilla.org/en-US/docs', title: 'MDN', visitCount: 1, timestamp: Date.now() - 1000 * 60 * 60 * 2 },
    { url: 'https://github.com/aditya/notes', title: 'Notes', visitCount: 3, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2 },
    { url: 'https://youtube.com/watch?v=abc', title: 'React Crash Course', visitCount: 1, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3 },
  ];

  const analytics = buildAnalytics(history);

  assert.equal(analytics.todayVisits, 2);
  assert.equal(analytics.weeklyVisits, 4);
  assert.equal(analytics.monthlyVisits, 4);
  assert.equal(analytics.mostVisitedWebsite.name, 'github.com');
  assert.ok(Array.isArray(analytics.top10Websites));
  assert.ok(analytics.top10Websites.length > 0);
  assert.equal(analytics.mostVisitedCategory.name, 'Programming');
  assert.ok(Array.isArray(analytics.categoryDistribution));
  assert.ok(Array.isArray(analytics.visitsPerHour));
  assert.ok(Array.isArray(analytics.visitsPerDay));
  assert.ok(typeof analytics.averageVisitsPerDay === 'number');
  assert.ok(analytics.mostActiveHour && analytics.mostActiveHour.hour !== undefined);
  assert.ok(analytics.mostActiveDay && analytics.mostActiveDay.day !== undefined);
  assert.ok(Array.isArray(analytics.recentActivity));
  assert.equal(analytics.uniqueDomains, 3);
  assert.equal(analytics.uniqueCategories, 3);
  assert.ok(typeof analytics.averageVisitsPerDomain === 'number');
});

test('buildAnalytics exposes richer productivity scoring and insights', () => {
  const history = [
    { url: 'https://github.com/aditya/project', title: 'Project', visitCount: 3, timestamp: Date.now() - 1000 * 60 * 10 },
    { url: 'https://developer.mozilla.org/en-US/docs', title: 'MDN', visitCount: 2, timestamp: Date.now() - 1000 * 60 * 60 * 2 },
    { url: 'https://www.instagram.com/example', title: 'Instagram', visitCount: 1, timestamp: Date.now() - 1000 * 60 * 60 * 3 },
  ];

  const analytics = buildAnalytics(history);

  assert.ok(analytics.productivityScoreDetails);
  assert.ok(typeof analytics.productivityScoreDetails.score === 'number');
  assert.ok(typeof analytics.productivityScoreDetails.positivePoints === 'number');
  assert.ok(typeof analytics.productivityScoreDetails.negativePoints === 'number');
  assert.ok(typeof analytics.productivityScoreDetails.overallRating === 'string');
  assert.ok(Array.isArray(analytics.insights));
  assert.ok(analytics.insights.length <= 8);
  assert.ok(analytics.insights.every((insight) => typeof insight === 'string'));
});

test('buildAnalytics groups browsing activity into a chronological hourly timeline', () => {
  const history = [
    { url: 'https://github.com/aditya/project', title: 'Project', visitCount: 1, timestamp: Date.now() - 1000 * 60 * 60 * 3 },
    { url: 'https://stackoverflow.com/questions', title: 'Stack Overflow', visitCount: 1, timestamp: Date.now() - 1000 * 60 * 60 * 2 },
    { url: 'https://www.youtube.com/watch?v=demo', title: 'React Crash Course', visitCount: 1, timestamp: Date.now() - 1000 * 60 * 60 },
  ];

  const analytics = buildAnalytics(history);

  assert.ok(Array.isArray(analytics.hourlyTimeline));
  assert.ok(analytics.hourlyTimeline.length > 0);
  assert.ok(analytics.hourlyTimeline.every((bucket) => Array.isArray(bucket.visits)));
});
