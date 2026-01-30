import { useState, useEffect } from 'react';
import './PuzzleLeaderboard.css';

export default function PuzzleLeaderboard() {
    const [period, setPeriod] = useState('all-time');
    const [leaderboard, setLeaderboard] = useState([]);
    const [userRank, setUserRank] = useState(null);

    useEffect(() => {
        loadLeaderboard();
    }, [period]);

    function loadLeaderboard() {
        // Get all users' puzzle stats from localStorage
        // In production, this would be from a backend API
        const mockData = [
            { rank: 1, name: 'ChessMaster', score: 1250, streak: 45, avatar: '👑' },
            { rank: 2, name: 'TacticalGenius', score: 1180, streak: 32, avatar: '🔥' },
            { rank: 3, name: 'PuzzleKing', score: 1050, streak: 28, avatar: '⭐' },
            { rank: 4, name: 'StrategicMind', score: 980, streak: 21, avatar: '🎯' },
            { rank: 5, name: 'CheckmateQueen', score: 925, streak: 19, avatar: '👸' },
            { rank: 6, name: 'EndgameExpert', score: 890, streak: 17, avatar: '🏆' },
            { rank: 7, name: 'Opening Guru', score: 845, streak: 15, avatar: '📚' },
            { rank: 8, name: 'BlitzMaster', score: 800, streak: 12, avatar: '⚡' },
            { rank: 9, name: 'PatientPlayer', score: 775, streak: 10, avatar: '🧘' },
            { rank: 10, name: 'StudyHero', score: 750, streak: 8, avatar: '📖' }
        ];

        setLeaderboard(mockData);

        // Calculate user's rank based on their XP
        const userScore = parseInt(localStorage.getItem('userXP') || '0');
        const userStreakVal = parseInt(localStorage.getItem('puzzleStreak') || '0');

        if (userScore > 0) {
            const rank = mockData.filter(u => u.score > userScore).length + 1;
            setUserRank({
                rank,
                name: 'You',
                score: userScore,
                streak: userStreakVal,
                avatar: '🎮'
            });
        }
    }

    return (
        <div className="puzzle-leaderboard">
            <div className="leaderboard-header">
                <h2>🏆 Puzzle Leaderboard</h2>
                <div className="period-selector">
                    <button
                        className={`period-btn ${period === 'daily' ? 'active' : ''}`}
                        onClick={() => setPeriod('daily')}
                    >
                        Daily
                    </button>
                    <button
                        className={`period-btn ${period === 'weekly' ? 'active' : ''}`}
                        onClick={() => setPeriod('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className={`period-btn ${period === 'monthly' ? 'active' : ''}`}
                        onClick={() => setPeriod('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`period-btn ${period === 'all-time' ? 'active' : ''}`}
                        onClick={() => setPeriod('all-time')}
                    >
                        All Time
                    </button>
                </div>
            </div>

            <div className="leaderboard-table">
                <div className="table-header">
                    <div className="col-rank">Rank</div>
                    <div className="col-player">Player</div>
                    <div className="col-score">Score</div>
                    <div className="col-streak">Streak</div>
                </div>

                <div className="table-body">
                    {leaderboard.map((entry) => (
                        <div
                            key={entry.rank}
                            className={`table-row ${entry.rank <= 3 ? `top-${entry.rank}` : ''}`}
                        >
                            <div className="col-rank">
                                {entry.rank <= 3 ? (
                                    <span className="rank-medal">
                                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                                    </span>
                                ) : (
                                    <span className="rank-number">#{entry.rank}</span>
                                )}
                            </div>
                            <div className="col-player">
                                <span className="player-avatar">{entry.avatar}</span>
                                <span className="player-name">{entry.name}</span>
                            </div>
                            <div className="col-score">{entry.score.toLocaleString()}</div>
                            <div className="col-streak">
                                <span className="streak-badge">{entry.streak} 🔥</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {userRank && userRank.rank > 10 && (
                <div className="user-rank-card">
                    <div className="rank-label">Your Rank</div>
                    <div className="table-row user-row">
                        <div className="col-rank">
                            <span className="rank-number">#{userRank.rank}</span>
                        </div>
                        <div className="col-player">
                            <span className="player-avatar">{userRank.avatar}</span>
                            <span className="player-name">{userRank.name}</span>
                        </div>
                        <div className="col-score">{userRank.score.toLocaleString()}</div>
                        <div className="col-streak">
                            <span className="streak-badge">{userRank.streak} 🔥</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
