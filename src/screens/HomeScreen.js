// src/screens/HomeScreen.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, CATEGORIES, CATEGORY_COLORS } from '../constants';
import WeatherWidget from '../components/WeatherWidget';

export default function HomeScreen({ navigation }) {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(titleY, { toValue: 0, speed: 10, bounciness: 6, useNativeDriver: true }),
      ]),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(cardsOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleY }] }}>
            <Text style={styles.appTag}>📡 LIVE NEWS</Text>
            <Text style={styles.appTitle}>News{'\n'}Explorer</Text>
          </Animated.View>
          <WeatherWidget city="Manila" />
        </View>

        {/* Subtitle */}
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          Real-time headlines from{' '}
          <Text style={styles.accentText}>NewsAPI</Text> &{' '}
          <Text style={styles.accentText}>OpenWeather</Text>.{'\n'}
          Browse categories, search anything, stay informed.
        </Animated.Text>

        {/* Feature pills */}
        <Animated.View style={[styles.pills, { opacity: subtitleOpacity }]}>
          {['🔍 Search', '🗂 Categories', '🔄 Refresh', '⚡ Cached'].map((f) => (
            <View key={f} style={styles.pill}>
              <Text style={styles.pillText}>{f}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Category cards */}
        <Animated.View style={{ opacity: cardsOpacity }}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.grid}>
            {CATEGORIES.map((cat) => {
              const color = CATEGORY_COLORS[cat.id];
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catCard, { borderColor: color + '44' }]}
                  onPress={() =>
                    navigation.navigate('Feed', { category: cat.id })
                  }
                  activeOpacity={0.8}
                >
                  <Text style={styles.catEmoji}>{cat.emoji}</Text>
                  <Text style={[styles.catLabel, { color }]}>{cat.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* CTA */}
        <Animated.View style={{ opacity: cardsOpacity }}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => navigation.navigate('Feed', { category: 'general' })}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>🔥  View Top Headlines</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.85}
          >
            <Text style={styles.searchBtnText}>🔍  Search Articles</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: { flex: 1 },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  appTag: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  appTitle: {
    color: COLORS.textPrimary,
    fontSize: 46,
    fontWeight: '900',
    lineHeight: 50,
    letterSpacing: -1,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
  },
  accentText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 24,
  },
  pill: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  pillText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 28,
  },
  catCard: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 6,
  },
  catEmoji: {
    fontSize: 24,
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  ctaBtn: {
    marginHorizontal: 20,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  ctaText: {
    color: '#0a0a0f',
    fontWeight: '800',
    fontSize: 15,
  },
  searchBtn: {
    marginHorizontal: 20,
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  searchBtnText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 15,
  },
});
