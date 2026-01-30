import { useState } from 'react';
import './CoursesPreview.css';

export default function CoursesPreview() {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const courses = [
        {
            id: 1,
            title: "Beginner",
            level: "Level 1",
            duration: "8-12 Weeks",
            price: "₹4,999",
            rating: 4.9,
            students: 312,
            icon: "♟️",
            color: "#8b5cf6",
            description: "Perfect for absolute beginners. Learn the fundamentals of chess from scratch with interactive lessons.",
            curriculum: [
                "Chess board setup and piece movements",
                "Basic rules and special moves",
                "Elementary tactics: Forks, Pins, Skewers",
                "Opening principles and development",
                "Basic checkmate patterns",
                "Simple endgame techniques"
            ],
            features: ["Live online classes", "Recorded sessions", "Practice puzzles", "Participation certificate"],
            targetAudience: "Ages 5+ | Rating 0-800"
        },
        {
            id: 2,
            title: "Intermediate",
            level: "Level 2",
            duration: "12-16 Weeks",
            price: "₹7,999",
            rating: 4.8,
            students: 245,
            icon: "♞",
            color: "#3b82f6",
            description: "Build strong fundamentals and develop competitive skills. For players with basic knowledge looking to advance.",
            curriculum: [
                "Advanced tactical patterns and combinations",
                "Positional understanding and pawn structures",
                "Middle game planning and strategy",
                "Opening repertoire development",
                "Endgame technique and theory",
                "Tournament preparation and psychology",
                "Weekly game analysis sessions"
            ],
            features: ["Expert coaching", "Tournament prep", "Opening database", "Performance certificate"],
            targetAudience: "Rating 800-1400"
        },
        {
            id: 3,
            title: "Advanced",
            level: "Level 3",
            duration: "16-20 Weeks",
            price: "₹12,999",
            rating: 5.0,
            students: 189,
            icon: "♚",
            color: "#f59e0b",
            description: "Competitive chess mastery. Advanced training for serious players aiming for titles and championships.",
            curriculum: [
                "Deep opening preparation with theory",
                "Complex strategic middle game plans",
                "Advanced endgame mastery and tablebase study",
                "Professional game analysis from masters",
                "Psychological warfare and time management",
                "Tournament strategy and preparation",
                "Title norm requirements and path"
            ],
            features: ["GM coaching", "Personalized prep", "Tournament support", "Advanced certificate"],
            targetAudience: "Rating 1400-1800"
        },
        {
            id: 4,
            title: "Master",
            level: "Level 4",
            duration: "24+ Weeks",
            price: "₹19,999",
            rating: 5.0,
            students: 87,
            icon: "👑",
            color: "#ec4899",
            description: "Elite-level training for aspiring grandmasters. Work one-on-one with titled players and GMs.",
            curriculum: [
                "Personalized opening repertoire with GM",
                "Master-level strategic concepts",
                "Advanced endgame positions and studies",
                "International tournament preparation",
                "Mental conditioning for elite play",
                "Title norm achievement strategy",
                "Professional career guidance",
                "Access to GM database and resources"
            ],
            features: ["1-on-1 GM sessions", "Custom prep", "Tournament travel support", "Master certificate"],
            targetAudience: "Rating 1800+ | Title aspirants"
        }
    ];

    const openModal = (course) => {
        setSelectedCourse(course);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedCourse(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="courses" className="section courses-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-subtitle">Our Training Programs</h2>
                    <h1 className="section-title fade-in">
                        Choose Your <span className="text-gradient">Learning Path</span>
                    </h1>
                    <p className="section-description fade-in">
                        From beginner to master, we have a structured curriculum designed to take your game to the next level.
                        Each program includes certified training, expert coaching, and comprehensive support.
                    </p>
                </div>

                <div className="courses-grid">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="glass-card course-card"
                            style={{ '--course-color': course.color }}
                        >
                            <div className="course-icon" style={{ color: course.color }}>
                                {course.icon}
                            </div>

                            <div className="course-header">
                                <h3>{course.title}</h3>
                                <span className="course-level" style={{ background: `${course.color}20`, color: course.color }}>
                                    {course.level}
                                </span>
                            </div>

                            <p className="course-description">{course.description}</p>

                            <div className="course-meta">
                                <div className="meta-item">
                                    <span className="meta-icon">⏱️</span>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-icon">👥</span>
                                    <span>{course.students} students</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-icon">⭐</span>
                                    <span>{course.rating}/5.0</span>
                                </div>
                            </div>

                            <div className="course-price">
                                <span className="price">{course.price}</span>
                            </div>

                            <div className="course-actions">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => openModal(course)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Book Demo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Course Modal */}
            {selectedCourse && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>

                        <div className="modal-header">
                            <div className="modal-icon" style={{ color: selectedCourse.color }}>
                                {selectedCourse.icon}
                            </div>
                            <h2>{selectedCourse.title}</h2>
                            <span className="course-level" style={{ background: `${selectedCourse.color}20`, color: selectedCourse.color }}>
                                {selectedCourse.level}
                            </span>
                        </div>

                        <p className="modal-description">{selectedCourse.description}</p>

                        <div className="modal-stats">
                            <div className="stat">
                                <div className="stat-value">{selectedCourse.duration}</div>
                                <div className="stat-label">Duration</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{selectedCourse.students}</div>
                                <div className="stat-label">Students</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{selectedCourse.rating}/5</div>
                                <div className="stat-label">Rating</div>
                            </div>
                        </div>

                        <div className="modal-section">
                            <h3>Curriculum</h3>
                            <ul className="curriculum-list">
                                {selectedCourse.curriculum.map((item, index) => (
                                    <li key={index}>
                                        <span className="check-icon">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h3>What's Included</h3>
                            <div className="features-grid">
                                {selectedCourse.features.map((feature, index) => (
                                    <div key={index} className="feature-badge">
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="modal-price">
                                <span className="price-label">Course Fee</span>
                                <span className="price-value">{selectedCourse.price}</span>
                            </div>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => {
                                    closeModal();
                                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Book Free Demo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
