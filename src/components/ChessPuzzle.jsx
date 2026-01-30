import { useState, useEffect } from 'react';
import './ChessPuzzle.css';

export default function ChessPuzzle() {
    const [selectedLevel, setSelectedLevel] = useState('beginner');
    const [puzzleComplete, setPuzzleComplete] = useState(false);
    const [selectedSquare, setSelectedSquare] = useState(null);

    const puzzles = {
        beginner: {
            title: 'Beginner Puzzle',
            subtitle: 'Find the checkmate in 1 move',
            difficulty: 'Easy',
            board: [
                ['♜', '', '', '', '♚', '', '', '♜'],
                ['♟', '♟', '♟', '', '', '♟', '♟', '♟'],
                ['', '', '', '', '♟', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
                ['♖', '', '', '', '♔', '', '', '♖']
            ],
            solution: { from: '7,4', to: '0,4' },
            hint: 'Move your King to deliver checkmate!'
        },
        intermediate: {
            title: 'Intermediate Puzzle',
            subtitle: 'Checkmate in 2 moves',
            difficulty: 'Medium',
            board: [
                ['♜', '', '', '♛', '♚', '', '', '♜'],
                ['♟', '♟', '', '', '', '♟', '♟', '♟'],
                ['', '', '♟', '', '', '', '', ''],
                ['', '', '♗', '', '♟', '', '', ''],
                ['', '', '', '♙', '', '', '', ''],
                ['', '', '', '', '', '♘', '', ''],
                ['♙', '♙', '♙', '', '♙', '♙', '♙', '♙'],
                ['♖', '', '♗', '♕', '♔', '', '', '♖']
            ],
            solution: { from: '3,5', to: '1,6' },
            hint: 'Knight fork! Attack the King and Queen.'
        },
        advanced: {
            title: 'Advanced Puzzle',
            subtitle: 'Find the winning tactic',
            difficulty: 'Hard',
            board: [
                ['♜', '', '', '', '♚', '', '', '♜'],
                ['', '♟', '♟', '', '', '♟', '♛', '♟'],
                ['♟', '', '', '', '', '', '♟', ''],
                ['', '', '', '♟', '♟', '', '', ''],
                ['', '', '♗', '♙', '♙', '', '', ''],
                ['', '', '♘', '', '', '♘', '', ''],
                ['♙', '♙', '', '', '', '♙', '♙', '♙'],
                ['♖', '', '♗', '♕', '♔', '', '', '♖']
            ],
            solution: { from: '4,2', to: '6,0' },
            hint: 'Bishop sacrifice leads to a winning position!'
        },
        master: {
            title: 'Master Puzzle',
            subtitle: 'Checkmate in 3 moves',
            difficulty: 'Expert',
            board: [
                ['', '', '', '', '♚', '', '', '♜'],
                ['', '♟', '', '', '', '♟', '', '♟'],
                ['♟', '', '', '', '', '', '♛', ''],
                ['', '', '', '', '♟', '', '', ''],
                ['', '', '', '♙', '', '', '', ''],
                ['♙', '', '', '', '♗', '', '', ''],
                ['', '♙', '♙', '', '', '♙', '♙', '♙'],
                ['♖', '', '', '♕', '♔', '', '', '♖']
            ],
            solution: { from: '7,3', to: '0,3' },
            hint: 'Queen sacrifice! The path to victory.'
        }
    };

    const currentPuzzle = puzzles[selectedLevel];

    const handleSquareClick = (row, col) => {
        const squareId = `${row},${col}`;

        if (!selectedSquare) {
            if (currentPuzzle.board[row][col]) {
                setSelectedSquare(squareId);
            }
        } else {
            // Check if this is the correct solution
            if (selectedSquare === currentPuzzle.solution.from && squareId === currentPuzzle.solution.to) {
                setPuzzleComplete(true);
                setTimeout(() => {
                    setPuzzleComplete(false);
                    setSelectedSquare(null);
                }, 2000);
            } else {
                setSelectedSquare(null);
            }
        }
    };

    const resetPuzzle = () => {
        setSelectedSquare(null);
        setPuzzleComplete(false);
    };

    useEffect(() => {
        resetPuzzle();
    }, [selectedLevel]);

    return (
        <div className="chess-puzzle-container">
            <div className="puzzle-header">
                <div className="puzzle-title-section">
                    <h3>{currentPuzzle.title}</h3>
                    <p>{currentPuzzle.subtitle}</p>
                    <span className={`difficulty-badge ${selectedLevel}`}>
                        {currentPuzzle.difficulty}
                    </span>
                </div>

                <div className="level-selector">
                    <button
                        className={`level-btn ${selectedLevel === 'beginner' ? 'active' : ''}`}
                        onClick={() => setSelectedLevel('beginner')}
                    >
                        Beginner
                    </button>
                    <button
                        className={`level-btn ${selectedLevel === 'intermediate' ? 'active' : ''}`}
                        onClick={() => setSelectedLevel('intermediate')}
                    >
                        Intermediate
                    </button>
                    <button
                        className={`level-btn ${selectedLevel === 'advanced' ? 'active' : ''}`}
                        onClick={() => setSelectedLevel('advanced')}
                    >
                        Advanced
                    </button>
                    <button
                        className={`level-btn ${selectedLevel === 'master' ? 'active' : ''}`}
                        onClick={() => setSelectedLevel('master')}
                    >
                        Master
                    </button>
                </div>
            </div>

            <div className="puzzle-board-wrapper">
                <div className="chess-board">
                    {currentPuzzle.board.map((row, rowIndex) => (
                        <div key={rowIndex} className="board-row">
                            {row.map((piece, colIndex) => {
                                const squareId = `${rowIndex},${colIndex}`;
                                const isLight = (rowIndex + colIndex) % 2 === 0;
                                const isSelected = selectedSquare === squareId;
                                const isSolution = squareId === currentPuzzle.solution.to && selectedSquare === currentPuzzle.solution.from;

                                return (
                                    <div
                                        key={colIndex}
                                        className={`chess-square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isSolution ? 'target' : ''}`}
                                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                                    >
                                        <span className="chess-piece">{piece}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {puzzleComplete && (
                    <div className="puzzle-success">
                        <div className="success-icon">🎉</div>
                        <div className="success-text">Perfect! Puzzle Solved!</div>
                    </div>
                )}
            </div>

            <div className="puzzle-controls">
                <div className="puzzle-hint">
                    <span className="hint-icon">💡</span>
                    <span>{currentPuzzle.hint}</span>
                </div>
                <button className="reset-btn" onClick={resetPuzzle}>
                    🔄 Reset Puzzle
                </button>
            </div>
        </div>
    );
}
