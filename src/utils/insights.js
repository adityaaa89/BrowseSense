import { formatTime } from './urlUtils.js';

export function buildInsights(analytics = {}) {
  const insights = [];

  if (!analytics?.classifiedVisits?.length) {
    return insights;
  }

  const totalVisits = analytics.classifiedVisits.length;
  const productiveVisits = analytics.classifiedVisits.filter((visit) => isProductive(visit.category)).length;
  const distractingVisits = analytics.classifiedVisits.filter((visit) => isDistracting(visit.category)).length;

  if (totalVisits > 0) {
    const productiveShare = Math.round((productiveVisits / totalVisits) * 100);
    if (productiveShare >= 40) {
      insights.push(`You spent ${productiveShare}% of your browsing time on productive websites.`);
    }
  }

  if (analytics.mostActiveHour?.hour !== undefined && analytics.mostActiveHour?.hour !== 'N/A') {
    const start = formatHourRange(analytics.mostActiveHour.hour);
    insights.push(`Your most productive hour was between ${start}.`);
  }

  const topWebsite = analytics.top10Websites?.[0];
  if (topWebsite?.name) {
    insights.push(`You visited ${topWebsite.name} ${topWebsite.value} times today.`);
  }

  if (analytics.mostVisitedCategory?.name && analytics.mostVisitedCategory.name !== 'None') {
    const categoryLabel = describeCategory(analytics.mostVisitedCategory.name);
    insights.push(`You mainly browsed ${categoryLabel}.`);
  }

  if (analytics.visitsPerHour?.length > 0) {
    const beforeLunch = analytics.visitsPerHour.filter((entry) => entry.hour >= 6 && entry.hour < 12).reduce((sum, entry) => sum + entry.value, 0);
    const afterLunch = analytics.visitsPerHour.filter((entry) => entry.hour >= 12 && entry.hour < 18).reduce((sum, entry) => sum + entry.value, 0);
    if (beforeLunch > 0 && afterLunch > 0 && afterLunch > beforeLunch) {
      insights.push('You were more active after lunch.');
    }
  }

  if (analytics.uniqueDomains > 8) {
    insights.push('You switched between many websites today.');
  }

  if (distractingVisits > 0 && distractingVisits < productiveVisits) {
    insights.push('You had very little social media usage.');
  }

  return insights.slice(0, 8);
}

function isProductive(category) {
  return ['Programming', 'Documentation', 'Learning', 'AI', 'Cloud', 'DevOps', 'Career', 'Business', 'Finance', 'News', 'Productivity', 'Communication', 'Search', 'Email'].includes(category);
}

function isDistracting(category) {
  return ['Entertainment', 'Movies', 'Gaming', 'Music', 'Shopping', 'Travel', 'Social'].includes(category);
}

function describeCategory(category) {
  const labels = {
    Programming: 'programming websites',
    Documentation: 'documentation websites',
    Learning: 'learning websites',
    AI: 'AI websites',
    Cloud: 'cloud platforms',
    DevOps: 'DevOps websites',
    Career: 'career websites',
    Business: 'business websites',
    Finance: 'finance websites',
    News: 'news websites',
    Productivity: 'productivity tools',
    Communication: 'communication tools',
    Search: 'search websites',
    Email: 'email services',
    Entertainment: 'entertainment websites',
    Movies: 'movie websites',
    Gaming: 'gaming websites',
    Music: 'music websites',
    Shopping: 'shopping websites',
    Travel: 'travel websites',
    Social: 'social media websites',
  };

  return labels[category] || `${category.toLowerCase()} websites`;
}

function formatHourRange(hour) {
  const start = hour;
  const end = (hour + 1) % 24;
  const startLabel = start === 12 ? '12 PM' : start > 12 ? `${start - 12} PM` : start === 0 ? '12 AM' : `${start} AM`;
  const endLabel = end === 12 ? '12 PM' : end > 12 ? `${end - 12} PM` : end === 0 ? '12 AM' : `${end} AM`;
  return `${startLabel} and ${endLabel}`;
}
