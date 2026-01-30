/**
 * Lichess API Service
 * 
 * This service handles all interactions with the Lichess API
 * Documentation: https://lichess.org/api
 */

const LICHESS_API_URL = import.meta.env.VITE_LICHESS_API_URL || 'https://lichess.org/api';
const LICHESS_API_TOKEN = import.meta.env.VITE_LICHESS_API_TOKEN;

/**
 * Base fetch wrapper for Lichess API calls
 */
async function lichessRequest(endpoint, options = {}) {
    const headers = {
        'Accept': 'application/json',
        ...options.headers,
    };

    // Add authorization if token is available
    if (LICHESS_API_TOKEN) {
        headers['Authorization'] = `Bearer ${LICHESS_API_TOKEN}`;
    }

    try {
        const response = await fetch(`${LICHESS_API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`Lichess API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Lichess API Request Failed:', error);
        throw error;
    }
}

// ============================================
// PUZZLE API
// ============================================

/**
 * Get daily puzzle
 * @returns {Promise<Object>} Puzzle data
 */
export async function getDailyPuzzle() {
    return await lichessRequest('/puzzle/daily');
}

/**
 * Get puzzle by rating
 * @param {number} rating - Target puzzle rating (800-2500)
 * @returns {Promise<Object>} Puzzle data
 */
export async function getPuzzleByRating(rating = 1500) {
    // Note: This requires authentication
    return await lichessRequest(`/puzzle/next?rating=${rating}`);
}

/**
 * Get puzzle activity for a user
 * @param {number} count - Number of puzzles to fetch
 * @returns {Promise<Array>} Array of puzzle activities
 */
export async function getPuzzleActivity(count = 10) {
    return await lichessRequest(`/puzzle/activity?max=${count}`);
}

// ============================================
// USER API
// ============================================

/**
 * Get user profile
 * @param {string} username - Lichess username
 * @returns {Promise<Object>} User profile data
 */
export async function getUserProfile(username) {
    return await lichessRequest(`/user/${username}`);
}

/**
 * Get user rating history
 * @param {string} username - Lichess username
 * @returns {Promise<Array>} Rating history for all game types
 */
export async function getUserRatingHistory(username) {
    return await lichessRequest(`/user/${username}/rating-history`);
}

/**
 * Get user current games
 * @param {string} username - Lichess username
 * @returns {Promise<Array>} Current ongoing games
 */
export async function getUserCurrentGames(username) {
    return await lichessRequest(`/api/user/${username}/current-game`);
}

// ============================================
// GAMES API
// ============================================

/**
 * Get user games
 * @param {string} username - Lichess username
 * @param {Object} options - Query options (max, rated, perfType, etc.)
 * @returns {Promise<Array>} Array of games
 */
export async function getUserGames(username, options = {}) {
    const params = new URLSearchParams({
        max: options.max || 10,
        rated: options.rated !== undefined ? options.rated : true,
        ...options
    });

    return await lichessRequest(`/games/user/${username}?${params}`);
}

/**
 * Export a single game in PGN format
 * @param {string} gameId - Game ID
 * @returns {Promise<string>} PGN data
 */
export async function exportGame(gameId) {
    const response = await fetch(`${LICHESS_API_URL}/game/export/${gameId}`, {
        headers: {
            'Accept': 'application/x-chess-pgn',
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to export game: ${response.statusText}`);
    }

    return await response.text();
}

// ============================================
// TOURNAMENT API
// ============================================

/**
 * Get tournament details
 * @param {string} tournamentId - Tournament ID
 * @returns {Promise<Object>} Tournament data
 */
export async function getTournament(tournamentId) {
    return await lichessRequest(`/tournament/${tournamentId}`);
}

/**
 * Get tournament results
 * @param {string} tournamentId - Tournament ID
 * @returns {Promise<Array>} Tournament standings
 */
export async function getTournamentResults(tournamentId) {
    return await lichessRequest(`/tournament/${tournamentId}/results`);
}

/**
 * Create a new tournament (requires auth and scope)
 * @param {Object} tournamentData - Tournament configuration
 * @returns {Promise<Object>} Created tournament data
 */
export async function createTournament(tournamentData) {
    return await lichessRequest('/tournament', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
    });
}

// ============================================
// OPENING EXPLORER API
// ============================================

/**
 * Get opening explorer data
 * @param {string} fen - FEN position
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Opening statistics
 */
export async function getOpeningExplorer(fen, options = {}) {
    const params = new URLSearchParams({
        fen,
        speeds: options.speeds || 'blitz,rapid,classical',
        ratings: options.ratings || '1600,1800,2000,2200,2500',
        ...options
    });

    return await lichessRequest(`/explorer/lichess?${params}`);
}

/**
 * Get master games opening data
 * @param {string} fen - FEN position
 * @returns {Promise<Object>} Master games statistics
 */
export async function getMasterGamesOpening(fen) {
    return await lichessRequest(`/master?fen=${encodeURIComponent(fen)}`);
}

// ============================================
// CHALLENGES API
// ============================================

/**
 * Challenge a user to a game (requires auth)
 * @param {string} username - Username to challenge
 * @param {Object} challengeData - Challenge parameters
 * @returns {Promise<Object>} Challenge data
 */
export async function challengeUser(username, challengeData) {
    return await lichessRequest(`/challenge/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(challengeData),
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if Lichess API is configured
 * @returns {boolean} True if API token is set
 */
export function isLichessConfigured() {
    return !!LICHESS_API_TOKEN;
}

/**
 * Get rating color class based on rating value
 * @param {number} rating - Chess rating
 * @returns {string} CSS class name
 */
export function getRatingClass(rating) {
    if (rating >= 2500) return 'rating-master';
    if (rating >= 2200) return 'rating-expert';
    if (rating >= 1800) return 'rating-advanced';
    if (rating >= 1400) return 'rating-intermediate';
    return 'rating-beginner';
}

/**
 * Format time control for display
 * @param {number} base - Base time in seconds
 * @param {number} increment - Increment in seconds
 * @returns {string} Formatted time control
 */
export function formatTimeControl(base, increment) {
    const minutes = Math.floor(base / 60);
    return increment > 0 ? `${minutes}+${increment}` : `${minutes}`;
}

export default {
    // Puzzles
    getDailyPuzzle,
    getPuzzleByRating,
    getPuzzleActivity,

    // Users
    getUserProfile,
    getUserRatingHistory,
    getUserCurrentGames,

    // Games
    getUserGames,
    exportGame,

    // Tournaments
    getTournament,
    getTournamentResults,
    createTournament,

    // Opening Explorer
    getOpeningExplorer,
    getMasterGamesOpening,

    // Challenges
    challengeUser,

    // Utils
    isLichessConfigured,
    getRatingClass,
    formatTimeControl,
};
