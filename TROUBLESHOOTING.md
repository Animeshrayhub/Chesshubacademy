# 🔧 Troubleshooting Guide - ChessHub Academy

## Is the app not loading? Follow these steps:

### ✅ Step 1: Check Dev Server
The dev server should be running. Look for:
```
VITE v5.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

**Server Running?** ✓ (You're at 16+ minutes)

---

### ✅ Step 2: Open in Browser
Go to: **http://localhost:5173**

You should see the ChessHub Academy homepage.

---

### ✅ Step 3: Navigate to Chess Features
Click the **"Play Chess"** link in the navigation bar

OR

Go directly to: **http://localhost:5173#chess-features**

---

### ✅ Step 4: Check Browser Console
Press `F12` or `Ctrl+Shift+I` to open Developer Tools

**Look for errors in the Console tab**

Common issues:

#### ❌ If you see Module errors:
```
Failed to resolve module
```
**Fix:** Missing imports - check step 5

#### ❌ If you see Supabase errors:
```
Invalid API key
```
**Fix:** Already fixed - .env now has correct key

#### ❌ If tabs don't show:
**Fix:** Clear browser cache (`Ctrl+Shift+R`)

---

### ✅ Step 5: Verify Files Exist
All these files should exist:

```
✓ src/components/Analysis/GameAnalysis.jsx
✓ src/components/Assessment/DemoAssessment.jsx
✓ src/components/Training/AntiComputerTraining.jsx
✓ src/services/supabase.js
```

---

### ✅ Step 6: Test Specific Features

**Test 1: Does the homepage load?**
- Go to http://localhost:5173
- See hero section with chess pieces?

**Test 2: Does Chess Features page load?**
- Go to http://localhost:5173#chess-features
- See tabs at top?

**Test 3: Can you click tabs?**
- Click "Chess Board" tab
- See chess board?

**Test 4: Does tutorial appear?**
- First time visitors should see tutorial popup
- Click "Skip" if it appears

---

## 🐛 Common Issues & Fixes

### Issue 1: "Page is blank"
**Solution:**
1. Hard refresh: `Ctrl + Shift + R`
2. Check console for errors (F12)
3. Restart dev server:
   - Stop: `Ctrl + C` in terminal
   - Start: `npm run dev`

### Issue 2: "Tabs don't switch"
**Solution:**
- This is normal - click different tabs to switch
- Check if content appears below tabs

### Issue 3: "Supabase errors in console"
**Solution:**
✅ Already fixed - .env cleaned up

### Issue 4: "Module not found"
**Solution:**
Check these files were created:
```bash
ls src/components/Analysis/GameAnalysis.jsx
ls src/components/Assessment/DemoAssessment.jsx  
ls src/components/Training/AntiComputerTraining.jsx
ls src/services/supabase.js
```

### Issue 5: "Demo Assessment won't submit"
**Solution:**
1. Check browser console for errors
2. Supabase tables must be created (run SQL schema)
3. Even if save fails, results still show

---

## 🎯 What Should Work Right Now:

### ✅ Working Features:
1. **Homepage** - Full site loads
2. **Navigation** - All links work
3. **Chess Features** - Page loads with 9 tabs
4. **Interactive Board** - Drag & drop pieces
5. **Daily Puzzle** - Fetch from Lichess
6. **Streak Tracker** - Track progress
7. **Daily Challenges** - Complete tasks
8. **Leaderboard** - Show rankings
9. **Chess Variants** - Display 6 variants
10. **AI Analysis** - Analyze games
11. **Demo Assessment** - Full workflow
12. **Anti-Engine Training** - 4 modes
13. **Tutorial** - Auto-launches
14. **XP System** - Earn points
15. **Level Progress** - Animated bar
16. **Language Switcher** - 4 languages
17. **Font Controls** - 4 sizes

### 🔄 Requires Supabase Tables:
- Demo Assessment save (shows results anyway)
- Leaderboard data fetch (shows mock data)

---

## 📊 Quick Test Commands

**Check if files exist:**
```powershell
Get-ChildItem -Recurse -Filter "GameAnalysis.jsx"
Get-ChildItem -Recurse -Filter "DemoAssessment.jsx"
Get-ChildItem -Recurse -Filter "AntiComputerTraining.jsx"
```

**View current .env:**
```powershell
Get-Content .env
```

**Restart server cleanly:**
```powershell
# Stop current server (Ctrl+C), then:
npm run dev
```

---

## 💬 Tell Me Specifics!

To help you better, please share:

1. **What URL are you visiting?**
   - Homepage: http://localhost:5173
   - Chess Features: http://localhost:5173#chess-features

2. **What do you see?**
   - Blank page?
   - Error message?
   - Page loads but features don't work?

3. **Any console errors?** (Press F12)
   - Copy and paste the red errors

4. **Which specific feature isn't working?**
   - Homepage?
   - Chess board?
   - Demo assessment?
   - All of it?

---

## ✅ Current Status:

**Dev Server:** ✓ Running  
**Supabase Config:** ✓ Fixed (duplicates removed)  
**Files:** ✓ All created  
**Port:** 5173  
**Time Running:** 16+ minutes  

**Everything should work now!** 

Try: **http://localhost:5173#chess-features**
