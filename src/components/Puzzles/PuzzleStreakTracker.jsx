import { useState, useEffect } from 'react';
import './PuzzleStreakTracker.css';

export default function PuzzleStreakTracker() {
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [totalSolved, setTotalSolved] = useState(0);

    useEffect(() => {
        loadStats();
    }, []);

    function loadStats() {
        const currentStreak = parseInt(localStorage.getItem('puzzleStreak') || '0');
        const best = parseInt(localStorage.getItem('bestPuzzleStreak') || '0');
        const total = parseInt(localStorage.getItem('totalPuzzlesSolved') || '0');

        setStreak(currentStreak);
        setBestStreak(Math.max(currentStreak, best));
        setTotalSolved(total);

        // Update best streak if current is higher
        if (currentStreak > best) {
            localStorage.setItem('bestPuzzleStreak', currentStreak.toString());
        }
    }

    // Update stats when local storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            loadStats();
        };

        window.addEventListener('storage', handleStorageChange);
        // Also check periodically
        const interval = setInterval(loadStats, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    function getStreakEmoji() {
        if (streak === 0) return '🎯';
        if (streak < 3) return '🔥';
        if (streak < 7) return '🔥🔥';
        if (streak < 30) return '🔥🔥🔥';
        return '🔥🔥🔥🔥';
    }

    function getStreakMessage() {
        if (streak === 0) return 'Start your streak!';
        if (streak === 1) return 'Great start!';
        if (streak < 7) return 'On fire!';
        if (streak < 30) return 'Unstoppable!';
        return 'Legendary streak!';
    }

    return (
        <div className="streak-tracker">
            <div className="streak-header">
                <h3>🎯 Puzzle Streak</h3>
            </div>

            <div className="streak-stats">
                <div className="stat-card streak-current">
                    <div className="stat-icon">{getStreakEmoji()}</div>
                    <div className="stat-value">{streak}</div>
                    <div className="stat-label">Current Streak</div>
                    <div className="stat-message">{getStreakMessage()}</div>
                </div>

                <div className="stat-card streak-best">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-value">{bestStreak}</div>
                    <div className="stat-label">Best Streak</div>
                </div>

                <div className="stat-card streak-total">
                    <div className="stat-icon">✅</div>
                    <div className="stat-value">{totalSolved}</div>
                    <div className="stat-label">Total Solved</div>
                </div>
            </div>

            {streak >= 3 && (
                <div className="streak-milestone">
                    <div className="milestone-badge">
                        <span className="badge-icon">⭐</span>
                        <span className="badge-text">
                            {streak >= 30 ? '30-Day Champion!' :
                                streak >= 7 ? '7-Day Warrior!' :
                                    '3-Day Achiever!'}
                        </span>
                    </div>
                </div>
            )}

            <div className="streak-progress">
                <div className="progress-label">
                    <span>Next Milestone:</span>
                    <span className="progress-target">
                        {streak < 3 ? '3 Days' :
                            streak < 7 ? '7 Days' :
                                streak < 30 ? '30 Days' :
                                    '100 Days'}
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${streak < 3 ? (streak / 3) * 100 :
                                    streak < 7 ? ((streak - 3) / 4) * 100 :
                                        streak < 30 ? ((streak - 7) / 23) * 100 :
                                            ((streak - 30) / 70) * 100
                                }%`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
