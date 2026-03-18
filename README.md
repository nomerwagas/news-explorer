# 📡 NewsExplorer

A React Native + Expo mobile app that delivers real-time news using **NewsAPI** and live weather context via **OpenWeatherMap**.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd NewsExplorer
npm install
```

### 2. Add your API keys
Open `src/constants/index.js` and replace the placeholders:

```js
export const NEWS_API_KEY    = 'YOUR_NEWSAPI_KEY_HERE';
export const WEATHER_API_KEY = 'YOUR_OPENWEATHER_KEY_HERE';
```

**Get free keys here:**
- NewsAPI → https://newsapi.org/register (free, 100 req/day dev tier)
- OpenWeather → https://openweathermap.org/api (free tier, no credit card)

### 3. Run the app
```bash
npx expo start
```
Scan the QR code with **Expo Go** on your phone.

---

## ✅ Feature Checklist (Rubric Coverage)

| Requirement | Implementation |
|---|---|
| Public API integration | NewsAPI (`/top-headlines`, `/everything`) |
| Second API (bonus) | OpenWeatherMap weather widget |
| Home Screen | `HomeScreen.js` — title, description, navigation |
| Data Screen | `FeedScreen.js` — live articles via FlatList |
| Loading State | Animated skeleton cards (`LoadingScreen.js`) |
| Error Handling | `ErrorView.js` with retry button |
| useState | Every screen uses multiple state variables |
| useEffect | `useNews`, `useWeather` hooks |
| Fetch / Axios | `axios` in `src/utils/api.js` |
| Conditional rendering | Loading / error / empty / data states |
| FlatList | `FeedScreen` and `SearchScreen` |
| Search | `SearchScreen.js` with keyword search |
| Filter | 3 sort options: Latest / Popular / Relevant |
| Category filter | 7 categories in horizontal `CategoryBar` |
| Pull-to-refresh | `RefreshControl` in `FeedScreen` |
| Animations | Fade-in + slide-up on all cards, shimmer skeleton |
| Local cache | AsyncStorage with 5-min TTL |
| UI / styling | Dark editorial theme, electric-lime accent |

---

## 🗂 Project Structure

```
NewsExplorer/
├── App.js                        # Navigation container
├── src/
│   ├── constants/index.js        # Colors, API keys, categories
│   ├── utils/api.js              # API calls + cache helpers
│   ├── hooks/
│   │   ├── useNews.js            # Headlines + search hooks
│   │   └── useWeather.js         # Weather hook
│   ├── components/
│   │   ├── NewsCard.js           # Animated article card (featured + regular)
│   │   ├── CategoryBar.js        # Horizontal category filter
│   │   ├── SearchBar.js          # Animated search input
│   │   ├── WeatherWidget.js      # Live weather pill (2nd API)
│   │   ├── LoadingScreen.js      # Shimmer skeleton loader
│   │   └── ErrorView.js          # Error state with retry
│   └── screens/
│       ├── HomeScreen.js         # Landing screen
│       ├── FeedScreen.js         # News feed with refresh
│       └── SearchScreen.js       # Full-text search
```

---

## 📝 Reflection (Template — fill in your own words)

**What API did you use?**  
I used two APIs: NewsAPI for fetching live headlines across 7 categories and full-text article search, and the OpenWeatherMap API to display a live weather widget in the home screen header, giving readers relevant context alongside the news.

**What problem does your app solve?**  
It solves information overload by organizing news into clear categories, enabling fast keyword search with sort controls, and caching results so the app remains usable without constant network calls.

**What was the most difficult part of the integration?**  
The most challenging aspect was handling the asynchronous flow cleanly — making sure the loading, error, and data states never overlapped or caused stale UI. Building the custom `useNews` hook with cache awareness required careful coordination of `useState` and `useEffect`.

**What would you improve with more time?**  
I would add full-text reading inside the app (instead of opening the browser), implement infinite scroll pagination, add bookmarks with AsyncStorage persistence, and integrate a third API such as a translation service for multilingual news.

---

## 📦 Dependencies

- `expo` ~51
- `react-navigation/native` + `stack`
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-safe-area-context`
- `expo-blur`, `expo-linear-gradient`
- `axios`
- `@react-native-async-storage/async-storage`
"# news-explorer" 
"# news-api" 
