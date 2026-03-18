// src/screens/SearchScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { useSearch } from '../hooks/useNews';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';
import ErrorView from '../components/ErrorView';

const SORT_OPTIONS = [
  { id: 'publishedAt', label: '🕐 Latest' },
  { id: 'popularity',  label: '🔥 Popular' },
  { id: 'relevancy',   label: '🎯 Relevant' },
];

export default function SearchScreen({ navigation }) {
  const { results, loading, error, query, sortBy, setSortBy, search } =
    useSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(
    (q) => {
      Keyboard.dismiss();
      setHasSearched(true);
      search(q, sortBy);
    },
    [sortBy, search]
  );

  const handleSortChange = useCallback(
    (sort) => {
      setSortBy(sort);
      if (query) search(query, sort);
    },
    [query, search, setSortBy]
  );

  const handleClear = useCallback(() => {
    setHasSearched(false);
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => <NewsCard article={item} index={index} />,
    []
  );

  const renderEmpty = () => {
    if (!hasSearched) {
      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>🔍</Text>
          <Text style={styles.placeholderTitle}>Search anything</Text>
          <Text style={styles.placeholderSub}>
            Try "AI", "climate", "economy", "space"…
          </Text>
          <View style={styles.suggestions}>
            {['🤖 AI', '🌍 Climate', '💰 Economy', '🚀 Space'].map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.suggestionPill}
                onPress={() => handleSearch(s.split(' ')[1])}
              >
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
    if (!loading) {
      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>😶</Text>
          <Text style={styles.placeholderTitle}>No results</Text>
          <Text style={styles.placeholderSub}>
            Try different keywords or change the sort order.
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder="Search articles, topics, sources…"
      />

      {/* Sort Filters */}
      {hasSearched && (
        <View style={styles.sortRow}>
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.sortPill,
                sortBy === opt.id && styles.sortPillActive,
              ]}
              onPress={() => handleSortChange(opt.id)}
            >
              <Text
                style={[
                  styles.sortText,
                  sortBy === opt.id && styles.sortTextActive,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Results count */}
      {hasSearched && results.length > 0 && !loading && (
        <Text style={styles.resultCount}>
          {results.length} results for "{query}"
        </Text>
      )}

      {/* Loading */}
      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={COLORS.accent} />
          <Text style={styles.loadingText}>Searching…</Text>
        </View>
      )}

      {/* Error */}
      {error && !loading && (
        <ErrorView message={error} onRetry={() => handleSearch(query)} />
      )}

      {/* Results */}
      {!error && (
        <FlatList
          data={results}
          keyExtractor={(item, index) => item.url || String(index)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={renderEmpty}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  backText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  sortPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  sortPillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  sortText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  sortTextActive: {
    color: '#0a0a0f',
    fontWeight: '800',
  },
  resultCount: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginHorizontal: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  list: {
    paddingTop: 4,
    paddingBottom: 40,
  },
  placeholder: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  placeholderSub: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  suggestionPill: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  suggestionText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
});
