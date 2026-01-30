import { useState } from 'react';
import './AdminContent.css';

export default function AdminContent() {
    const [activeTab, setActiveTab] = useState('courses');

    // Sample data
    const courses = [
        { id: 1, title: 'Beginner Chess Fundamentals', students: 45, status: 'active' },
        { id: 2, title: 'Intermediate Tactics', students: 32, status: 'active' },
        { id: 3, title: 'Advanced Endgame Mastery', students: 18, status: 'active' },
    ];

    const coaches = [
        { id: 1, name: 'GM Rajesh Kumar', rating: 2650, students: 25, status: 'active' },
        { id: 2, name: 'IM Priya Sharma', rating: 2480, students: 20, status: 'active' },
        { id: 3, name: 'FM Arjun Patel', rating: 2350, students: 15, status: 'active' },
    ];

    const students = [
        { id: 1, name: 'Rahul Verma', rating: 1650, progress: 75, enrolled: '2024-01-15' },
        { id: 2, name: 'Sneha Reddy', rating: 1420, progress: 60, enrolled: '2024-02-01' },
        { id: 3, name: 'Amit Singh', rating: 1850, progress: 90, enrolled: '2023-12-10' },
    ];

    return (
        <div className="admin-content-page">
            <h2>Content Management</h2>

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courses')}
                >
                    📚 Courses
                </button>
                <button
                    className={`tab ${activeTab === 'coaches' ? 'active' : ''}`}
                    onClick={() => setActiveTab('coaches')}
                >
                    👨‍🏫 Coaches
                </button>
                <button
                    className={`tab ${activeTab === 'students' ? 'active' : ''}`}
                    onClick={() => setActiveTab('students')}
                >
                    👨‍🎓 Students
                </button>
            </div>

            {/* Courses Tab */}
            {activeTab === 'courses' && (
                <div className="tab-content">
                    <div className="content-header">
                        <h3>Course Catalog</h3>
                        <button className="btn btn-primary">+ Add Course</button>
                    </div>

                    <div className="content-grid">
                        {courses.map((course) => (
                            <div key={course.id} className="glass-card content-card">
                                <div className="card-header">
                                    <h4>{course.title}</h4>
                                    <span className={`status-badge ${course.status}`}>{course.status}</span>
                                </div>
                                <div className="card-body">
                                    <div className="card-stat">
                                        <span className="stat-icon">👥</span>
                                        <span>{course.students} Students</span>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-secondary btn-sm">Edit</button>
                                    <button className="btn btn-secondary btn-sm">View</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Coaches Tab */}
            {activeTab === 'coaches' && (
                <div className="tab-content">
                    <div className="content-header">
                        <h3>Coach Management</h3>
                        <button className="btn btn-primary">+ Add Coach</button>
                    </div>

                    <div className="content-grid">
                        {coaches.map((coach) => (
                            <div key={coach.id} className="glass-card content-card">
                                <div className="card-header">
                                    <h4>{coach.name}</h4>
                                    <span className={`status-badge ${coach.status}`}>{coach.status}</span>
                                </div>
                                <div className="card-body">
                                    <div className="card-stat">
                                        <span className="stat-icon">⭐</span>
                                        <span>Rating: {coach.rating}</span>
                                    </div>
                                    <div className="card-stat">
                                        <span className="stat-icon">👥</span>
                                        <span>{coach.students} Students</span>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-secondary btn-sm">Edit</button>
                                    <button className="btn btn-secondary btn-sm">Schedule</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
                <div className="tab-content">
                    <div className="content-header">
                        <h3>Student Profiles</h3>
                        <button className="btn btn-primary">+ Add Student</button>
                    </div>

                    <div className="glass-card">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Progress</th>
                                    <th>Enrolled</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.rating}</td>
                                        <td>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${student.progress}%` }}></div>
                                                <span className="progress-text">{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td>{new Date(student.enrolled).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-secondary btn-sm">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
