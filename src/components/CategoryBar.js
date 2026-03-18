// src/components/CategoryBar.js
import React, { useRef } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { CATEGORIES, COLORS, CATEGORY_COLORS } from '../constants';

export default function CategoryBar({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((cat) => {
        const active = selected === cat.id;
        const color = CATEGORY_COLORS[cat.id];
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={[
              styles.tab,
              active && { backgroundColor: color, borderColor: color },
            ]}
            activeOpacity={0.75}
          >
            <Text style={styles.tabEmoji}>{cat.emoji}</Text>
            <Text
              style={[
                styles.tabLabel,
                active && { color: '#0a0a0f', fontWeight: '800' },
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.bgCard,
    gap: 5,
  },
  tabEmoji: {
    fontSize: 13,
  },
  tabLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
