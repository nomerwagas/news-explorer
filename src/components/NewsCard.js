// src/components/NewsCard.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
} from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../constants';
import { timeAgo, truncate } from '../utils/api';

export default function NewsCard({ article, index = 0, featured = false }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        speed: 14,
        bounciness: 4,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const openArticle = () => {
    if (article.url) Linking.openURL(article.url);
  };

  const sourceColor =
    CATEGORY_COLORS[article._category] || COLORS.accent;

  if (featured) {
    return (
      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={openArticle}
          activeOpacity={0.88}
        >
          {article.urlToImage ? (
            <Image
              source={{ uri: article.urlToImage }}
              style={styles.featuredImage}
            />
          ) : (
            <View style={[styles.featuredImage, styles.imageFallback]} />
          )}
          {/* gradient overlay */}
          <View style={styles.featuredOverlay} />
          <View style={styles.featuredContent}>
            <View style={[styles.sourcePill, { backgroundColor: sourceColor }]}>
              <Text style={styles.sourcePillText}>
                {article.source?.name || 'News'}
              </Text>
            </View>
            <Text style={styles.featuredTitle} numberOfLines={3}>
              {article.title}
            </Text>
            <Text style={styles.featuredMeta}>
              {timeAgo(article.publishedAt)}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <TouchableOpacity
        style={styles.card}
        onPress={openArticle}
        activeOpacity={0.88}
      >
        <View style={styles.cardTextBlock}>
          <View style={[styles.dot, { backgroundColor: sourceColor }]} />
          <Text style={styles.sourceName} numberOfLines={1}>
            {article.source?.name || 'Unknown'}
          </Text>
          <Text style={styles.cardTime}>{timeAgo(article.publishedAt)}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={3}>
          {article.title}
        </Text>
        {article.description ? (
          <Text style={styles.cardDesc} numberOfLines={2}>
            {truncate(article.description, 120)}
          </Text>
        ) : null}
        {article.urlToImage ? (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.cardImage}
          />
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // ── Featured ─────────────────────────────────────────────
  featuredCard: {
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 16,
    overflow: 'hidden',
    height: 260,
    backgroundColor: COLORS.bgCard,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageFallback: {
    backgroundColor: COLORS.bgCardAlt,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,15,0.65)',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  sourcePill: {
    alignSelf: 'flex-start',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  sourcePillText: {
    color: '#0a0a0f',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 6,
  },
  featuredMeta: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },

  // ── Regular card ─────────────────────────────────────────
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTextBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  sourceName: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardTime: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 6,
  },
  cardDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: COLORS.bgCardAlt,
  },
});
