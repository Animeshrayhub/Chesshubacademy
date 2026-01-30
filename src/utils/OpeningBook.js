/**
 * Opening Book Database
 * ECO (Encyclopedia of Chess Openings) code lookup
 */

export const OPENING_BOOK = {
    // Popular Openings
    'e4': { name: 'King\'s Pawn Opening', eco: 'B00', category: 'Open Game' },
    'e4 e5': { name: 'King\'s Pawn Game', eco: 'C20', category: 'Open Game' },
    'e4 e5 Nf3': { name: 'King\'s Knight Opening', eco: 'C40', category: 'Open Game' },
    'e4 e5 Nf3 Nc6': { name: 'King\'s Knight Opening', eco: 'C44', category: 'Open Game' },
    'e4 e5 Nf3 Nc6 Bb5': { name: 'Ruy Lopez', eco: 'C60', category: 'Open Game' },
    'e4 e5 Nf3 Nc6 Bc4': { name: 'Italian Game', eco: 'C50', category: 'Open Game' },
    'e4 e5 Nf3 Nc6 d4': { name: 'Scotch Game', eco: 'C45', category: 'Open Game' },
    'e4 e5 Nf3 Nf6': { name: 'Petrov\'s Defense', eco: 'C42', category: 'Open Game' },
    'e4 e5 Nf3 d6': { name: 'Philidor Defense', eco: 'C41', category: 'Open Game' },

    // Sicilian Defense
    'e4 c5': { name: 'Sicilian Defense', eco: 'B20', category: 'Semi-Open Game' },
    'e4 c5 Nf3': { name: 'Sicilian Defense', eco: 'B27', category: 'Semi-Open Game' },
    'e4 c5 Nf3 d6': { name: 'Sicilian Defense, Najdorf Variation', eco: 'B90', category: 'Semi-Open Game' },
    'e4 c5 Nf3 Nc6': { name: 'Sicilian Defense, Sveshnikov Variation', eco: 'B33', category: 'Semi-Open Game' },

    // French Defense
    'e4 e6': { name: 'French Defense', eco: 'C00', category: 'Semi-Open Game' },
    'e4 e6 d4': { name: 'French Defense', eco: 'C10', category: 'Semi-Open Game' },
    'e4 e6 d4 d5': { name: 'French Defense', eco: 'C11', category: 'Semi-Open Game' },

    // Caro-Kann
    'e4 c6': { name: 'Caro-Kann Defense', eco: 'B10', category: 'Semi-Open Game' },
    'e4 c6 d4': { name: 'Caro-Kann Defense', eco: 'B12', category: 'Semi-Open Game' },

    // Queen's Gambit
    'd4': { name: 'Queen\'s Pawn Opening', eco: 'D00', category: 'Closed Game' },
    'd4 d5': { name: 'Queen\'s Pawn Game', eco: 'D02', category: 'Closed Game' },
    'd4 d5 c4': { name: 'Queen\'s Gambit', eco: 'D06', category: 'Closed Game' },
    'd4 d5 c4 e6': { name: 'Queen\'s Gambit Declined', eco: 'D30', category: 'Closed Game' },
    'd4 d5 c4 c6': { name: 'Slav Defense', eco: 'D10', category: 'Closed Game' },
    'd4 d5 c4 dxc4': { name: 'Queen\'s Gambit Accepted', eco: 'D20', category: 'Closed Game' },

    // Indian Defenses
    'd4 Nf6': { name: 'Indian Defense', eco: 'E00', category: 'Indian Game' },
    'd4 Nf6 c4': { name: 'Indian Game', eco: 'E10', category: 'Indian Game' },
    'd4 Nf6 c4 e6': { name: 'Nimzo-Indian Defense', eco: 'E20', category: 'Indian Game' },
    'd4 Nf6 c4 g6': { name: 'King\'s Indian Defense', eco: 'E60', category: 'Indian Game' },
    'd4 Nf6 c4 c5': { name: 'Benoni Defense', eco: 'E60', category: 'Indian Game' },

    // English Opening
    'c4': { name: 'English Opening', eco: 'A10', category: 'Flank Opening' },
    'c4 e5': { name: 'English Opening, Reversed Sicilian', eco: 'A20', category: 'Flank Opening' },
    'c4 Nf6': { name: 'English Opening', eco: 'A15', category: 'Flank Opening' },

    // Reti Opening
    'Nf3': { name: 'Reti Opening', eco: 'A04', category: 'Flank Opening' },
    'Nf3 d5': { name: 'Reti Opening', eco: 'A09', category: 'Flank Opening' },
    'Nf3 Nf6': { name: 'Reti Opening', eco: 'A07', category: 'Flank Opening' },
};

/**
 * Get opening name from move history
 * @param {Array} moves - Array of moves in algebraic notation
 * @returns {Object} - Opening information or null
 */
export function identifyOpening(moves) {
    if (!moves || moves.length === 0) return null;

    // Try to match longest sequence first
    for (let i = moves.length; i > 0; i--) {
        const sequence = moves.slice(0, i).join(' ');
        if (OPENING_BOOK[sequence]) {
            return {
                ...OPENING_BOOK[sequence],
                moves: moves.slice(0, i),
                moveCount: i
            };
        }
    }

    return null;
}

/**
 * Get all openings in a category
 * @param {string} category - Category name
 * @returns {Array} - Array of openings
 */
export function getOpeningsByCategory(category) {
    return Object.entries(OPENING_BOOK)
        .filter(([_, opening]) => opening.category === category)
        .map(([moves, opening]) => ({ moves, ...opening }));
}

/**
 * Search openings by name
 * @param {string} query - Search query
 * @returns {Array} - Array of matching openings
 */
export function searchOpenings(query) {
    const lowerQuery = query.toLowerCase();
    return Object.entries(OPENING_BOOK)
        .filter(([_, opening]) => opening.name.toLowerCase().includes(lowerQuery))
        .map(([moves, opening]) => ({ moves, ...opening }));
}

/**
 * Get random opening for practice
 * @returns {Object} - Random opening
 */
export function getRandomOpening() {
    const openings = Object.entries(OPENING_BOOK);
    const random = openings[Math.floor(Math.random() * openings.length)];
    return { moves: random[0], ...random[1] };
}

export default {
    OPENING_BOOK,
    identifyOpening,
    getOpeningsByCategory,
    searchOpenings,
    getRandomOpening
};
