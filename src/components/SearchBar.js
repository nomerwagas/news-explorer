// src/components/SearchBar.js
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { COLORS } from '../constants';

export default function SearchBar({ onSearch, onClear, placeholder }) {
  const [text, setText] = useState('');
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.accent],
  });

  const handleSubmit = () => {
    if (text.trim()) onSearch(text.trim());
  };

  const handleClear = () => {
    setText('');
    if (onClear) onClear();
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.inputWrap, { borderColor }]}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder || 'Search news…'}
          placeholderTextColor={COLORS.textMuted}
          returnKeyType="search"
          selectionColor={COLORS.accent}
        />
        {text.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      <TouchableOpacity style={styles.searchBtn} onPress={handleSubmit}>
        <Text style={styles.searchBtnText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
    gap: 8,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    height: 46,
  },
  icon: {
    fontSize: 15,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  clearBtn: {
    padding: 4,
  },
  clearText: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  searchBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingHorizontal: 18,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: {
    color: '#0a0a0f',
    fontWeight: '800',
    fontSize: 14,
  },
});
