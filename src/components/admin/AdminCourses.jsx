import { useState } from 'react';
import './AdminCourses.css';

export default function AdminCourses() {
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "Beginner",
            level: "Level 1",
            duration: "8-12 Weeks",
            price: 4999,
            originalPrice: 5999,
            discount: 17,
            rating: 4.9,
            students: 312,
            icon: "♟️",
            color: "#8b5cf6",
            status: "active",
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
            price: 7999,
            originalPrice: 9999,
            discount: 20,
            rating: 4.8,
            students: 245,
            icon: "♞",
            color: "#3b82f6",
            status: "active",
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
            price: 12999,
            originalPrice: 15999,
            discount: 19,
            rating: 5.0,
            students: 189,
            icon: "♚",
            color: "#f59e0b",
            status: "active",
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
            price: 19999,
            originalPrice: 24999,
            discount: 20,
            rating: 5.0,
            students: 87,
            icon: "👑",
            color: "#ec4899",
            status: "active",
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
    ]);

    const [editingCourse, setEditingCourse] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleEdit = (course) => {
        setEditingCourse(course.id);
        setEditForm({ ...course });
    };

    const handleSave = () => {
        setCourses(courses.map(c => c.id === editingCourse ? editForm : c));
        setEditingCourse(null);
        // Here you would normally save to backend/database
        alert('Course updated successfully! (In production, this would save to database)');
    };

    const handleCancel = () => {
        setEditingCourse(null);
        setEditForm({});
    };

    const handleInputChange = (field, value) => {
        setEditForm({ ...editForm, [field]: value });
    };

    const toggleStatus = (courseId) => {
        setCourses(courses.map(c =>
            c.id === courseId
                ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
                : c
        ));
    };

    const calculateDiscount = (original, current) => {
        return Math.round(((original - current) / original) * 100);
    };

    return (
        <div className="admin-courses">
            <div className="admin-header-section">
                <h2>Course Management</h2>
                <p>Manage pricing, duration, and course details</p>
            </div>

            <div className="courses-stats">
                <div className="stat-card glass-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-info">
                        <div className="stat-value">{courses.length}</div>
                        <div className="stat-label">Total Courses</div>
                    </div>
                </div>
                <div className="stat-card glass-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <div className="stat-value">{courses.reduce((sum, c) => sum + c.students, 0)}</div>
                        <div className="stat-label">Total Students</div>
                    </div>
                </div>
                <div className="stat-card glass-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <div className="stat-value">₹{(courses.reduce((sum, c) => sum + (c.price * c.students), 0) / 1000).toFixed(0)}K</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                </div>
                <div className="stat-card glass-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-info">
                        <div className="stat-value">{(courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)}</div>
                        <div className="stat-label">Avg Rating</div>
                    </div>
                </div>
            </div>

            <div className="courses-table-container">
                {courses.map(course => (
                    <div key={course.id} className="course-management-card glass-card">
                        {editingCourse === course.id ? (
                            // Edit Mode
                            <div className="course-edit-form">
                                <div className="edit-header">
                                    <h3>Edit {course.title} Course</h3>
                                    <div className="edit-actions">
                                        <button onClick={handleSave} className="btn btn-primary btn-sm">
                                            💾 Save Changes
                                        </button>
                                        <button onClick={handleCancel} className="btn btn-secondary btn-sm">
                                            ✖️ Cancel
                                        </button>
                                    </div>
                                </div>

                                <div className="edit-form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Course Title</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editForm.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Level</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editForm.level}
                                            onChange={(e) => handleInputChange('level', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Duration</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editForm.duration}
                                            onChange={(e) => handleInputChange('duration', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Current Price (₹)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={editForm.price}
                                            onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Original Price (₹)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={editForm.originalPrice}
                                            onChange={(e) => handleInputChange('originalPrice', parseInt(e.target.value))}
                                        />
                                        <small style={{ color: 'var(--color-text-tertiary)' }}>
                                            Discount: {calculateDiscount(editForm.originalPrice, editForm.price)}%
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Students Enrolled</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={editForm.students}
                                            onChange={(e) => handleInputChange('students', parseInt(e.target.value))}
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-textarea"
                                            rows="3"
                                            value={editForm.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label className="form-label">Target Audience</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editForm.targetAudience}
                                            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // View Mode
                            <div className="course-view">
                                <div className="course-header">
                                    <div className="course-title-section">
                                        <span className="course-icon" style={{ color: course.color }}>{course.icon}</span>
                                        <div>
                                            <h3>{course.title}</h3>
                                            <span className="course-badge" style={{ background: `${course.color}20`, color: course.color }}>
                                                {course.level}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="course-actions">
                                        <button
                                            onClick={() => toggleStatus(course.id)}
                                            className={`status-toggle ${course.status}`}
                                        >
                                            {course.status === 'active' ? '✓ Active' : '✖ Inactive'}
                                        </button>
                                        <button onClick={() => handleEdit(course)} className="btn btn-primary btn-sm">
                                            ✏️ Edit
                                        </button>
                                    </div>
                                </div>

                                <div className="course-details-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Duration</span>
                                        <span className="detail-value">{course.duration}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Students</span>
                                        <span className="detail-value">{course.students}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Rating</span>
                                        <span className="detail-value">⭐ {course.rating}/5.0</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Target</span>
                                        <span className="detail-value">{course.targetAudience}</span>
                                    </div>
                                </div>

                                <div className="course-pricing">
                                    <div className="pricing-info">
                                        <div className="current-price">₹{course.price.toLocaleString()}</div>
                                        <div className="original-price">₹{course.originalPrice.toLocaleString()}</div>
                                        <div className="discount-badge">{course.discount}% OFF</div>
                                    </div>
                                    <div className="revenue-info">
                                        <span className="revenue-label">Total Revenue:</span>
                                        <span className="revenue-value">₹{(course.price * course.students).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
