import { useState, useEffect } from 'react';
import './AdminBookings.css';

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedBookings, setSelectedBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [bookings, searchTerm, statusFilter]);

    const loadBookings = () => {
        const stored = JSON.parse(localStorage.getItem('demoBookings') || '[]');
        setBookings(stored.reverse());
    };

    const filterBookings = () => {
        let filtered = [...bookings];

        if (searchTerm) {
            filtered = filtered.filter(b =>
                b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.phone.includes(searchTerm)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(b => (b.status || 'pending') === statusFilter);
        }

        setFilteredBookings(filtered);
    };

    const updateBookingStatus = (id, newStatus) => {
        const updated = bookings.map(b =>
            b.id === id ? { ...b, status: newStatus } : b
        );
        setBookings(updated);
        localStorage.setItem('demoBookings', JSON.stringify(updated.reverse()));
    };

    const deleteBooking = (id) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            const updated = bookings.filter(b => b.id !== id);
            setBookings(updated);
            localStorage.setItem('demoBookings', JSON.stringify(updated.reverse()));
        }
    };

    const handleBulkAction = (action) => {
        if (selectedBookings.length === 0) {
            alert('Please select bookings first');
            return;
        }

        const updated = bookings.map(b =>
            selectedBookings.includes(b.id) ? { ...b, status: action } : b
        );
        setBookings(updated);
        localStorage.setItem('demoBookings', JSON.stringify(updated.reverse()));
        setSelectedBookings([]);
    };

    const toggleSelectBooking = (id) => {
        setSelectedBookings(prev =>
            prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
        );
    };

    const exportCSV = () => {
        const csv = [
            ['ID', 'Name', 'Email', 'Phone', 'Date', 'Time', 'Status', 'Message', 'Timestamp'],
            ...filteredBookings.map(b => [
                b.id,
                b.name,
                b.email,
                b.phone,
                b.preferredDate,
                b.preferredTime,
                b.status || 'pending',
                b.message || '',
                new Date(b.timestamp).toLocaleString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="admin-bookings">
            <div className="bookings-header">
                <h2>Bookings Management</h2>
                <button onClick={exportCSV} className="btn btn-primary">
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card filters-card">
                <div className="filters-row">
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="status-filter"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {selectedBookings.length > 0 && (
                        <div className="bulk-actions">
                            <button onClick={() => handleBulkAction('confirmed')} className="btn btn-secondary">
                                Confirm Selected
                            </button>
                            <button onClick={() => handleBulkAction('cancelled')} className="btn btn-secondary">
                                Cancel Selected
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bookings Table */}
            <div className="glass-card bookings-table-card">
                {filteredBookings.length === 0 ? (
                    <div className="empty-state">
                        <p>No bookings found</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="bookings-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedBookings(filteredBookings.map(b => b.id));
                                                } else {
                                                    setSelectedBookings([]);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Preferred Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedBookings.includes(booking.id)}
                                                onChange={() => toggleSelectBooking(booking.id)}
                                            />
                                        </td>
                                        <td>{booking.name}</td>
                                        <td>{booking.email}</td>
                                        <td>{booking.phone}</td>
                                        <td>{new Date(booking.preferredDate).toLocaleDateString()}</td>
                                        <td>{booking.preferredTime}</td>
                                        <td>
                                            <select
                                                value={booking.status || 'pending'}
                                                onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                                className={`status-select ${booking.status || 'pending'}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <a
                                                    href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="action-btn whatsapp"
                                                    title="WhatsApp"
                                                >
                                                    💬
                                                </a>
                                                <button
                                                    onClick={() => deleteBooking(booking.id)}
                                                    className="action-btn delete"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
