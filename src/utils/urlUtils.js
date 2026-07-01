export function extractDomain(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return 'unknown';
  }
}

export function extractHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return 'unknown';
  }
}

export function normalizeTimestamp(timestamp) {
  return new Date(timestamp).toISOString();
}

export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });
}
