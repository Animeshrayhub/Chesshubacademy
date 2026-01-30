import { useState, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import './ChessBoard.css';

export default function ChessBoard({
    initialPosition = 'start',
    boardOrientation = 'white',
    interactive = true,
    showNotation = true,
    onGameEnd,
    customStyles = {}
}) {
    const [game, setGame] = useState(() => new Chess(initialPosition === 'start' ? undefined : initialPosition));
    const [moveHistory, setMoveHistory] = useState([]);
    const [optionSquares, setOptionSquares] = useState({});
    const [moveFrom, setMoveFrom] = useState(null);

    // Make a move and update state
    function safeGameMutate(modify) {
        setGame((g) => {
            const update = new Chess(g.fen());
            modify(update);
            return update;
        });
    }

    // Get possible moves for a square
    function getMoveOptions(square) {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares = {};
        moves.forEach((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) && game.get(move.to).color !== game.get(square).color
                        ? 'radial-gradient(circle, rgba(255,0,0,0.4) 85%, transparent 85%)'
                        : 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 25%, transparent 25%)',
                borderRadius: '50%',
            };
        });
        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)',
        };
        setOptionSquares(newSquares);
        return true;
    }

    // Handle piece drop (drag and drop)
    function onDrop(sourceSquare, targetSquare, piece) {
        if (!interactive) return false;

        const gameCopy = new Chess(game.fen());
        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1]?.toLowerCase() ?? 'q',
        });

        // Illegal move
        if (move === null) return false;

        setGame(gameCopy);
        setMoveHistory(gameCopy.history({ verbose: true }));
        setOptionSquares({});
        setMoveFrom(null);

        // Check for game over
        if (gameCopy.isGameOver() && onGameEnd) {
            let result = 'Game Over';
            if (gameCopy.isCheckmate()) {
                result = `Checkmate! ${gameCopy.turn() === 'w' ? 'Black' : 'White'} wins!`;
            } else if (gameCopy.isDraw()) {
                result = 'Draw!';
            } else if (gameCopy.isStalemate()) {
                result = 'Stalemate!';
            }

            onGameEnd({
                pgn: gameCopy.pgn(),
                fen: gameCopy.fen(),
                result: result,
                history: gameCopy.history({ verbose: true })
            });
        }

        return true;
    }

    // Handle square click (click to move)
    function onSquareClick(square) {
        if (!interactive) return;

        // If clicking on the same square, deselect
        if (moveFrom === square) {
            setMoveFrom(null);
            setOptionSquares({});
            return;
        }

        // If a piece is already selected
        if (moveFrom) {
            const gameCopy = new Chess(game.fen());
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: 'q',
            });

            // Valid move
            if (move) {
                setGame(gameCopy);
                setMoveHistory(gameCopy.history({ verbose: true }));
                setMoveFrom(null);
                setOptionSquares({});

                // Check for game over
                if (gameCopy.isGameOver() && onGameEnd) {
                    let result = 'Game Over';
                    if (gameCopy.isCheckmate()) {
                        result = `Checkmate! ${gameCopy.turn() === 'w' ? 'Black' : 'White'} wins!`;
                    } else if (gameCopy.isDraw()) {
                        result = 'Draw!';
                    } else if (gameCopy.isStalemate()) {
                        result = 'Stalemate!';
                    }

                    onGameEnd({
                        pgn: gameCopy.pgn(),
                        fen: gameCopy.fen(),
                        result: result,
                        history: gameCopy.history({ verbose: true })
                    });
                }
                return;
            }
        }

        // No piece selected yet or invalid move - try to select a new piece
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) {
            setMoveFrom(square);
        } else {
            setMoveFrom(null);
        }
    }

    // Undo move
    function undoMove() {
        safeGameMutate((game) => {
            game.undo();
        });
        setMoveHistory(game.history({ verbose: true }));
        setOptionSquares({});
        setMoveFrom(null);
    }

    // Reset game
    function resetGame() {
        setGame(new Chess());
        setMoveHistory([]);
        setOptionSquares({});
        setMoveFrom(null);
    }

    const isGameOver = game.isGameOver();
    let gameResult = null;
    if (isGameOver) {
        if (game.isCheckmate()) {
            gameResult = `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`;
        } else if (game.isDraw()) {
            gameResult = 'Draw!';
        } else if (game.isStalemate()) {
            gameResult = 'Stalemate!';
        }
    }

    return (
        <div className="chess-board-container">
            <div className="chess-board-wrapper">
                <Chessboard
                    id="PlayableChessboard"
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    onSquareClick={onSquareClick}
                    boardOrientation={boardOrientation}
                    customBoardStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        ...customStyles
                    }}
                    customSquareStyles={optionSquares}
                    arePiecesDraggable={interactive}
                    showBoardNotation={showNotation}
                    animationDuration={200}
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

                {isGameOver && gameResult && (
                    <div className="game-result">
                        <div className="result-badge">{gameResult}</div>
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
