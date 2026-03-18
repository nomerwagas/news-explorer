// src/constants/index.js

export const COLORS = {
  bg: '#0a0a0f',
  bgCard: '#13131a',
  bgCardAlt: '#1a1a24',
  accent: '#e8ff47',       // electric lime
  accentSoft: '#b8cc2a',
  red: '#ff4757',
  blue: '#3742fa',
  purple: '#9b59b6',
  orange: '#ff6b35',
  teal: '#00d2d3',
  textPrimary: '#f0f0f5',
  textSecondary: '#8888aa',
  textMuted: '#55556a',
  border: '#1e1e2e',
  borderLight: '#2a2a3e',
};

export const FONTS = {
  heading: 'serif',        // fallback — Expo Google Fonts not needed, native serif works
  mono: 'monospace',
};

// ── API KEYS ──────────────────────────────────────────────────────────────────
// Replace these with your own free keys:
//   NewsAPI  → https://newsapi.org/register
//   OpenWeather → https://openweathermap.org/api  (used for weather widget bonus)
export const NEWS_API_KEY = '021b8d9592d341afaeb234d1a0331db9';
export const WEATHER_API_KEY = 'd05829b8a449fa42c4acb6b16d3a73ea';

// ── ENDPOINTS ─────────────────────────────────────────────────────────────────
export const NEWS_BASE_URL = 'https://newsapi.org/v2';
export const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ── CATEGORIES ────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 'general',       label: 'Top',        emoji: '🔥' },
  { id: 'technology',    label: 'Tech',        emoji: '💻' },
  { id: 'science',       label: 'Science',     emoji: '🔬' },
  { id: 'business',      label: 'Business',    emoji: '📈' },
  { id: 'health',        label: 'Health',      emoji: '🏥' },
  { id: 'sports',        label: 'Sports',      emoji: '⚽' },
  { id: 'entertainment', label: 'Culture',     emoji: '🎬' },
];

export const CATEGORY_COLORS = {
  general:       '#e8ff47',
  technology:    '#3742fa',
  science:       '#00d2d3',
  business:      '#ff6b35',
  health:        '#ff4757',
  sports:        '#2ed573',
  entertainment: '#9b59b6',
};

// AsyncStorage cache key
export const CACHE_KEY_PREFIX = 'news_cache_';
export const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
