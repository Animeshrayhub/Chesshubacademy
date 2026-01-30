import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';

/**
 * Custom hook for managing chess game state and logic
 * @param {string} initialFen - Starting position in FEN notation
 * @returns {Object} Game state and methods
 */
export default function useChessGame(initialFen = 'start') {
    const [game] = useState(() => new Chess(initialFen === 'start' ? undefined : initialFen));
    const [position, setPosition] = useState(game.fen());
    const [moveHistory, setMoveHistory] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [result, setResult] = useState(null);

    /**
     * Make a move on the board
     * @param {Object} move - Move object {from: 'e2', to: 'e4'}
     * @returns {boolean} Success status
     */
    const makeMove = useCallback((move) => {
        try {
            const result = game.move(move);

            if (result) {
                setPosition(game.fen());
                setMoveHistory([...game.history({ verbose: true })]);

                // Check game over conditions
                if (game.isGameOver()) {
                    setIsGameOver(true);

                    if (game.isCheckmate()) {
                        setResult(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`);
                    } else if (game.isDraw()) {
                        setResult('Draw!');
                    } else if (game.isStalemate()) {
                        setResult('Stalemate!');
                    } else if (game.isThreefoldRepetition()) {
                        setResult('Draw by repetition!');
                    } else if (game.isInsufficientMaterial()) {
                        setResult('Draw by insufficient material!');
                    }
                }

                return true;
            }
            return false;
        } catch (error) {
            console.error('Invalid move:', error);
            return false;
        }
    }, [game]);

    /**
     * Get all legal moves for a square
     * @param {string} square - Square in algebraic notation (e.g., 'e2')
     * @returns {Array} Array of legal move squares
     */
    const getLegalMoves = useCallback((square) => {
        const moves = game.moves({ square, verbose: true });
        return moves.map(move => move.to);
    }, [game]);

    /**
     * Undo the last move
     */
    const undoMove = useCallback(() => {
        game.undo();
        setPosition(game.fen());
        setMoveHistory([...game.history({ verbose: true })]);
        setIsGameOver(false);
        setResult(null);
    }, [game]);

    /**
     * Reset the game to starting position
     */
    const resetGame = useCallback(() => {
        game.reset();
        setPosition(game.fen());
        setMoveHistory([]);
        setIsGameOver(false);
        setResult(null);
    }, [game]);

    /**
     * Load a position from FEN
     * @param {string} fen - Position in FEN notation
     */
    const loadPosition = useCallback((fen) => {
        game.load(fen);
        setPosition(game.fen());
        setMoveHistory([...game.history({ verbose: true })]);
        setIsGameOver(game.isGameOver());
    }, [game]);

    /**
     * Get current game state
     */
    const getGameState = useCallback(() => {
        return {
            pgn: game.pgn(),
            fen: game.fen(),
            turn: game.turn(),
            isCheck: game.isCheck(),
            isCheckmate: game.isCheckmate(),
            isDraw: game.isDraw(),
            isStalemate: game.isStalemate(),
            isGameOver: game.isGameOver(),
            history: game.history({ verbose: true })
        };
    }, [game]);

    return {
        game,
        position,
        moveHistory,
        isGameOver,
        result,
        makeMove,
        getLegalMoves,
        undoMove,
        resetGame,
        loadPosition,
        getGameState
    };
}
