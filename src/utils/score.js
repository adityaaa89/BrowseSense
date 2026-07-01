import { CATEGORY_WEIGHTS } from '../constants/categories.js';

const WEIGHT_RULES = {
  Programming: 5,
  Documentation: 5,
  Learning: 4,
  AI: 4,
  Cloud: 5,
  DevOps: 5,
  Career: 3,
  Business: 2,
  Finance: 2,
  News: 1,
  Productivity: 3,
  Communication: 1,
  Search: 0,
  Email: 0,
  Entertainment: -2,
  Movies: -2,
  Gaming: -2,
  Music: -1,
  Shopping: -1,
  Travel: -1,
  Social: -3,
  Other: 0,
};

export function buildProductivityScoreDetails(events = []) {
  const positivePoints = events.reduce((sum, visit) => {
    const weight = WEIGHT_RULES[normalizeCategory(visit.category)] ?? 0;
    return weight > 0 ? sum + weight : sum;
  }, 0);
  
  const negativePoints = events.reduce((sum, visit) => {
    const weight = WEIGHT_RULES[normalizeCategory(visit.category)] ?? 0;
    return weight < 0 ? sum + weight : sum;
  }, 0);

  const normalizedScore = normalizeScore(positivePoints, negativePoints);
  const overallRating = getOverallRating(normalizedScore);

  return {
    score: normalizedScore,
    positivePoints,
    negativePoints,
    topProductiveCategory: getTopCategory(events, (weight) => weight > 0),
    topDistractingCategory: getTopCategory(events, (weight) => weight < 0),
    overallRating,
  };
}

export function normalizeScore(positive, negative) {
  if (positive === 0 && negative === 0) return 50;
  // Calculate ratio of positive points to total absolute points
  const total = positive + Math.abs(negative);
  const ratio = positive / total;
  // Scale ratio (0 to 1) to a score (0 to 100)
  return Math.round(ratio * 100);
}

export function getOverallRating(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Average';
  return 'Poor';
}

function getTopCategory(events, predicate) {
  const counts = events.reduce((acc, visit) => {
    const category = normalizeCategory(visit.category);
    const weight = WEIGHT_RULES[category] ?? 0;

    if (predicate(weight)) {
      acc[category] = (acc[category] || 0) + 1;
    }

    return acc;
  }, {});

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return entries[0]?.[0] ?? 'None';
}

function normalizeCategory(category) {
  if (category === 'Documentation') return 'Productivity';
  return category;
}
