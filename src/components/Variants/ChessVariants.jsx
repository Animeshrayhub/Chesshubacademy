import { useState } from 'react';
import './ChessVariants.css';

const VARIANTS = [
    {
        id: 'chess960',
        name: 'Chess960 (Fischer Random)',
        icon: '🎲',
        description: 'Random starting position with pieces shuffled on the back rank',
        rules: 'Same rules as standard chess, but starting position is randomized',
        difficulty: 'Advanced',
    },
    {
        id: 'three-check',
        name: 'Three-Check Chess',
        icon: '✓✓✓',
        description: 'Win by checking your opponent three times',
        rules: 'First player to give check 3 times wins',
        difficulty: 'Beginner',
    },
    {
        id: 'king-of-the-hill',
        name: 'King of the Hill',
        icon: '👑',
        description: 'Move your king to the center to win',
        rules: 'Get your king to e4, e5, d4, or d5 to win',
        difficulty: 'Intermediate',
    },
    {
        id: 'crazyhouse',
        name: 'Crazyhouse',
        icon: '♻️',
        description: 'Captured pieces can be placed back on the board',
        rules: 'Any captured piece can be dropped back on the board',
        difficulty: 'Advanced',
    },
    {
        id: 'atomic',
        name: 'Atomic Chess',
        icon: '💥',
        description: 'Captures cause explosions affecting nearby pieces',
        rules: 'Captures explode, eliminating adjacent pieces (except pawns)',
        difficulty: 'Advanced',
    },
    {
        id: 'horde',
        name: 'Horde',
        icon: '🛡️',
        description: 'One side has only pawns, the other has normal pieces',
        rules: 'Black has all pieces, White has 36 pawns. White wins by checkmate',
        difficulty: 'Intermediate',
    }
];

export default function ChessVariants() {
    const [selectedVariant, setSelectedVariant] = useState(null);

    return (
        <div className="chess-variants">
            <div className="variants-header">
                <h2>♟️ Chess Variants</h2>
                <p>Explore different ways to play chess and master new strategies</p>
            </div>

            <div className="variants-grid">
                {VARIANTS.map((variant) => (
                    <div
                        key={variant.id}
                        className={`variant-card ${selectedVariant?.id === variant.id ? 'selected' : ''}`}
                        onClick={() => setSelectedVariant(variant)}
                    >
                        <div className="variant-icon">{variant.icon}</div>
                        <h3>{variant.name}</h3>
                        <p className="variant-description">{variant.description}</p>
                        <div className="variant-difficulty">
                            <span className={`difficulty-badge ${variant.difficulty.toLowerCase()}`}>
                                {variant.difficulty}
                            </span>
                        </div>
                        <button className="btn-play-variant">
                            Play {variant.name}
                        </button>
                    </div>
                ))}
            </div>

            {selectedVariant && (
                <div className="variant-details">
                    <div className="details-header">
                        <span className="details-icon">{selectedVariant.icon}</span>
                        <h3>{selectedVariant.name}</h3>
                    </div>
                    <div className="details-content">
                        <h4>Rules:</h4>
                        <p>{selectedVariant.rules}</p>
                        <div className="coming-soon-badge">
                            🚧 Full implementation coming soon! Board integration in progress.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
