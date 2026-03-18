// src/screens/FeedScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, CATEGORIES, CATEGORY_COLORS } from '../constants';
import { useNews } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import CategoryBar from '../components/CategoryBar';
import LoadingScreen from '../components/LoadingScreen';
import ErrorView from '../components/ErrorView';

export default function FeedScreen({ navigation, route }) {
  const initialCategory = route?.params?.category || 'general';
  const [category, setCategory] = useState(initialCategory);

  const { articles, loading, refreshing, error, fromCache, refresh } =
    useNews(category);

  const handleCategoryChange = useCallback((cat) => {
    setCategory(cat);
  }, []);

  const catLabel =
    CATEGORIES.find((c) => c.id === category)?.label || 'Top';
  const catEmoji =
    CATEGORIES.find((c) => c.id === category)?.emoji || '🔥';
  const catColor = CATEGORY_COLORS[category] || COLORS.accent;

  const renderItem = useCallback(
    ({ item, index }) => (
      <NewsCard
        article={item}
        index={index}
        featured={index === 0}
      />
    ),
    []
  );

  const ListHeader = (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerSub}>
            {catEmoji} {catLabel.toUpperCase()} NEWS
          </Text>
          <Text style={styles.headerTitle}>Headlines</Text>
        </View>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.searchIconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <CategoryBar selected={category} onSelect={handleCategoryChange} />

      {fromCache && (
        <View style={styles.cacheBadge}>
          <Text style={styles.cacheText}>📦 Cached · Pull to refresh</Text>
        </View>
      )}

      {articles.length > 0 && (
        <Text style={styles.countLabel}>
          {articles.length} articles
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
        {ListHeader}
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
        {ListHeader}
        <ErrorView message={error} onRetry={() => refresh()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <FlatList
        data={articles}
        keyExtractor={(item, index) => item.url || String(index)}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={COLORS.accent}
            colors={[COLORS.accent]}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No articles found.</Text>
          </View>
        }
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  list: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
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
  headerSub: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  searchIcon: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  searchIconText: {
    fontSize: 16,
  },
  cacheBadge: {
    marginHorizontal: 16,
    marginBottom: 4,
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  cacheText: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  countLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});
