// src/components/WeatherWidget.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { useWeather } from '../hooks/useWeather';

const WEATHER_EMOJIS = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌤️',
};

export default function WeatherWidget({ city = 'New York' }) {
  const { weather, loading } = useWeather(city);

  if (loading || !weather) return null;

  const emoji = WEATHER_EMOJIS[weather.condition] || '🌡️';

  return (
    <View style={styles.widget}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.temp}>{weather.temp}°C</Text>
      <Text style={styles.city}>{weather.city}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    gap: 4,
  },
  emoji: {
    fontSize: 14,
  },
  temp: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 13,
  },
  city: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});
