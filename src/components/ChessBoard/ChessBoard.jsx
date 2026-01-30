import { useState, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import useChessGame from '../../hooks/useChessGame';
import './ChessBoard.css';

export default function ChessBoard({
    initialPosition = 'start',
    boardOrientation = 'white',
    interactive = true,
    showNotation = true,
    onGameEnd,
    customStyles = {}
}) {
    const {
        position,
        moveHistory,
        isGameOver,
        result,
        makeMove,
        getLegalMoves,
        undoMove,
        resetGame,
        getGameState
    } = useChessGame(initialPosition);

    const [selectedSquare, setSelectedSquare] = useState(null);
    const [legalMoves, setLegalMoves] = useState([]);
    const [moveFrom, setMoveFrom] = useState('');
    const [moveTo, setMoveTo] = useState(null);
    const [optionSquares, setOptionSquares] = useState({});

    /**
     * Handle piece drop on board
     */
    function onDrop(sourceSquare, targetSquare) {
        if (!interactive) return false;

        const move = makeMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // Always promote to queen for now
        });

        // If move was successful
        if (move) {
            setSelectedSquare(null);
            setLegalMoves([]);
            setOptionSquares({});

            // Check if game ended
            if (isGameOver && onGameEnd) {
                const gameState = getGameState();
                onGameEnd(gameState);
            }

            return true;
        }

        return false;
    }

    /**
     * Handle square click for move selection
     */
    function onSquareClick(square) {
        if (!interactive) return;

        // If no square selected, select this square
        if (!selectedSquare) {
            const moves = getLegalMoves(square);
            if (moves.length > 0) {
                setSelectedSquare(square);
                setLegalMoves(moves);

                // Highlight legal move squares
                const squares = {};
                moves.forEach(move => {
                    squares[move] = {
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 25%, transparent 25%)',
                        borderRadius: '50%'
                    };
                });
                setOptionSquares(squares);
            }
        }
        // If square already selected
        else {
            // Try to make move to clicked square
            const move = makeMove({
                from: selectedSquare,
                to: square,
                promotion: 'q'
            });

            if (move) {
                setSelectedSquare(null);
                setLegalMoves([]);
                setOptionSquares({});

                if (isGameOver && onGameEnd) {
                    const gameState = getGameState();
                    onGameEnd(gameState);
                }
            } else {
                // Check if clicking on own piece to select it
                const moves = getLegalMoves(square);
                if (moves.length > 0) {
                    setSelectedSquare(square);
                    setLegalMoves(moves);

                    const squares = {};
                    moves.forEach(move => {
                        squares[move] = {
                            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 25%, transparent 25%)',
                            borderRadius: '50%'
                        };
                    });
                    setOptionSquares(squares);
                } else {
                    setSelectedSquare(null);
                    setLegalMoves([]);
                    setOptionSquares({});
                }
            }
        }
    }

    /**
     * Handle right-click for drawing arrows (future feature)
     */
    function onSquareRightClick(square) {
        // Future: Drawing arrows and circles
        console.log('Right click on:', square);
    }

    return (
        <div className="chess-board-container">
            <div className="chess-board-wrapper">
                <Chessboard
                    position={position}
                    onPieceDrop={onDrop}
                    onSquareClick={onSquareClick}
                    onSquareRightClick={onSquareRightClick}
                    boardOrientation={boardOrientation}
                    customBoardStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        ...customStyles
                    }}
                    customSquareStyles={{
                        ...optionSquares,
                        ...(selectedSquare && {
                            [selectedSquare]: {
                                background: 'rgba(255, 255, 0, 0.4)'
                            }
                        })
                    }}
                    arePiecesDraggable={interactive}
                    showBoardNotation={showNotation}
                />
            </div>

            <div className="chess-controls">
                <button
                    className="chess-btn chess-btn-undo"
                    onClick={undoMove}
                    disabled={moveHistory.length === 0}
                >
                    ↶ Undo
                </button>

                <button
                    className="chess-btn chess-btn-reset"
                    onClick={resetGame}
                >
                    ⟲ Reset
                </button>

                {isGameOver && result && (
                    <div className="game-result">
                        <div className="result-badge">{result}</div>
                    </div>
                )}
            </div>

            <div className="move-history">
                <h4>Moves</h4>
                <div className="moves-list">
                    {moveHistory.map((move, index) => (
                        <span key={index} className="move-item">
                            {index % 2 === 0 && <span className="move-number">{Math.floor(index / 2) + 1}.</span>}
                            <span className="move-notation">{move.san}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
