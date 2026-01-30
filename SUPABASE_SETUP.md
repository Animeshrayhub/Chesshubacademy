# Supabase Setup Guide

## 🔐 Getting Your Supabase Keys

You provided the connection string, but we also need the **anon key** for the client. Here's how to get it:

### Step 1: Get Your Anon Key
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `bxrkkremfbfprscuumeq`
3. Go to **Settings** → **API**
4. Copy the **anon/public** key
5. Add it to `.env`:
   ```
   VITE_SUPABASE_ANON_KEY=your_copied_anon_key_here
   ```

### Step 2: Create Database Tables
Run the SQL in `supabase_schema.sql` in your Supabase SQL Editor:

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. Copy and paste the entire `supabase_schema.sql` file
4. Click **Run**

This creates:
- ✅ `demo_assessments` table
- ✅ `leaderboard` table
- ✅ `user_stats` table
- ✅ Row Level Security policies
- ✅ Auto-update triggers

### Step 3: Verify Connection
After adding the anon key and creating tables:

1. Restart dev server: `npm run dev`
2. Go to Demo Assessment tab
3. Fill form and complete a game
4. Check Supabase Dashboard → **Table Editor** to see the data!

## 📊 Database Structure

### `demo_assessments`
Stores all demo booking assessments with game analysis.

**Columns:**
- `id`: Auto-increment primary key
- `name`, `email`, `phone`, `age`, `experience`: User info
- `game_pgn`, `game_moves`: Chess game data
- `accuracy`, `tactical_rating`, `positional_rating`: AI analysis scores
- `recommended_course`: Suggested course level
- `strengths`, `weaknesses`, `suggested_focus`: Arrays of analysis insights
- `created_at`, `updated_at`: Timestamps

### `leaderboard`
Top players by puzzle score and streak.

**Columns:**
- `id`: Primary key
- `username`: Unique player name
- `score`: Total points
- `streak`: Current streak
- `created_at`, `updated_at`: Timestamps

### `user_stats`
Individual user progress tracking.

**Columns:**
- `user_id`: Unique user identifier
- `xp`: Experience points
- `level`: Current level (1-20)
- `total_puzzles`: Count of solved puzzles
- `current_streak`, `best_streak`: Streak tracking
- `created_at`, `updated_at`: Timestamps

## 🔒 Security (RLS Policies)

**Demo Assessments:**
- ✅ Anyone can INSERT (book demo)
- ✅ Only authenticated users can SELECT (admin view)

**Leaderboard:**
- ✅ Anyone can SELECT (public leaderboard)
- ✅ Authenticated users can INSERT/UPDATE

**User Stats:**
- ✅ Anyone can SELECT their own stats
- ✅ Authenticated users can INSERT/UPDATE

## 🚀 Integration Status

✅ **Supabase client created** (`src/services/supabase.js`)
✅ **DemoAssessment connected** - Saves to database on completion
✅ **Helper functions ready** - Leaderboard and user stats
✅ **Environment configured** - Add your anon key to `.env`

## 📝 Next Steps

1. **Add anon key to `.env`**
2. **Run SQL schema** in Supabase Dashboard
3. **Test demo assessment** - Submit a form
4. **Verify in Supabase** - Check Table Editor
5. **(Optional) Connect leaderboard** - Update PuzzleLeaderboard to fetch from DB

## 💡 Usage Examples

```javascript
// Save demo assessment (already integrated)
import { saveDemoAssessment } from './services/supabase';
await saveDemoAssessment(data);

// Get leaderboard
import { getLeaderboard } from './services/supabase';
const { data } = await getLeaderboard('weekly');

// Update user stats
import { updateUserStats } from './services/supabase';
await updateUserStats(userId, { xp: 100, level: 2 });
```

## 🔗 Connection Info

**Database:** `bxrkkremfbfprscuumeq.supabase.co`
**Tables:** demo_assessments, leaderboard, user_stats
**Password:** Chesshub7008 (for direct DB access)
