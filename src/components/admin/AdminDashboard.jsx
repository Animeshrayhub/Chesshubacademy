import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        pending: 0,
        confirmed: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const storedBookings = JSON.parse(localStorage.getItem('demoBookings') || '[]');
        setBookings(storedBookings);

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const todayCount = storedBookings.filter(b => {
            const bookingDate = new Date(b.timestamp);
            return bookingDate >= today;
        }).length;

        const weekCount = storedBookings.filter(b => {
            const bookingDate = new Date(b.timestamp);
            return bookingDate >= weekAgo;
        }).length;

        const monthCount = storedBookings.filter(b => {
            const bookingDate = new Date(b.timestamp);
            return bookingDate >= monthAgo;
        }).length;

        setStats({
            total: storedBookings.length,
            today: todayCount,
            thisWeek: weekCount,
            thisMonth: monthCount,
            pending: storedBookings.filter(b => !b.status || b.status === 'pending').length,
            confirmed: storedBookings.filter(b => b.status === 'confirmed').length,
        });
    };

    // Chart data
    const bookingsOverTime = [
        { name: 'Mon', bookings: 4 },
        { name: 'Tue', bookings: 3 },
        { name: 'Wed', bookings: 7 },
        { name: 'Thu', bookings: 5 },
        { name: 'Fri', bookings: 8 },
        { name: 'Sat', bookings: 6 },
        { name: 'Sun', bookings: 2 },
    ];

    const statusData = [
        { name: 'Pending', value: stats.pending },
        { name: 'Confirmed', value: stats.confirmed },
    ];

    const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899', '#06b6d4'];

    const recentBookings = bookings.slice(0, 5);

    return (
        <div className="admin-dashboard">
            <h2>Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="glass-card stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total Bookings</div>
                    </div>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.today}</div>
                        <div className="stat-label">Today</div>
                    </div>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.thisWeek}</div>
                        <div className="stat-label">This Week</div>
                    </div>
                </div>

                <div className="glass-card stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.thisMonth}</div>
                        <div className="stat-label">This Month</div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                <div className="glass-card chart-card">
                    <h3>Bookings This Week</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bookingsOverTime}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#a1a1aa" />
                            <YAxis stroke="#a1a1aa" />
                            <Tooltip
                                contentStyle={{ background: '#1a1a24', border: '1px solid #333', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="bookings" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card chart-card">
                    <h3>Booking Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ background: '#1a1a24', border: '1px solid #333', borderRadius: '8px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card recent-activity">
                <h3>Recent Bookings</h3>
                {recentBookings.length === 0 ? (
                    <p className="empty-state">No bookings yet</p>
                ) : (
                    <div className="activity-list">
                        {recentBookings.map((booking) => (
                            <div key={booking.id} className="activity-item">
                                <div className="activity-icon">👤</div>
                                <div className="activity-info">
                                    <div className="activity-title">{booking.name}</div>
                                    <div className="activity-details">
                                        {booking.email} • {new Date(booking.timestamp).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="activity-status">
                                    <span className={`status-badge ${booking.status || 'pending'}`}>
                                        {booking.status || 'pending'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
