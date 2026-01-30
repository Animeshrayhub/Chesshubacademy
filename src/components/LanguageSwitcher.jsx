import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('preferredLanguage', lng);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="language-switcher">
            <button className="language-btn">
                <span className="current-flag">{currentLanguage.flag}</span>
                <span className="current-lang">{currentLanguage.name}</span>
                <span className="dropdown-arrow">▼</span>
            </button>

            <div className="language-dropdown">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                        onClick={() => changeLanguage(lang.code)}
                    >
                        <span className="lang-flag">{lang.flag}</span>
                        <span className="lang-name">{lang.name}</span>
                        {i18n.language === lang.code && <span className="check-mark">✓</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}
