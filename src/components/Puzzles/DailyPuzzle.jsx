import { useState, useEffect } from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';
import { getDailyPuzzle } from '../../services/lichessApi';
import './DailyPuzzle.css';

export default function DailyPuzzle() {
    const [puzzle, setPuzzle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
    const [solved, setSolved] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        loadDailyPuzzle();
    }, []);

    async function loadDailyPuzzle() {
        try {
            setLoading(true);
            const data = await getDailyPuzzle();
            setPuzzle(data.puzzle);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load daily puzzle:', error);
            setLoading(false);
        }
    }

    function handleGameEnd(gameState) {
        // Check if user made correct moves
        if (puzzle && puzzle.solution) {
            const userMoves = gameState.history.slice(1); // Skip opponent's first move
            const correctMoves = puzzle.solution;

            if (userMoves.length >= correctMoves.length) {
                const isCorrect = correctMoves.every((move, index) =>
                    userMoves[index] && userMoves[index].san === move
                );

                if (isCorrect) {
                    setSolved(true);
                    updatePuzzleStreak(true);
                    awardXP(10);
                } else {
                    setAttempts(attempts + 1);
                    updatePuzzleStreak(false);
                }
            }
        }
    }

    function updatePuzzleStreak(success) {
        const currentStreak = parseInt(localStorage.getItem('puzzleStreak') || '0');
        if (success) {
            localStorage.setItem('puzzleStreak', (currentStreak + 1).toString());
        } else {
            localStorage.setItem('puzzleStreak', '0');
        }
    }

    function awardXP(amount) {
        const currentXP = parseInt(localStorage.getItem('userXP') || '0');
        localStorage.setItem('userXP', (currentXP + amount).toString());
    }

    function handleShowSolution() {
        setShowSolution(true);
    }

    if (loading) {
        return (
            <div className="daily-puzzle-container">
                <div className="puzzle-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading today's puzzle...</p>
                </div>
            </div>
        );
    }

    if (!puzzle) {
        return (
            <div className="daily-puzzle-container">
                <div className="puzzle-error">
                    <p>❌ Failed to load puzzle. Please refresh and try again.</p>
                    <button className="btn btn-refresh" onClick={loadDailyPuzzle}>
                        🔄 Reload Puzzle
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="daily-puzzle-container">
            <div className="puzzle-header">
                <h2>🧩 Daily Chess Puzzle</h2>
                <div className="puzzle-meta">
                    <span className="puzzle-rating">Rating: {puzzle.rating || 'Unknown'}</span>
                    <span className="puzzle-attempts">Attempts: {attempts}</span>
                </div>
            </div>

            <div className="puzzle-board">
                <ChessBoard
                    initialPosition={puzzle.fen}
                    onGameEnd={handleGameEnd}
                    boardOrientation={puzzle.fen.includes(' b ') ? 'black' : 'white'}
                />
            </div>

            {solved && (
                <div className="puzzle-success">
                    <div className="success-animation">
                        <span className="success-icon">🎉</span>
                        <h3>Puzzle Solved!</h3>
                        <p>+10 XP Earned</p>
                    </div>
                </div>
            )}

            {!solved && (
                <div className="puzzle-controls">
                    <button
                        className="btn btn-hint"
                        onClick={handleShowSolution}
                        disabled={showSolution}
                    >
                        💡 Show Solution
                    </button>
                </div>
            )}

            {showSolution && (
                <div className="puzzle-solution">
                    <h4>Solution:</h4>
                    <div className="solution-moves">
                        {puzzle.solution.map((move, index) => (
                            <span key={index} className="solution-move">
                                {index % 2 === 0 && <span className="move-num">{Math.floor(index / 2) + 1}.</span>}
                                {move}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
