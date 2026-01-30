import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import AdminBookings from './admin/AdminBookings';
import AdminCourses from './admin/AdminCourses';
import AdminCoaches from './admin/AdminCoaches';
import AdminContent from './admin/AdminContent';
import AdminSettings from './admin/AdminSettings';
import './AdminView.css';

function AdminLogin({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const ADMIN_PASSWORD = 'Chesshub7008';

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            onLogin();
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    return (
        <div className="admin-login">
            <div className="glass-card login-card">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Enter admin password"
                            autoFocus
                        />
                        {error && <span className="error-message">{error}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

function AdminSidebar() {
    const location = useLocation();

    const navItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/bookings', icon: '📅', label: 'Bookings' },
        { path: '/admin/courses', icon: '📚', label: 'Courses' },
        { path: '/admin/coaches', icon: '👨‍🏫', label: 'Coaches' },
        { path: '/admin/content', icon: '📝', label: 'Content' },
        { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <h2>ChessHub Admin</h2>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

function AdminLayout({ children, onLogout }) {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <header className="admin-header">
                    <h1>Admin Panel</h1>
                    <button onClick={onLogout} className="btn btn-secondary">
                        Logout
                    </button>
                </header>
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminView() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('adminAuth') === 'true';
    });

    const handleLogin = () => {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
    };

    if (!isAuthenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return (
        <Router>
            <AdminLayout onLogout={handleLogout}>
                <Routes>
                    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/bookings" element={<AdminBookings />} />
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/coaches" element={<AdminCoaches />} />
                    <Route path="/admin/content" element={<AdminContent />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                </Routes>
            </AdminLayout>
        </Router>
    );
}
