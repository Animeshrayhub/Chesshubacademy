import { useState } from 'react';
import './StudentAchievements.css';

export default function StudentAchievements() {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const achievements = [
        {
            name: 'Arjun Sharma',
            age: 12,
            achievement: 'National Under-12 Champion',
            tournament: 'All India Chess Championship 2025',
            rating: 1850,
            image: '👑',
            details: 'Secured 1st position in the National Under-12 category with an impressive 8.5/9 score.'
        },
        {
            name: 'Priya Desai',
            age: 10,
            achievement: 'State Champion',
            tournament: 'Maharashtra State Chess Championship',
            rating: 1420,
            image: '🏆',
            details: 'Won the Under-10 girls category, defeating 45 participants from across the state.'
        },
        {
            name: 'Rohan Patel',
            age: 14,
            achievement: 'FIDE Master Candidate',
            tournament: 'International FIDE Rating Tournament',
            rating: 2180,
            image: '⭐',
            details: 'Achieved FIDE rating of 2180, on track to become a FIDE Master by age 15.'
        },
        {
            name: 'Ananya Kumar',
            age: 9,
            achievement: 'District Champion',
            tournament: 'Bangalore District Championship',
            rating: 1250,
            image: '🎯',
            details: 'Youngest player to win the district championship in the open category.'
        },
        {
            name: 'Vikram Singh',
            age: 13,
            achievement: 'International Bronze Medal',
            tournament: 'Asian Youth Chess Championship',
            rating: 1920,
            image: '🥉',
            details: 'Won bronze medal representing India in the Under-13 category at the Asian Championship.'
        },
        {
            name: 'Ishita Reddy',
            age: 11,
            achievement: 'Rapid Chess Champion',
            tournament: 'National Rapid Chess Championship',
            rating: 1680,
            image: '⚡',
            details: 'Undefeated champion in the Under-11 rapid chess category with 9/9 wins.'
        }
    ];

    return (
        <section className="section achievements-section" id="achievements">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-subtitle">Excellence in Action</h2>
                    <h1 className="section-title">
                        Our Students, <span className="text-gradient">Our Pride</span>
                    </h1>
                    <p className="section-description">
                        Meet our champions who have excelled in national and international tournaments.
                        Their success stories inspire the next generation of chess masters.
                    </p>
                </div>

                <div className="achievements-grid">
                    {achievements.map((student, index) => (
                        <div
                            key={index}
                            className="achievement-card glass-card"
                            onClick={() => setSelectedStudent(student)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="achievement-icon">{student.image}</div>

                            <div className="achievement-info">
                                <h3 className="achievement-name">{student.name}</h3>
                                <div className="achievement-age">Age: {student.age}</div>

                                <div className="achievement-title">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 1L10 6L15 6L11 9L13 14L8 11L3 14L5 9L1 6L6 6L8 1Z" fill="currentColor" />
                                    </svg>
                                    {student.achievement}
                                </div>

                                <div className="achievement-tournament">{student.tournament}</div>

                                <div className="achievement-rating">
                                    <span className="rating-label">Rating:</span>
                                    <span className="rating-value">{student.rating}</span>
                                </div>
                            </div>

                            <div className="achievement-hover">
                                <p>{student.details}</p>
                                <button className="btn-link">View Details →</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="achievements-cta">
                    <p>Ready to join our champions?</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Start Your Journey
                    </button>
                </div>
            </div>

            {selectedStudent && (
                <div className="achievement-modal" onClick={() => setSelectedStudent(null)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedStudent(null)}>×</button>

                        <div className="modal-icon">{selectedStudent.image}</div>
                        <h2>{selectedStudent.name}</h2>
                        <div className="modal-age">Age: {selectedStudent.age}</div>

                        <div className="modal-achievement">
                            <h3>{selectedStudent.achievement}</h3>
                            <p>{selectedStudent.tournament}</p>
                        </div>

                        <div className="modal-details">
                            <p>{selectedStudent.details}</p>
                        </div>

                        <div className="modal-rating">
                            <span>FIDE Rating</span>
                            <span className="rating-badge">{selectedStudent.rating}</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
