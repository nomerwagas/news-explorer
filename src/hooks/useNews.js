// src/hooks/useNews.js
import { useState, useEffect, useCallback } from 'react';
import { fetchHeadlines, searchArticles } from '../utils/api';

export function useNews(category = 'general') {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const load = useCallback(async (forceRefresh = false) => {
    try {
      setError(null);
      const { articles: data, fromCache: cached } = await fetchHeadlines(
        category,
        forceRefresh
      );
      setArticles(data);
      setFromCache(cached);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Failed to load news. Check your API key or connection.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category]);

  useEffect(() => {
    setLoading(true);
    setArticles([]);
    load(false);
  }, [category]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    load(true);
  }, [load]);

  return { articles, loading, refreshing, error, fromCache, refresh };
}

export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt');

  const search = useCallback(async (q, sort = sortBy) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    setQuery(q);
    try {
      const data = await searchArticles(q.trim(), sort);
      setResults(data);
    } catch (err) {
      setError('Search failed. Try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  return { results, loading, error, query, sortBy, setSortBy, search };
}
