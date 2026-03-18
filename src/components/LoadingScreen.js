// src/components/LoadingScreen.js
import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

function SkeletonBar({ width, height = 14, style }) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const bg = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.bgCard, COLORS.bgCardAlt],
  });

  return (
    <Animated.View
      style={[{ width, height, borderRadius: 6, backgroundColor: bg }, style]}
    />
  );
}

function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <SkeletonBar width={6} height={6} style={{ borderRadius: 3 }} />
        <SkeletonBar width={80} height={10} style={{ marginLeft: 8 }} />
        <SkeletonBar width={40} height={10} style={{ marginLeft: 'auto' }} />
      </View>
      <SkeletonBar width="95%" height={16} style={{ marginBottom: 6 }} />
      <SkeletonBar width="70%" height={16} style={{ marginBottom: 10 }} />
      <SkeletonBar width="100%" height={140} style={{ borderRadius: 10 }} />
    </View>
  );
}

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
