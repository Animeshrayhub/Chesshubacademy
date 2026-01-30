# Lichess API Integration Guide

## 📋 Quick Start

### 1. Get Your Lichess API Token

1. Go to [https://lichess.org/account/oauth/token](https://lichess.org/account/oauth/token)
2. Create a new personal access token
3. Required scopes for ChessHub features:
   - ✅ `puzzle:read` - For daily puzzles
   - ✅ `tournament:write` - For creating tournaments
   - ✅ `challenge:write` - For student challenges
   - ✅ `study:read` - For study materials (optional)

### 2. Add API Token to Your Project

**Option A: Development (Local)**
1. Open the file: `d:\new my site\.env`
2. Replace `VITE_LICHESS_API_TOKEN=` with your actual token:
   ```
   VITE_LICHESS_API_TOKEN=lip_abc123xyz456...
   ```
3. Save the file
4. Restart your dev server (`npm run dev`)

**Option B: Production (Deployment)**
- Add the token as an environment variable in your hosting platform:
  - **Vercel**: Settings → Environment Variables
  - **Netlify**: Site settings → Build & deploy → Environment
  - **Railway**: Variables tab
  
**Never commit your `.env` file to Git!** (It's already in `.gitignore`)

---

## 🚀 Using the API

### Import the Service

```javascript
import lichessApi from '@/services/lichessApi';
// or specific functions:
import { getDailyPuzzle, getUserProfile } from '@/services/lichessApi';
```

### Example Usage

#### Get Daily Puzzle
```javascript
const puzzle = await lichessApi.getDailyPuzzle();
console.log(puzzle);
// { game: {...}, puzzle: {...}, solution: [...] }
```

#### Get User Profile
```javascript
const profile = await lichessApi.getUserProfile('DrNykterstein');
console.log(profile);
// { id: 'drnykterstein', username: 'DrNykterstein', perfs: {...} }
```

#### Get User Rating History
```javascript
const history = await lichessApi.getUserRatingHistory('DrNykterstein');
// Returns rating data for all game modes
```

---

## 📚 Available API Methods

### Puzzles
- `getDailyPuzzle()` - Get today's puzzle
- `getPuzzleByRating(rating)` - Get puzzle by difficulty
- `getPuzzleActivity(count)` - Get recent puzzle activity

### Users
- `getUserProfile(username)` - Get user data
- `getUserRatingHistory(username)` - Get rating graphs
- `getUserCurrentGames(username)` - Get ongoing games

### Games
- `getUserGames(username, options)` - Get game history
- `exportGame(gameId)` - Export game as PGN

### Tournaments
- `getTournament(id)` - Get tournament info
- `getTournamentResults(id)` - Get standings
- `createTournament(data)` - Create new tournament

### Opening Explorer
- `getOpeningExplorer(fen, options)` - Get opening stats
- `getMasterGamesOpening(fen)` - Get master game data

### Challenges
- `challengeUser(username, data)` - Challenge a player

---

## 🎯 Feature Implementation Examples

### 1. Daily Puzzle (Priority 1)

Replace `ChessPuzzle.jsx` with live puzzles:

```javascript
import { useEffect, useState } from 'react';
import { getDailyPuzzle } from '@/services/lichessApi';

function LiveDailyPuzzle() {
    const [puzzle, setPuzzle] = useState(null);
    
    useEffect(() => {
        getDailyPuzzle().then(data => {
            setPuzzle(data);
        });
    }, []);
    
    if (!puzzle) return <div>Loading...</div>;
    
    return (
        <div>
            <h3>Daily Puzzle</h3>
            {/* Render puzzle board here */}
        </div>
    );
}
```

### 2. Student Rating Tracker

```javascript
import { getUserProfile } from '@/services/lichessApi';

async function showStudentRating(username) {
    const profile = await getUserProfile(username);
    
    return {
        blitz: profile.perfs.blitz?.rating,
        rapid: profile.perfs.rapid?.rating,
        classical: profile.perfs.classical?.rating,
    };
}
```

### 3. Tournament Creation

```javascript
import { createTournament } from '@/services/lichessApi';

async function createWeeklyTournament() {
    const tournament = await createTournament({
        name: "ChessHub Weekly Arena",
        clockTime: 5,
        clockIncrement: 3,
        minutes: 60,
        startDate: Date.now() + 86400000, // Tomorrow
        variant: "standard",
        rated: true,
    });
    
    console.log('Tournament created:', tournament.id);
}
```

---

## 🔧 Configuration

### Feature Flags (in `.env`)

Enable/disable features without changing code:

```env
VITE_ENABLE_LICHESS_PUZZLES=true      # Daily puzzles
VITE_ENABLE_TOURNAMENTS=false          # Tournament system
VITE_ENABLE_GAME_ANALYSIS=false        # Game analysis
VITE_ENABLE_RATING_TRACKER=false       # Rating tracking
```

### Check in Code

```javascript
const isPuzzlesEnabled = import.meta.env.VITE_ENABLE_LICHESS_PUZZLES === 'true';

if (isPuzzlesEnabled) {
    // Show puzzle features
}
```

---

## 🛡️ Security Best Practices

1. **Never expose your API token in frontend code**
   - The token is only accessible via `import.meta.env`
   - It's injected at build time, not runtime

2. **Use environment variables for sensitive data**
   ```javascript
   // ✅ Good
   const token = import.meta.env.VITE_LICHESS_API_TOKEN;
   
   // ❌ Bad
   const token = 'lip_abc123xyz456...';
   ```

3. **Consider a backend proxy for production**
   - For sensitive operations, create a backend API
   - Frontend calls your backend, backend calls Lichess
   - Keeps your token server-side

---

## 📊 Rate Limits

Lichess API limits:
- **Without token**: 1 request per second
- **With token**: Higher limits, but be respectful
- Use caching to reduce requests

Example caching:
```javascript
let cachedPuzzle = null;
let cacheTime = null;

async function getCachedDailyPuzzle() {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    if (!cachedPuzzle || (now - cacheTime) > oneHour) {
        cachedPuzzle = await getDailyPuzzle();
        cacheTime = now;
    }
    
    return cachedPuzzle;
}
```

---

## 🐛 Troubleshooting

### "API token not found"
- Check `.env` file exists
- Verify token starts with `lip_`
- Restart dev server after adding token

### "CORS Error"
- Lichess API allows CORS for public endpoints
- For authenticated endpoints, you may need a backend proxy

### "401 Unauthorized"
- Token is invalid or expired
- Check required scopes are enabled
- Generate new token on Lichess

---

## 📖 Resources

- [Lichess API Documentation](https://lichess.org/api)
- [Lichess API Explorer](https://lichess.org/api#section/Introduction)
- [OAuth Token Creation](https://lichess.org/account/oauth/token)

---

## ✅ Next Steps

1. **Add your Lichess API token to `.env`**
2. **Test the API**: Create a simple component that calls `getDailyPuzzle()`
3. **Enable features**: Set feature flags as needed
4. **Implement Priority 1**: Start with daily puzzles

Ready to integrate! 🚀
