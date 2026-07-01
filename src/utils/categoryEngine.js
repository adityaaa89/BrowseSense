import { CATEGORY_RULES } from '../constants/categories.js';
import { extractDomain } from './urlUtils.js';
import { classifyYoutubeTitle } from './youtubeClassifier.js';

export function classifyVisit(visit) {
  const hostname = extractHostname(visit.url);

  if (hostname.includes('youtube')) {
    return {
      category: classifyYoutubeTitle(visit.title || ''),
      domain: extractDomain(visit.url),
      hostname,
      title: visit.title || 'Untitled',
      timestamp: visit.timestamp,
    };
  }

  return {
    category: matchCategory(hostname, visit.title),
    domain: extractDomain(visit.url),
    hostname,
    title: visit.title || 'Untitled',
    timestamp: visit.timestamp,
  };
}

function matchCategory(hostname, title = '') {
  const normalizedHostname = normalizeHostname(hostname);
  const normalizedTitle = (title || '').toLowerCase();

  // 1. Exact or subdomain matching from predefined rules
  for (const rule of CATEGORY_RULES) {
    const matched = rule.hostnames.some((pattern) => matchesHostname(normalizedHostname, pattern));
    if (matched) {
      return rule.category;
    }
  }

  // 2. Heuristics based on top-level domains (TLDs)
  if (normalizedHostname.endsWith('.edu') || normalizedHostname.endsWith('.ac.uk')) return 'Learning';
  if (normalizedHostname.endsWith('.gov')) return 'Productivity';

  // 3. Heuristics based on URL domain substrings
  if (normalizedHostname.includes('mail')) return 'Email';
  if (normalizedHostname.includes('bank') || normalizedHostname.includes('finance') || normalizedHostname.includes('pay') || normalizedHostname.includes('wallet')) return 'Finance';
  if (normalizedHostname.includes('news') || normalizedHostname.includes('times') || normalizedHostname.includes('post') || normalizedHostname.includes('journal')) return 'News';
  if (normalizedHostname.includes('shop') || normalizedHostname.includes('store') || normalizedHostname.includes('mart') || normalizedHostname.includes('cart') || normalizedHostname.includes('buy')) return 'Shopping';
  if (normalizedHostname.includes('blog') || normalizedHostname.includes('forum')) return 'Social';
  if (normalizedHostname.includes('search')) return 'Search';
  if (normalizedHostname.includes('movie') || normalizedHostname.includes('cinema') || normalizedHostname.includes('film')) return 'Movies';
  if (normalizedHostname.includes('sport') || normalizedHostname.includes('cric') || normalizedHostname.includes('bet')) return 'Sports';
  if (normalizedHostname.includes('music') || normalizedHostname.includes('spotify') || normalizedHostname.includes('audio')) return 'Music';
  if (normalizedHostname.includes('code') || normalizedHostname.includes('dev') || normalizedHostname.includes('tech') || normalizedHostname.includes('soft')) return 'Programming';
  if (normalizedHostname.includes('docs') || normalizedHostname.includes('api') || normalizedHostname.includes('learn') || normalizedHostname.includes('course') || normalizedHostname.includes('tutorial')) return 'Learning';
  if (normalizedHostname.includes('health') || normalizedHostname.includes('med') || normalizedHostname.includes('care') || normalizedHostname.includes('clinic')) return 'Health';
  if (normalizedHostname.includes('travel') || normalizedHostname.includes('flight') || normalizedHostname.includes('hotel') || normalizedHostname.includes('trip') || normalizedHostname.includes('tour')) return 'Travel';

  // 4. Heuristics based on Page Title
  if (normalizedTitle.includes('login') || normalizedTitle.includes('dashboard') || normalizedTitle.includes('admin') || normalizedTitle.includes('portal')) return 'Productivity';
  if (normalizedTitle.includes('search')) return 'Search';
  if (normalizedTitle.includes('buy') || normalizedTitle.includes('cart') || normalizedTitle.includes('checkout') || normalizedTitle.includes('price') || normalizedTitle.includes('order')) return 'Shopping';
  if (normalizedTitle.includes('course') || normalizedTitle.includes('learn') || normalizedTitle.includes('tutorial')) return 'Learning';

  // 5. Fallback
  return 'Other';
}

function extractHostname(url) {
  try {
    return normalizeHostname(new URL(url).hostname);
  } catch {
    return 'unknown';
  }
}

function normalizeHostname(hostname) {
  return (hostname || '').replace(/^www\./, '').toLowerCase();
}

function matchesHostname(hostname, pattern) {
  const normalizedPattern = normalizeHostname(pattern);
  if (!normalizedPattern) {
    return false;
  }

  return hostname === normalizedPattern || hostname.endsWith(`.${normalizedPattern}`);
}
