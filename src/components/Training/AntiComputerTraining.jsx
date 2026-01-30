import { useState } from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';
import './AntiComputerTraining.css';

const TRAINING_MODES = [
    {
        id: 'anti-engine',
        name: 'Anti-Engine Positions',
        icon: '🤖',
        description: 'Practice positions where computers struggle',
        difficulty: 'Advanced'
    },
    {
        id: 'fortress',
        name: 'Fortress Defense',
        icon: '🏰',
        description: 'Build impenetrable defensive structures',
        difficulty: 'Intermediate'
    },
    {
        id: 'zugzwang',
        name: 'Zugzwang Training',
        icon: '♟️',
        description: 'Master positions where any move worsens position',
        difficulty: 'Advanced'
    },
    {
        id: 'closed-positions',
        name: 'Closed Positions',
        icon: '🔒',
        description: 'Navigate complex closed structures',
        difficulty: 'Intermediate'
    }
];

export default function AntiComputerTraining() {
    const [selectedMode, setSelectedMode] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [score, setScore] = useState(0);
    const [completedExercises, setCompletedExercises] = useState(0);

    function startTraining(mode) {
        setSelectedMode(mode);
        loadNextPosition(mode);
    }

    function loadNextPosition(mode) {
        // Load specialized positions based on mode
        const positions = {
            'anti-engine': 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
            'fortress': '8/8/8/3k4/8/3K4/3P4/8 w - - 0 1',
            'zugzwang': '8/8/p7/Pk6/1P6/8/8/7K b - - 0 1',
            'closed-positions': 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1'
        };

        setCurrentPosition({
            fen: positions[mode.id],
            objective: getObjectiveForMode(mode.id),
            hint: getHintForMode(mode.id)
        });
    }

    function getObjectiveForMode(modeId) {
        const objectives = {
            'anti-engine': 'Find the move that creates maximum practical complications',
            'fortress': 'Set up an unbreakable defensive fortress',
            'zugzwang': 'Put your opponent in zugzwang',
            'closed-positions': 'Find the best plan in this closed position'
        };
        return objectives[modeId] || 'Complete the exercise';
    }

    function getHintForMode(modeId) {
        const hints = {
            'anti-engine': 'Look for moves that create chaos and imbalance',
            'fortress': 'Pawns and minor pieces can build strong fortresses',
            'zugzwang': 'Every move should worsen the opponent\'s position',
            'closed-positions': 'Focus on pawn breaks and piece maneuvering'
        };
        return hints[modeId] || 'Think carefully!';
    }

    function handleMoveAttempt() {
        // Simulate feedback
        setScore(score + 10);
        setCompletedExercises(completedExercises + 1);

        if (completedExercises + 1 >= 5) {
            alert('🎉 Training complete! You earned 50 XP!');
            setSelectedMode(null);
            setCompletedExercises(0);
        } else {
            loadNextPosition(selectedMode);
        }
    }

    return (
        <div className="anti-computer-training">
            {!selectedMode ? (
                <>
                    <div className="training-header">
                        <h2>🎯 Anti-Computer Training</h2>
                        <p>Learn to play positions that challenge even the strongest engines</p>
                    </div>

                    <div className="modes-grid">
                        {TRAINING_MODES.map((mode) => (
                            <div
                                key={mode.id}
                                className="mode-card"
                                onClick={() => startTraining(mode)}
                            >
                                <div className="mode-icon">{mode.icon}</div>
                                <h3>{mode.name}</h3>
                                <p>{mode.description}</p>
                                <div className={`difficulty-badge ${mode.difficulty.toLowerCase()}`}>
                                    {mode.difficulty}
                                </div>
                                <button className="btn-start-mode">
                                    Start Training →
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="training-benefits">
                        <h3>💡 Why Anti-Computer Training?</h3>
                        <ul>
                            <li>✓ Improve your practical playing strength</li>
                            <li>✓ Learn positions computers misunderstand</li>
                            <li>✓ Develop deep strategic understanding</li>
                            <li>✓ Prepare for engine-assisted opponents</li>
                        </ul>
                    </div>
                </>
            ) : (
                <div className="training-session">
                    <div className="session-header">
                        <button className="btn-back" onClick={() => setSelectedMode(null)}>
                            ← Back
                        </button>
                        <h3>{selectedMode.icon} {selectedMode.name}</h3>
                        <div className="session-score">
                            Score: {score} | Exercises: {completedExercises}/5
                        </div>
                    </div>

                    {currentPosition && (
                        <>
                            <div className="position-objective">
                                <strong>Objective:</strong> {currentPosition.objective}
                            </div>

                            <ChessBoard
                                initialPosition={currentPosition.fen}
                                interactive={true}
                            />

                            <div className="position-hint">
                                <strong>💡 Hint:</strong> {currentPosition.hint}
                            </div>

                            <button
                                className="btn-check-move"
                                onClick={handleMoveAttempt}
                            >
                                Check Solution & Continue
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
