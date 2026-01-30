import { useState } from 'react';
import './DemoBooking.css';

export default function DemoBooking() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        if (!formData.preferredDate) {
            newErrors.preferredDate = 'Preferred date is required';
        }

        if (!formData.preferredTime) {
            newErrors.preferredTime = 'Preferred time is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            // Save to localStorage
            const bookings = JSON.parse(localStorage.getItem('demoBookings') || '[]');
            const newBooking = {
                ...formData,
                id: Date.now(),
                timestamp: new Date().toISOString()
            };
            bookings.push(newBooking);
            localStorage.setItem('demoBookings', JSON.stringify(bookings));

            setStatus('success');

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    preferredDate: '',
                    preferredTime: '',
                    message: ''
                });
                setStatus('idle');
            }, 3000);
        }, 1000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <section id="booking" className="section booking-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Book Your Free Demo</h2>
                    <p className="section-subtitle fade-in">
                        Experience our world-class coaching firsthand. No commitment required.
                    </p>
                </div>

                <div className="booking-container">
                    <div className="glass-card booking-card">
                        {status === 'success' ? (
                            <div className="success-message fade-in">
                                <div className="success-icon">✓</div>
                                <h3>Booking Confirmed!</h3>
                                <p>Thank you for your interest. We'll contact you shortly to confirm your demo session.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="booking-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-input ${errors.name ? 'error' : ''}`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && <span className="error-message">{errors.name}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone" className="form-label">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`form-input ${errors.phone ? 'error' : ''}`}
                                            placeholder="+91 98765 43210"
                                        />
                                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="preferredDate" className="form-label">Preferred Date *</label>
                                        <input
                                            type="date"
                                            id="preferredDate"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleChange}
                                            className={`form-input ${errors.preferredDate ? 'error' : ''}`}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.preferredDate && <span className="error-message">{errors.preferredDate}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="preferredTime" className="form-label">Preferred Time *</label>
                                    <select
                                        id="preferredTime"
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        className={`form-input ${errors.preferredTime ? 'error' : ''}`}
                                    >
                                        <option value="">Select a time slot</option>
                                        <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                                        <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                                        <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                                        <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
                                        <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
                                        <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
                                        <option value="17:00-18:00">05:00 PM - 06:00 PM</option>
                                        <option value="18:00-19:00">06:00 PM - 07:00 PM</option>
                                    </select>
                                    {errors.preferredTime && <span className="error-message">{errors.preferredTime}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message (Optional)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="form-textarea"
                                        placeholder="Tell us about your chess experience and goals..."
                                        rows="4"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-submit"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <span className="spinner"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Book Free Demo
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="booking-info">
                        <div className="info-card glass-card">
                            <h3>What to Expect</h3>
                            <ul className="info-list">
                                <li>
                                    <span className="info-icon">📅</span>
                                    <span>30-minute personalized session</span>
                                </li>
                                <li>
                                    <span className="info-icon">🎯</span>
                                    <span>Skill assessment by expert coach</span>
                                </li>
                                <li>
                                    <span className="info-icon">📊</span>
                                    <span>Customized learning plan</span>
                                </li>
                                <li>
                                    <span className="info-icon">💡</span>
                                    <span>Q&A with our team</span>
                                </li>
                            </ul>
                        </div>

                        <div className="info-card glass-card">
                            <h3>Contact Us</h3>
                            <div className="contact-info">
                                <p>
                                    <strong>Email:</strong><br />
                                    clubchess259@gmail.com
                                </p>
                                <p>
                                    <strong>Phone:</strong><br />
                                    +91 7008665245
                                </p>
                                <p>
                                    <strong>Hours:</strong><br />
                                    Mon-Sat: 9:00 AM - 8:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
