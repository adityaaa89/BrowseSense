import { classifyVisit } from './categoryEngine.js';
import { extractDomain, formatTime } from './urlUtils.js';
import { buildProductivityScoreDetails } from './score.js';
import { buildInsights } from './insights.js';

export function buildAnalytics(history = []) {
  const classified = history
    .filter((visit) => visit?.timestamp)
    .map((visit) => ({ ...visit, ...classifyVisit(visit) }))
    .sort((a, b) => b.timestamp - a.timestamp);

  const websiteCounts = countBy(classified, (visit) => extractDomain(visit.url));
  const categoryCounts = countBy(classified, (visit) => normalizeCategoryForProductivity(visit.category));
  const visitsPerHour = buildHourlyBuckets(classified);
  const visitsPerDay = buildDailyBuckets(classified);

  const top10Websites = toSortedList(websiteCounts, 'website');
  const categoryDistribution = toSortedList(categoryCounts, 'category');
  const recentActivity = classified.slice(0, 20).map((visit) => ({
    ...visit,
    displayTime: formatTime(visit.timestamp),
  }));
  const hourlyTimeline = buildHourlyTimeline(classified);

  const mostVisitedWebsite = top10Websites[0] || { name: 'None', value: 0 };
  const mostVisitedCategory = categoryDistribution[0] || { name: 'None', value: 0 };
  const mostActiveHour = visitsPerHour.reduce((best, current) => (current.value > best.value ? current : best), { hour: 'N/A', value: 0 });
  const mostActiveDay = visitsPerDay.reduce((best, current) => (current.value > best.value ? current : best), { day: 'N/A', value: 0 });
  const productivityScoreDetails = buildProductivityScoreDetails(classified);

  return {
    todayVisits: countInRange(classified, isToday),
    weeklyVisits: countInRange(classified, isWithinLastDays(7)),
    monthlyVisits: countInRange(classified, isWithinLastDays(30)),
    mostVisitedWebsite,
    top10Websites,
    mostVisitedCategory,
    categoryDistribution,
    visitsPerHour,
    visitsPerDay,
    averageVisitsPerDay: calculateAverageVisitsPerDay(classified),
    mostActiveHour,
    mostActiveDay,
    recentActivity,
    hourlyTimeline,
    uniqueDomains: Object.keys(websiteCounts).length,
    uniqueCategories: Object.keys(categoryCounts).length,
    averageVisitsPerDomain: calculateAverageVisitsPerDomain(classified),
    productivityScore: productivityScoreDetails.score,
    productivityScoreDetails,
    codingHours: estimateHours(classified, ['Coding', 'Programming', 'Documentation', 'AI', 'Learning']),
    entertainmentHours: estimateHours(classified, ['Entertainment', 'Music', 'Social']),
    classifiedVisits: classified,
    insights: buildInsights({
      classifiedVisits: classified,
      top10Websites,
      mostVisitedCategory,
      mostActiveHour,
      uniqueDomains: Object.keys(websiteCounts).length,
      visitsPerHour,
    }),
  };
}

function countBy(items, selector) {
  return items.reduce((acc, item) => {
    const key = selector(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function toSortedList(countMap, keyName) {
  return Object.entries(countMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value, [keyName]: name }))
    .slice(0, 10);
}

function buildHourlyBuckets(items) {
  const buckets = Array.from({ length: 24 }, (_, hour) => ({ hour, value: 0 }));
  items.forEach((item) => {
    const hour = new Date(item.timestamp).getHours();
    buckets[hour].value += 1;
  });
  return buckets.filter((bucket) => bucket.value > 0).map((bucket) => ({ hour: bucket.hour, value: bucket.value }));
}

function buildDailyBuckets(items) {
  const buckets = new Map();
  items.forEach((item) => {
    const day = new Date(item.timestamp).toISOString().slice(0, 10);
    buckets.set(day, (buckets.get(day) || 0) + 1);
  });

  return Array.from(buckets.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([day, value]) => ({ day, value }));
}

function buildHourlyTimeline(items) {
  const buckets = Array.from({ length: 24 }, (_, hour) => ({ hour, visits: [] }));

  items.forEach((item) => {
    const hour = new Date(item.timestamp).getHours();
    const visit = {
      ...item,
      displayTime: formatTime(item.timestamp),
    };

    buckets[hour].visits.push(visit);
  });

  return buckets
    .filter((bucket) => bucket.visits.length > 0)
    .map((bucket) => ({
      ...bucket,
      visits: bucket.visits.sort((a, b) => a.timestamp - b.timestamp),
    }));
}

function countInRange(items, predicate) {
  return items.filter((item) => predicate(item.timestamp)).length;
}

function isToday(timestamp) {
  const now = new Date();
  const target = new Date(timestamp);
  return now.toDateString() === target.toDateString();
}

function isWithinLastDays(days) {
  return (timestamp) => Date.now() - timestamp <= 1000 * 60 * 60 * 24 * days;
}

function calculateAverageVisitsPerDay(items) {
  if (!items.length) return 0;
  const firstDate = new Date(items[items.length - 1].timestamp);
  const lastDate = new Date(items[0].timestamp);
  const days = Math.max(1, Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1);
  return Number((items.length / days).toFixed(2));
}

function calculateAverageVisitsPerDomain(items) {
  if (!items.length) return 0;
  const uniqueDomains = new Set(items.map((item) => extractDomain(item.url)));
  return Number((items.length / uniqueDomains.size).toFixed(2));
}

function estimateHours(events, categories) {
  const matching = events.filter((event) => categories.includes(normalizeCategoryForProductivity(event.category))).length;
  return Math.max(0, Math.round(matching / 6));
}

function normalizeCategoryForProductivity(category) {
  return category === 'Documentation' ? 'Productivity' : category;
}
