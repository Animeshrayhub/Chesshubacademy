import { useState, useEffect } from 'react';
import './AdminCoaches.css';

export default function AdminCoaches() {
    const [coaches, setCoaches] = useState([]);
    const [selectedCoach, setSelectedCoach] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: 'FM',
        rating: '',
        email: '',
        phone: '',
        specialization: '',
        experience: '',
        hourlyRate: '',
        availability: 'available',
        bio: '',
        achievements: '',
        languages: '',
        photo: ''
    });

    useEffect(() => {
        loadCoaches();
    }, []);

    const loadCoaches = () => {
        const stored = JSON.parse(localStorage.getItem('coaches') || '[]');
        if (stored.length === 0) {
            // Add sample coaches
            const sampleCoaches = [
                {
                    id: 1,
                    name: 'GM Rajesh Kumar',
                    title: 'GM',
                    rating: 2650,
                    email: 'rajesh@chesshub.com',
                    phone: '+91 9876543210',
                    specialization: 'Opening Theory, Endgames',
                    experience: '15 years',
                    hourlyRate: '₹2000',
                    availability: 'available',
                    students: 25,
                    totalHours: 1250,
                    rating_avg: 4.9,
                    bio: 'Grandmaster with 15 years of coaching experience. Specialized in opening preparation and endgame mastery.',
                    achievements: '2x National Champion, Asian Championship Bronze Medal',
                    languages: 'English, Hindi, Tamil',
                    photo: '👨‍🏫'
                },
                {
                    id: 2,
                    name: 'IM Priya Sharma',
                    title: 'IM',
                    rating: 2480,
                    email: 'priya@chesshub.com',
                    phone: '+91 9876543211',
                    specialization: 'Tactics, Middle Game',
                    experience: '10 years',
                    hourlyRate: '₹1500',
                    availability: 'available',
                    students: 20,
                    totalHours: 980,
                    rating_avg: 4.8,
                    bio: 'International Master specializing in tactical training and middle game strategies.',
                    achievements: 'Women\'s National Champion 2019, Commonwealth Games Silver',
                    languages: 'English, Hindi',
                    photo: '👩‍🏫'
                },
                {
                    id: 3,
                    name: 'FM Arjun Patel',
                    title: 'FM',
                    rating: 2350,
                    email: 'arjun@chesshub.com',
                    phone: '+91 9876543212',
                    specialization: 'Kids Training, Fundamentals',
                    experience: '8 years',
                    hourlyRate: '₹1200',
                    availability: 'busy',
                    students: 15,
                    totalHours: 750,
                    rating_avg: 4.9,
                    bio: 'FIDE Master with expertise in teaching young players. Patient and engaging teaching style.',
                    achievements: 'State Champion, Youth Coach of the Year 2022',
                    languages: 'English, Hindi, Gujarati',
                    photo: '🧑‍🏫'
                }
            ];
            localStorage.setItem('coaches', JSON.stringify(sampleCoaches));
            setCoaches(sampleCoaches);
        } else {
            setCoaches(stored);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddCoach = () => {
        const newCoach = {
            ...formData,
            id: Date.now(),
            students: 0,
            totalHours: 0,
            rating_avg: 5.0,
            photo: formData.photo || '👤'
        };

        const updated = [...coaches, newCoach];
        setCoaches(updated);
        localStorage.setItem('coaches', JSON.stringify(updated));
        setShowAddModal(false);
        resetForm();
    };

    const handleUpdateCoach = (id, updates) => {
        const updated = coaches.map(c => c.id === id ? { ...c, ...updates } : c);
        setCoaches(updated);
        localStorage.setItem('coaches', JSON.stringify(updated));
    };

    const handleDeleteCoach = (id) => {
        if (confirm('Are you sure you want to delete this coach?')) {
            const updated = coaches.filter(c => c.id !== id);
            setCoaches(updated);
            localStorage.setItem('coaches', JSON.stringify(updated));
            setSelectedCoach(null);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            title: 'FM',
            rating: '',
            email: '',
            phone: '',
            specialization: '',
            experience: '',
            hourlyRate: '',
            availability: 'available',
            bio: '',
            achievements: '',
            languages: '',
            photo: ''
        });
    };

    return (
        <div className="admin-coaches-page">
            <div className="coaches-header">
                <h2>Coach Management</h2>
                <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                    + Add Coach
                </button>
            </div>

            <div className="coaches-grid">
                {coaches.map((coach) => (
                    <div key={coach.id} className="glass-card coach-card" onClick={() => setSelectedCoach(coach)}>
                        <div className="coach-photo">{coach.photo}</div>

                        <div className="coach-info">
                            <div className="coach-name-title">
                                <h3>{coach.name}</h3>
                                <span className={`title-badge ${coach.title.toLowerCase()}`}>{coach.title}</span>
                            </div>

                            <div className="coach-rating-elo">
                                <span className="elo">ELO: {coach.rating}</span>
                                <span className="rating">⭐ {coach.rating_avg}/5</span>
                            </div>

                            <div className="coach-meta">
                                <div className="meta-item">
                                    <span className="icon">👥</span>
                                    <span>{coach.students} students</span>
                                </div>
                                <div className="meta-item">
                                    <span className="icon">⏱️</span>
                                    <span>{coach.totalHours}h taught</span>
                                </div>
                            </div>

                            <div className="coach-specialization">
                                {coach.specialization}
                            </div>

                            <div className={`availability-badge ${coach.availability}`}>
                                {coach.availability === 'available' ? '🟢 Available' : '🔴 Busy'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coach Detail Modal */}
            {selectedCoach && (
                <div className="modal-overlay" onClick={() => setSelectedCoach(null)}>
                    <div className="modal-content glass-card coach-detail-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedCoach(null)}>×</button>

                        <div className="coach-detail-header">
                            <div className="coach-photo-large">{selectedCoach.photo}</div>
                            <div className="coach-header-info">
                                <h2>{selectedCoach.name}</h2>
                                <span className={`title-badge ${selectedCoach.title.toLowerCase()}`}>{selectedCoach.title}</span>
                                <div className="coach-contact">
                                    <p>📧 {selectedCoach.email}</p>
                                    <p>📱 {selectedCoach.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="coach-detail-stats">
                            <div className="stat">
                                <div className="stat-value">{selectedCoach.rating}</div>
                                <div className="stat-label">FIDE Rating</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{selectedCoach.students}</div>
                                <div className="stat-label">Students</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{selectedCoach.totalHours}h</div>
                                <div className="stat-label">Hours Taught</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">{selectedCoach.rating_avg}/5</div>
                                <div className="stat-label">Rating</div>
                            </div>
                        </div>

                        <div className="coach-detail-section">
                            <h3>About</h3>
                            <p>{selectedCoach.bio}</p>
                        </div>

                        <div className="coach-detail-section">
                            <h3>Specialization</h3>
                            <p>{selectedCoach.specialization}</p>
                        </div>

                        <div className="coach-detail-section">
                            <h3>Achievements</h3>
                            <p>{selectedCoach.achievements}</p>
                        </div>

                        <div className="coach-detail-grid">
                            <div>
                                <h4>Experience</h4>
                                <p>{selectedCoach.experience}</p>
                            </div>
                            <div>
                                <h4>Hourly Rate</h4>
                                <p>{selectedCoach.hourlyRate}</p>
                            </div>
                            <div>
                                <h4>Languages</h4>
                                <p>{selectedCoach.languages}</p>
                            </div>
                            <div>
                                <h4>Availability</h4>
                                <select
                                    value={selectedCoach.availability}
                                    onChange={(e) => handleUpdateCoach(selectedCoach.id, { availability: e.target.value })}
                                    className="availability-select"
                                >
                                    <option value="available">Available</option>
                                    <option value="busy">Busy</option>
                                    <option value="on-leave">On Leave</option>
                                </select>
                            </div>
                        </div>

                        <div className="coach-detail-actions">
                            <button className="btn btn-secondary" onClick={() => alert('Edit functionality coming soon!')}>
                                Edit Profile
                            </button>
                            <button className="btn btn-secondary" onClick={() => alert('Schedule functionality coming soon!')}>
                                View Schedule
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDeleteCoach(selectedCoach.id)}>
                                Delete Coach
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Coach Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>

                        <h2>Add New Coach</h2>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="form-input"
                                    placeholder="Full name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <select
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="GM">GM - Grandmaster</option>
                                    <option value="IM">IM - International Master</option>
                                    <option value="FM">FM - FIDE Master</option>
                                    <option value="CM">CM - Candidate Master</option>
                                    <option value="NM">NM - National Master</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>FIDE Rating</label>
                                <input
                                    type="number"
                                    value={formData.rating}
                                    onChange={(e) => handleInputChange('rating', e.target.value)}
                                    className="form-input"
                                    placeholder="2400"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="form-input"
                                    placeholder="coach@chesshub.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="form-input"
                                    placeholder="+91 9876543210"
                                />
                            </div>

                            <div className="form-group">
                                <label>Hourly Rate</label>
                                <input
                                    type="text"
                                    value={formData.hourlyRate}
                                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                                    className="form-input"
                                    placeholder="₹1500"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Specialization</label>
                                <input
                                    type="text"
                                    value={formData.specialization}
                                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                                    className="form-input"
                                    placeholder="Opening Theory, Tactics, Endgames"
                                />
                            </div>

                            <div className="form-group">
                                <label>Experience</label>
                                <input
                                    type="text"
                                    value={formData.experience}
                                    onChange={(e) => handleInputChange('experience', e.target.value)}
                                    className="form-input"
                                    placeholder="10 years"
                                />
                            </div>

                            <div className="form-group">
                                <label>Languages</label>
                                <input
                                    type="text"
                                    value={formData.languages}
                                    onChange={(e) => handleInputChange('languages', e.target.value)}
                                    className="form-input"
                                    placeholder="English, Hindi"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    className="form-input"
                                    rows="3"
                                    placeholder="Brief description about the coach..."
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Achievements</label>
                                <textarea
                                    value={formData.achievements}
                                    onChange={(e) => handleInputChange('achievements', e.target.value)}
                                    className="form-input"
                                    rows="2"
                                    placeholder="Notable achievements and titles..."
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleAddCoach}>
                                Add Coach
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
