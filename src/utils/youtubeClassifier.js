const KEYWORD_RULES = [
  {
    category: 'Documentation',
    keywords: ['official documentation', 'api reference', 'docs', 'documentation', 'guide', 'reference'],
  },
  {
    category: 'Programming',
    keywords: ['react', 'angular', 'vue', 'java', 'python', 'node', 'express', 'c++', 'rust', 'go', 'kotlin', 'swift', 'flutter', 'android', 'ios', 'javascript', 'typescript', 'next', 'vite', 'coding', 'programming', 'frontend', 'backend'],
  },
  {
    category: 'Cloud',
    keywords: ['aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'terraform', 'cloud'],
  },
  {
    category: 'AI',
    keywords: ['machine learning', 'deep learning', 'llm', 'chatgpt', 'gemini', 'claude', 'prompt engineering', 'ai', 'artificial intelligence', 'gpt', 'openai'],
  },
  {
    category: 'Career',
    keywords: ['interview', 'resume', 'placement', 'internship'],
  },
  {
    category: 'Learning',
    keywords: ['crash course', 'lecture', 'workshop', 'course'],
  },
  {
    category: 'Finance',
    keywords: ['investing', 'stocks', 'mutual funds', 'crypto', 'finance'],
  },
  {
    category: 'Sports',
    keywords: ['cricket', 'football', 'nba', 'ipl', 'soccer', 'sports', 'match', 'highlights'],
  },
  {
    category: 'Gaming',
    keywords: ['gameplay', 'minecraft', 'valorant', 'cs2', 'gaming'],
  },
  {
    category: 'Music',
    keywords: ['official music video', 'lyrics', 'album', 'live concert', 'music', 'song', 'playlist'],
  },
  {
    category: 'Entertainment',
    keywords: ['movie', 'film', 'trailer', 'comedy', 'stand-up', 'vlog', 'podcast', 'series'],
  },
];

export function classifyYoutubeTitle(title = '') {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('crash course')) {
    return 'Learning';
  }

  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((keyword) => normalizedTitle.includes(keyword))) {
      return rule.category;
    }
  }

  return 'Entertainment';
}
