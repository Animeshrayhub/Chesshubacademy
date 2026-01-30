import { useState } from 'react';
import './FontSizeControl.css';

export default function FontSizeControl() {
    const [fontSize, setFontSize] = useState(getFontSize());

    function getFontSize() {
        return localStorage.getItem('fontSize') || 'medium';
    }

    function changeFontSize(size) {
        setFontSize(size);
        localStorage.setItem('fontSize', size);

        // Apply font size to root element
        const root = document.documentElement;

        switch (size) {
            case 'small':
                root.style.fontSize = '14px';
                break;
            case 'medium':
                root.style.fontSize = '16px';
                break;
            case 'large':
                root.style.fontSize = '18px';
                break;
            case 'xlarge':
                root.style.fontSize = '20px';
                break;
            default:
                root.style.fontSize = '16px';
        }
    }

    // Apply saved font size on mount
    useState(() => {
        changeFontSize(fontSize);
    }, []);

    return (
        <div className="font-size-control">
            <label className="control-label">Text Size:</label>
            <div className="size-buttons">
                <button
                    className={`size-btn ${fontSize === 'small' ? 'active' : ''}`}
                    onClick={() => changeFontSize('small')}
                    aria-label="Small text size"
                >
                    A-
                </button>
                <button
                    className={`size-btn ${fontSize === 'medium' ? 'active' : ''}`}
                    onClick={() => changeFontSize('medium')}
                    aria-label="Medium text size"
                >
                    A
                </button>
                <button
                    className={`size-btn ${fontSize === 'large' ? 'active' : ''}`}
                    onClick={() => changeFontSize('large')}
                    aria-label="Large text size"
                >
                    A+
                </button>
                <button
                    className={`size-btn ${fontSize === 'xlarge' ? 'active' : ''}`}
                    onClick={() => changeFontSize('xlarge')}
                    aria-label="Extra large text size"
                >
                    A++
                </button>
            </div>
        </div>
    );
}
