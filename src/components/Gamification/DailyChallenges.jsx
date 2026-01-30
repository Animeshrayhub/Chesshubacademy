import { useState } from 'react';
import './DailyChallenges.css';
import { awardXP, XP_REWARDS } from '../../utils/XPSystem';

export default function DailyChallenges() {
    const [challenges, setChallenges] = useState(getDailyChallenges());
    const [streak, setStreak] = useState(getDailyStreak());

    function getDailyChallenges() {
        const today = new Date().toDateString();
        const savedDate = localStorage.getItem('dailyChallengesDate');

        // Reset challenges if it's a new day
        if (savedDate !== today) {
            const newChallenges = generateDailyChallenges();
            localStorage.setItem('dailyChallenges', JSON.stringify(newChallenges));
            localStorage.setItem('dailyChallengesDate', today);
            return newChallenges;
        }

        const saved = localStorage.getItem('dailyChallenges');
        return saved ? JSON.parse(saved) : generateDailyChallenges();
    }

    function generateDailyChallenges() {
        return [
            {
                id: 1,
                title: 'Puzzle Master',
                description: 'Solve 5 chess puzzles',
                icon: '🧩',
                progress: 0,
                target: 5,
                completed: false,
                xpReward: 50
            },
            {
                id: 2,
                title: 'Practice Makes Perfect',
                description: 'Play 3 chess games',
                icon: '♟️',
                progress: 0,
                target: 3,
                completed: false,
                xpReward: 75
            },
            {
                id: 3,
                title: 'Learning Journey',
                description: 'Complete 1 lesson or watch a video',
                icon: '📚',
                progress: 0,
                target: 1,
                completed: false,
                xpReward: 30
            }
        ];
    }

    function getDailyStreak() {
        const streak = parseInt(localStorage.getItem('dailyChallengeStreak') || '0');
        const lastCompleted = localStorage.getItem('lastDailyChallengeDate');
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Reset streak if more than 1 day has passed
        if (lastCompleted && lastCompleted !== yesterday.toDateString() && lastCompleted !== new Date().toDateString()) {
            localStorage.setItem('dailyChallengeStreak', '0');
            return 0;
        }

        return streak;
    }

    function completeChallenge(challengeId) {
        const updatedChallenges = challenges.map(challenge => {
            if (challenge.id === challengeId && !challenge.completed) {
                const newProgress = Math.min(challenge.progress + 1, challenge.target);
                const completed = newProgress >= challenge.target;

                if (completed && !challenge.completed) {
                    // Award XP
                    awardXP(challenge.xpReward, `Daily Challenge: ${challenge.title}`);

                    // Show notification
                    showNotification(`✅ Challenge Complete! +${challenge.xpReward} XP`);
                }

                return { ...challenge, progress: newProgress, completed };
            }
            return challenge;
        });

        setChallenges(updatedChallenges);
        localStorage.setItem('dailyChallenges', JSON.stringify(updatedChallenges));

        // Check if all challenges completed
        if (updatedChallenges.every(c => c.completed)) {
            completeAllChallenges();
        }
    }

    function completeAllChallenges() {
        const today = new Date().toDateString();
        const lastCompleted = localStorage.getItem('lastDailyChallengeDate');
        const newStreak = lastCompleted === new Date(Date.now() - 86400000).toDateString() ? streak + 1 : 1;

        setStreak(newStreak);
        localStorage.setItem('dailyChallengeStreak', newStreak.toString());
        localStorage.setItem('lastDailyChallengeDate', today);

        // Bonus XP for completing all challenges
        awardXP(XP_REWARDS.DAILY_CHALLENGE, 'All Daily Challenges Complete!');

        // Streak bonuses
        if (newStreak === 3) {
            awardXP(XP_REWARDS.STREAK_BONUS_3, '3-Day Streak Bonus!');
        } else if (newStreak === 7) {
            awardXP(XP_REWARDS.STREAK_BONUS_7, '7-Day Streak Bonus!');
        } else if (newStreak === 30) {
            awardXP(XP_REWARDS.STREAK_BONUS_30, '30-Day Streak Bonus!');
        }

        showNotification(`🎉 All Challenges Complete! +${XP_REWARDS.DAILY_CHALLENGE} XP Bonus!`);
    }

    function showNotification(message) {
        // Simple notification - in production, use a toast library
        const event = new CustomEvent('notification', { detail: { message } });
        window.dispatchEvent(event);
    }

    const totalProgress = challenges.reduce((sum, c) => sum + c.progress, 0);
    const totalTarget = challenges.reduce((sum, c) => sum + c.target, 0);
    const overallProgress = (totalProgress / totalTarget) * 100;

    return (
        <div className="daily-challenges">
            <div className="challenges-header">
                <h2>🎯 Daily Challenges</h2>
                <div className="streak-display">
                    <span className="streak-icon">🔥</span>
                    <span className="streak-number">{streak}</span>
                    <span className="streak-label">Day Streak</span>
                </div>
            </div>

            <div className="overall-progress">
                <div className="progress-text">
                    Overall Progress: {totalProgress}/{totalTarget}
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${overallProgress}%` }}></div>
                </div>
            </div>

            <div className="challenges-grid">
                {challenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className={`challenge-card ${challenge.completed ? 'completed' : ''}`}
                    >
                        <div className="challenge-icon">{challenge.icon}</div>
                        <div className="challenge-content">
                            <h3>{challenge.title}</h3>
                            <p>{challenge.description}</p>

                            <div className="challenge-progress">
                                <div className="progress-bar-small">
                                    <div
                                        className="progress-fill-small"
                                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="progress-numbers">
                                    {challenge.progress}/{challenge.target}
                                </div>
                            </div>

                            <div className="challenge-footer">
                                <div className="xp-reward">
                                    <span className="xp-icon">⭐</span>
                                    <span className="xp-amount">{challenge.xpReward} XP</span>
                                </div>

                                {challenge.completed ? (
                                    <div className="completed-badge">✓ Complete</div>
                                ) : (
                                    <button
                                        className="btn-complete"
                                        onClick={() => completeChallenge(challenge.id)}
                                    >
                                        Mark Progress
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {challenges.every(c => c.completed) && (
                <div className="all-complete-banner">
                    <div className="banner-content">
                        <span className="banner-icon">🎉</span>
                        <div className="banner-text">
                            <h3>Amazing Work!</h3>
                            <p>All daily challenges completed! Come back tomorrow for new ones.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
