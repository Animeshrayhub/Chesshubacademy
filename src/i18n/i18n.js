import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            // Navigation
            "nav.home": "Home",
            "nav.courses": "Courses",
            "nav.playChess": "Play Chess",
            "nav.gallery": "Gallery",
            "nav.contact": "Contact",
            "nav.bookDemo": "Book Free Demo",

            // Hero
            "hero.title": "Learn, Play, Conquer!",
            "hero.subtitle": "Master the game of chess with expert guidance from FIDE-Rated Masters",
            "hero.credentials": "Trained by FIDE-Rated Masters",
            "hero.cta.demo": "Book Free Demo",
            "hero.cta.courses": "View Courses",

            // Features
            "features.title": "Why Choose Us",
            "features.subtitle": "Elite Chess Training, Redefined",

            // Chess Features
            "chess.title": "Interactive Chess Features",
            "chess.subtitle": "Practice, learn, and improve your game",
            "chess.board": "Chess Board",
            "chess. puzzle": "Daily Puzzle",
            "chess.streak": "Streak Tracker",

            // Levels
            "level": "Level",
            "xp": "XP",
            "toNextLevel": "to next level",

            // Puzzles
            "puzzle.daily": "Daily Chess Puzzle",
            "puzzle.solve": "Solve the Puzzle",
            "puzzle.hint": "Show Hint",
            "puzzle.solution": "Solution",
            "puzzle.solved": "Puzzle Solved!",
            "puzzle.xpEarned": "XP Earned",
            "puzzle.streak": "Puzzle Streak",
            "puzzle.currentStreak": "Current Streak",
            "puzzle.bestStreak": "Best Streak",
            "puzzle.totalSolved": "Total Solved",

            // Leaderboard
            "leaderboard.title": "Puzzle Leaderboard",
            "leaderboard.rank": "Rank",
            "leaderboard.player": "Player",
            "leaderboard.score": "Score",
            "leaderboard.streak": "Streak",
            "leaderboard.daily": "Daily",
            "leaderboard.weekly": "Weekly",
            "leaderboard.monthly": "Monthly",
            "leaderboard.allTime": "All Time",

            // Common
            "common.loading": "Loading...",
            "common.error": "Error",
            "common.retry": "Retry",
            "common.close": "Close",
            "common.save": "Save",
            "common.cancel": "Cancel",
            "common.submit": "Submit"
        }
    },
    hi: {
        translation: {
            // Navigation
            "nav.home": "होम",
            "nav.courses": "पाठ्यक्रम",
            "nav.playChess": "शतरंज खेलें",
            "nav.gallery": "गैलरी",
            "nav.contact": "संपर्क",
            "nav.bookDemo": "फ्री डेमो बुक करें",

            // Hero
            "hero.title": "सीखें, खेलें, जीतें!",
            "hero.subtitle": "FIDE रेटेड मास्टर्स से शतरंज सीखें",
            "hero.credentials": "FIDE रेटेड मास्टर्स द्वारा प्रशिक्षित",
            "hero.cta.demo": "फ्री डेमो बुक करें",
            "hero.cta.courses": "पाठ्यक्रम देखें",

            // Features
            "features.title": "हमें क्यों चुनें",
            "features.subtitle": "उच्च स्तरीय शतरंज प्रशिक्षण",

            // Chess Features
            "chess.title": "इंटरैक्टिव शतरंज फीचर्स",
            "chess.subtitle": "अभ्यास करें, सीखें और सुधार करें",
            "chess.board": "शतरंज बोर्ड",
            "chess.puzzle": "दैनिक पहेली",
            "chess.streak": "स्ट्रीक ट्रैकर",

            // Levels
            "level": "स्तर",
            "xp": "अनुभव अंक",
            "toNextLevel": "अगले स्तर तक",

            // Puzzles
            "puzzle.daily": "आज की शतरंज पहेली",
            "puzzle.solve": "पहेली हल करें",
            "puzzle.hint": "संकेत दिखाएं",
            "puzzle.solution": "समाधान",
            "puzzle.solved": "पहेली हल हो गई!",
            "puzzle.xpEarned": "अनुभव अंक मिले",
            "puzzle.streak": "पहेली स्ट्रीक",
            "puzzle.currentStreak": "वर्तमान स्ट्रीक",
            "puzzle.bestStreak": "सर्वश्रेष्ठ स्ट्रीक",
            "puzzle.totalSolved": "कुल हल की गई",

            // Leaderboard
            "leaderboard.title": "पहेली लीडरबोर्ड",
            "leaderboard.rank": "रैंक",
            "leaderboard.player": "खिलाड़ी",
            "leaderboard.score": "स्कोर",
            "leaderboard.streak": "स्ट्रीक",
            "leaderboard.daily": "दैनिक",
            "leaderboard.weekly": "साप्ताहिक",
            "leaderboard.monthly": "मासिक",
            "leaderboard.allTime": "सर्वकालिक",

            // Common
            "common.loading": "लोड हो रहा है...",
            "common.error": "त्रुटि",
            "common.retry": "पुनः प्रयास करें",
            "common.close": "बंद करें",
            "common.save": "सहेजें",
            "common.cancel": "रद्द करें",
            "common.submit": "जमा करें"
        }
    },
    ta: {
        translation: {
            // Navigation
            "nav.home": "முகப்பு",
            "nav.courses": "பாடநெறிகள்",
            "nav.playChess": "சதுரங்கம் விளையாடு",
            "nav.gallery": "படத்தொகுப்பு",
            "nav.contact": "தொடர்பு",
            "nav.bookDemo": "இலவச டெமோ பதிவு",

            // Hero
            "hero.title": "கற்றுக்கொள், விளையாடு, வெல்!",
            "hero.subtitle": "FIDE மதிப்பீடு பெற்ற மாஸ்டர்களிடம் சதுரங்கம் கற்றுக்கொள்ளுங்கள்",
            "hero.credentials": "FIDE மதிப்பீடு பெற்ற மாஸ்டர்களால் பயிற்சி",
            "hero.cta.demo": "இலவச டெமோ பதிவு செய்",
            "hero.cta.courses": "பாடநெறிகளைப் பார்",

            // Features
            "features.title": "எங்களை ஏன் தேர்வு செய்ய வேண்டும்",
            "features.subtitle": "உயர்தர சதுரங்க பயிற்சி",

            // Chess Features
            "chess.title": "ஊடாடும் சதுரங்க அம்சங்கள்",
            "chess.subtitle": "பயிற்சி செய், கற்று, முன்னேறு",
            "chess.board": "சதுரங்க பலகை",
            "chess.puzzle": "தினசரி புதிர்",
            "chess.streak": "தொடர்ச்சி கண்காணிப்பு",

            // Levels
            "level": "நிலை",
            "xp": "அனுபவ புள்ளிகள்",
            "toNextLevel": "அடுத்த நிலைக்கு",

            // Common
            "common.loading": "ஏற்றுகிறது...",
            "common.error": "பிழை",
            "common.retry": "மீண்டும் முயற்சி",
            "common.close": "மூடு",
            "common.save": "சேமி",
            "common.cancel": "ரத்து செய்",
            "common.submit": "சமர்ப்பி"
        }
    },
    te: {
        translation: {
            // Navigation
            "nav.home": "హోమ్",
            "nav.courses": "కోర్సులు",
            "nav.playChess": "చెస్ ఆడడం",
            "nav.gallery": "గ్యాలరీ",
            "nav.contact": "సంప్రదించండి",
            "nav.bookDemo": "ఉచిత డెమో బుక్ చేయండి",

            // Hero
            "hero.title": "నేర్చుకోండి, ఆడండి, గెలవండి!",
            "hero.subtitle": "FIDE రేటెడ్ మాస్టర్స్ నుండి చెస్ నేర్చుకోండి",
            "hero.credentials": "FIDE రేటెడ్ మాస్టర్స్ ద్వారా శిక్షణ",
            "hero.cta.demo": "ఉచిత డెమో బుక్ చేయండి",
            "hero.cta.courses": "కోర్సులు చూడండి",

            // Features
            "features.title": "మమ్మల్ని ఎందుకు ఎంచుకోవాలి",
            "features.subtitle": "ఉన్నత స్థాయి చెస్ శిక్షణ",

            // Chess Features
            "chess.title": "ఇంటరాక్టివ్ చెస్ ఫీచర్లు",
            "chess.subtitle": "ప్రాక్టీస్ చేయండి, నేర్చుకోండి, మెరుగుపడండి",
            "chess.board": "చెస్ బోర్డ్",
            "chess.puzzle": "రోజువారీ పజిల్",
            "chess.streak": "స్ట్రీక్ ట్రాకర్",

            // Levels
            "level": "స్థాయి",
            "xp": "అనుభవ పాయింట్లు",
            "toNextLevel": "తదుపరి స్థాయికి",

            // Common
            "common.loading": "లోడ్ అవుతోంది...",
            "common.error": "లోపం",
            "common.retry": "మళ్లీ ప్రయత్నించండి",
            "common.close": "మూసివేయండి",
            "common.save": "సేవ్ చేయండి",
            "common.cancel": "రద్దు చేయండి",
            "common.submit": "సమర్పించండి"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;
