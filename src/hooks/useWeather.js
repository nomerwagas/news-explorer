// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
import { fetchWeather } from '../utils/api';

export function useWeather(city = 'New York') {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather(city)
      .then(setWeather)
      .catch(() => setWeather(null))
      .finally(() => setLoading(false));
  }, [city]);

  return { weather, loading };
}
