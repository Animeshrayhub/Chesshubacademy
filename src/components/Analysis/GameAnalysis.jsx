import { useState } from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';
import { awardXP } from '../../utils/XPSystem';
import './GameAnalysis.css';

export default function GameAnalysis() {
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [gameData, setGameData] = useState(null);

    async function analyzeGame(pgn, moves) {
        setAnalyzing(true);

        try {
            // Mock Stockfish analysis (in production, this would use stockfish.js)
            // Simulating AI evaluation
            await new Promise(resolve => setTimeout(resolve, 2000));

            const mockAnalysis = {
                overallAccuracy: Math.floor(Math.random() * 30) + 70, // 70-100%
                whiteAccuracy: Math.floor(Math.random() * 30) + 70,
                blackAccuracy: Math.floor(Math.random() * 30) + 70,
                bestMoves: Math.floor(moves.length * 0.6),
                goodMoves: Math.floor(moves.length * 0.25),
                inaccuracies: Math.floor(moves.length * 0.1),
                mistakes: Math.floor(moves.length * 0.03),
                blunders: Math.floor(moves.length * 0.02),
                moveAnalysis: moves.map((move, idx) => ({
                    moveNumber: Math.floor(idx / 2) + 1,
                    move: move.san,
                    evaluation: (Math.random() * 4 - 2).toFixed(2), // -2.00 to +2.00
                    classification: getRandomClassification(),
                    bestMove: Math.random() > 0.7 ? null : 'suggested move',
                })),
                openingName: 'Sicilian Defense',
                criticalMoments: [
                    { move: 12, description: 'Missed tactical opportunity' },
                    { move: 23, description: 'Excellent defensive move' },
                ]
            };

            setAnalysis(mockAnalysis);

            // Award XP for analyzing
            awardXP(25, 'Game Analysis Complete');

        } catch (error) {
            console.error('Analysis error:', error);
        } finally {
            setAnalyzing(false);
        }
    }

    function getRandomClassification() {
        const classifications = ['Best', 'Excellent', 'Good', 'Inaccuracy', 'Mistake', 'Blunder'];
        const weights = [0.2, 0.3, 0.3, 0.1, 0.07, 0.03];

        const random = Math.random();
        let cumulative = 0;

        for (let i = 0; i < weights.length; i++) {
            cumulative += weights[i];
            if (random < cumulative) return classifications[i];
        }

        return 'Good';
    }

    function handleGameEnd(gameState) {
        setGameData(gameState);
    }

    function startAnalysis() {
        if (!gameData || !gameData.history) {
            alert('Please play a game first!');
            return;
        }

        analyzeGame(gameData.pgn, gameData.history);
    }

    return (
        <div className="game-analysis">
            <div className="analysis-header">
                <h2>🤖 AI Game Analysis</h2>
                <p>Play a game and get detailed computer analysis powered by Stockfish</p>
            </div>

            <div className="analysis-content">
                <div className="board-section">
                    <ChessBoard
                        onGameEnd={handleGameEnd}
                        interactive={true}
                    />
                    <button
                        className="btn-analyze"
                        onClick={startAnalysis}
                        disabled={!gameData || analyzing}
                    >
                        {analyzing ? 'Analyzing...' : '🔍 Analyze Game'}
                    </button>
                </div>

                {analyzing && (
                    <div className="analyzing-loader">
                        <div className="loader-spinner"></div>
                        <p>Stockfish is analyzing your game...</p>
                    </div>
                )}

                {analysis && !analyzing && (
                    <div className="analysis-results">
                        <div className="accuracy-section">
                            <h3>📊 Accuracy Report</h3>
                            <div className="accuracy-bars">
                                <div className="accuracy-item">
                                    <label>Overall Accuracy</label>
                                    <div className="accuracy-bar">
                                        <div
                                            className="accuracy-fill"
                                            style={{ width: `${analysis.overallAccuracy}%` }}
                                        >
                                            {analysis.overallAccuracy}%
                                        </div>
                                    </div>
                                </div>
                                <div className="accuracy-stats">
                                    <div className="stat-item best">
                                        <span className="stat-label">Best Moves</span>
                                        <span className="stat-value">{analysis.bestMoves}</span>
                                    </div>
                                    <div className="stat-item good">
                                        <span className="stat-label">Good Moves</span>
                                        <span className="stat-value">{analysis.goodMoves}</span>
                                    </div>
                                    <div className="stat-item inaccuracy">
                                        <span className="stat-label">Inaccuracies</span>
                                        <span className="stat-value">{analysis.inaccuracies}</span>
                                    </div>
                                    <div className="stat-item mistake">
                                        <span className="stat-label">Mistakes</span>
                                        <span className="stat-value">{analysis.mistakes}</span>
                                    </div>
                                    <div className="stat-item blunder">
                                        <span className="stat-label">Blunders</span>
                                        <span className="stat-value">{analysis.blunders}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="critical-moments">
                            <h3>⚡ Critical Moments</h3>
                            {analysis.criticalMoments.map((moment, idx) => (
                                <div key={idx} className="moment-card">
                                    <span className="moment-move">Move {moment.move}</span>
                                    <span className="moment-desc">{moment.description}</span>
                                </div>
                            ))}
                        </div>

                        <div className="xp-reward">
                            ⭐ +25 XP earned for analyzing your game!
                        </div>
                    </div>
                )}
            </div>

            <div className="analysis-note">
                <strong>Note:</strong> This is a demo implementation. Full Stockfish integration will provide
                move-by-move analysis, alternative suggestions, and deep position evaluation.
            </div>
        </div>
    );
}
