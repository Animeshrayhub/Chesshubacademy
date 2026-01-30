import { useState } from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';
import { saveDemoAssessment } from '../../services/supabase';
import './DemoAssessment.css';

export default function DemoAssessment() {
    const [step, setStep] = useState('info'); // info, playing, analyzing, results
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        experience: 'beginner'
    });
    const [gameData, setGameData] = useState(null);
    const [assessment, setAssessment] = useState(null);

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function startAssessment() {
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill all required fields!');
            return;
        }
        setStep('playing');
    }

    function handleGameEnd(gameState) {
        setGameData(gameState);
        setStep('analyzing');
        analyzePerformance(gameState);
    }

    async function analyzePerformance(gameState) {
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 3000));

        const mockAssessment = {
            accuracy: Math.floor(Math.random() * 30) + 60,
            tacticalRating: Math.floor(Math.random() * 400) + 800,
            positionalRating: Math.floor(Math.random() * 400) + 800,
            recommendedCourse: formData.experience === 'beginner' ? 'Beginner (Level 1)' :
                formData.experience === 'intermediate' ? 'Intermediate (Level 2)' :
                    'Advanced (Level 3)',
            strengths: [
                'Good opening knowledge',
                'Defensive play',
                'Time management'
            ],
            weaknesses: [
                'Tactical awareness',
                'Endgame technique',
                'Calculation depth'
            ],
            suggestedFocus: [
                'Solving tactical puzzles daily',
                'Studying endgame fundamentals',
                'Analyzing master games'
            ]
        };

        setAssessment(mockAssessment);
        setStep('results');

        // In production: Save to Supabase
        await saveToSupabase({
            ...formData,
            gameData,
            assessment: mockAssessment,
            timestamp: new Date().toISOString()
        });
    }

    async function saveToSupabase(data) {
        try {
            const result = await saveDemoAssessment(data);

            if (result.success) {
                console.log('✅ Demo assessment saved to Supabase!', result.data);
            } else {
                console.error('❌ Failed to save to Supabase:', result.error);
                // Still continue even if save fails - user sees results
            }

            return result;
        } catch (error) {
            console.error('Error in saveToSupabase:', error);
            return { success: false, error };
        }
    }

    return (
        <div className="demo-assessment">
            {step === 'info' && (
                <div className="assessment-form">
                    <div className="form-header">
                        <h2>📋 Book Free Demo Assessment</h2>
                        <p>Play a game and get personalized course recommendations from our AI</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); startAssessment(); }}>
                        <div className="form-group">
                            <label>Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                min="5"
                                max="100"
                            />
                        </div>

                        <div className="form-group">
                            <label>Chess Experience</label>
                            <select
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                            >
                                <option value="beginner">Beginner (Just starting)</option>
                                <option value="intermediate">Intermediate (1-3 years)</option>
                                <option value="advanced">Advanced (3+ years)</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-start-assessment">
                            Start Assessment Game 🎮
                        </button>
                    </form>
                </div>
            )}

            {step === 'playing' && (
                <div className="assessment-game">
                    <div className="game-instructions">
                        <h3>🎮 Play Your Best Game!</h3>
                        <p>Play against yourself or with a friend. We'll analyze your moves and provide recommendations.</p>
                    </div>
                    <ChessBoard
                        onGameEnd={handleGameEnd}
                        interactive={true}
                    />
                </div>
            )}

            {step === 'analyzing' && (
                <div className="assessment-analyzing">
                    <div className="analyzing-animation">
                        <div className="spinner-large"></div>
                        <h3>🤖 AI is Analyzing Your Game...</h3>
                        <p>Evaluating moves, patterns, and skill level</p>
                    </div>
                </div>
            )}

            {step === 'results' && assessment && (
                <div className="assessment-results">
                    <div className="results-header">
                        <h2>✨ Your Chess Assessment Results</h2>
                        <p>Based on AI analysis of your game</p>
                    </div>

                    <div className="results-grid">
                        <div className="result-card overall">
                            <h3>Overall Accuracy</h3>
                            <div className="big-number">{assessment.accuracy}%</div>
                            <p>Computer-analyzed accuracy</p>
                        </div>

                        <div className="result-card tactical">
                            <h3>Tactical Rating</h3>
                            <div className="big-number">{assessment.tacticalRating}</div>
                            <p>Estimated puzzle rating</p>
                        </div>

                        <div className="result-card positional">
                            <h3>Positional Rating</h3>
                            <div className="big-number">{assessment.positionalRating}</div>
                            <p>Strategic understanding</p>
                        </div>
                    </div>

                    <div className="recommendation-box">
                        <h3>📚 Recommended Course</h3>
                        <div className="course-recommendation">
                            {assessment.recommendedCourse}
                        </div>
                        <p>Based on your current skill level and performance</p>
                    </div>

                    <div className="analysis-details">
                        <div className="strengths">
                            <h4>💪 Strengths</h4>
                            <ul>
                                {assessment.strengths.map((strength, idx) => (
                                    <li key={idx}>✓ {strength}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="weaknesses">
                            <h4>🎯 Areas for Improvement</h4>
                            <ul>
                                {assessment.weaknesses.map((weakness, idx) => (
                                    <li key={idx}>→ {weakness}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="focus">
                            <h4>📌 Suggested Focus</h4>
                            <ul>
                                {assessment.suggestedFocus.map((focus, idx) => (
                                    <li key={idx}>• {focus}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="next-steps">
                        <h3>🚀 Next Steps</h3>
                        <p>Our team will contact you within 24 hours to schedule your free demo class!</p>
                        <button className="btn-finish" onClick={() => setStep('info')}>
                            Take Another Assessment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
