// src/utils/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NEWS_API_KEY,
  WEATHER_API_KEY,
  NEWS_BASE_URL,
  WEATHER_BASE_URL,
  CACHE_KEY_PREFIX,
  CACHE_TTL_MS,
} from '../constants';

// ── Cache helpers ─────────────────────────────────────────────────────────────
async function getCached(key) {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_TTL_MS) return data;
    return null;
  } catch {
    return null;
  }
}

async function setCache(key, data) {
  try {
    await AsyncStorage.setItem(
      CACHE_KEY_PREFIX + key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // silently fail — caching is best-effort
  }
}

// ── NewsAPI ───────────────────────────────────────────────────────────────────

/**
 * Fetch top headlines by category (with local cache).
 * @param {string} category  - e.g. 'technology'
 * @param {boolean} forceRefresh - skip cache
 */
export async function fetchHeadlines(category = 'general', forceRefresh = false) {
  const cacheKey = `headlines_${category}`;

  if (!forceRefresh) {
    const cached = await getCached(cacheKey);
    if (cached) return { articles: cached, fromCache: true };
  }

  const response = await axios.get(`${NEWS_BASE_URL}/top-headlines`, {
    params: {
      category,
      country: 'us',
      pageSize: 30,
      apiKey: NEWS_API_KEY,
    },
  });

  const articles = response.data.articles.filter(
    (a) => a.title && a.title !== '[Removed]' && a.urlToImage
  );

  await setCache(cacheKey, articles);
  return { articles, fromCache: false };
}

/**
 * Search articles by keyword (no cache — always fresh).
 * @param {string} query
 * @param {string} sortBy - 'relevancy' | 'popularity' | 'publishedAt'
 */
export async function searchArticles(query, sortBy = 'publishedAt') {
  const response = await axios.get(`${NEWS_BASE_URL}/everything`, {
    params: {
      q: query,
      sortBy,
      pageSize: 30,
      language: 'en',
      apiKey: NEWS_API_KEY,
    },
  });

  return response.data.articles.filter(
    (a) => a.title && a.title !== '[Removed]'
  );
}

// ── OpenWeatherMap ────────────────────────────────────────────────────────────

/**
 * Fetch current weather for a city (used in the header widget).
 * @param {string} city
 */
export async function fetchWeather(city = 'New York') {
  const cacheKey = `weather_${city.toLowerCase()}`;
  const cached = await getCached(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
    params: {
      q: city,
      appid: WEATHER_API_KEY,
      units: 'metric',
    },
  });

  const data = {
    temp: Math.round(response.data.main.temp),
    feels: Math.round(response.data.main.feels_like),
    condition: response.data.weather[0].main,
    icon: response.data.weather[0].icon,
    city: response.data.name,
  };

  await setCache(cacheKey, data);
  return data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function timeAgo(dateString) {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}
