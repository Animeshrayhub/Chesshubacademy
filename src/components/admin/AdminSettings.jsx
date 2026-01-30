import { useState } from 'react';
import './AdminSettings.css';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        siteName: 'ChessHub Academy',
        email: 'clubchess259@gmail.com',
        phone: '+91 7008665245',
        address: 'India',
        timezone: 'Asia/Kolkata',
        currency: 'INR',
        emailNotifications: true,
        smsNotifications: false,
        autoConfirm: false,
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleBackup = () => {
        const data = {
            bookings: JSON.parse(localStorage.getItem('demoBookings') || '[]'),
            settings: settings,
            timestamp: new Date().toISOString(),
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chesshub-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    };

    const handleRestore = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    if (data.bookings) {
                        localStorage.setItem('demoBookings', JSON.stringify(data.bookings));
                    }
                    if (data.settings) {
                        setSettings(data.settings);
                        localStorage.setItem('siteSettings', JSON.stringify(data.settings));
                    }
                    alert('Backup restored successfully!');
                } catch (error) {
                    alert('Invalid backup file');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="admin-settings">
            <h2>Settings & Configuration</h2>

            {/* General Settings */}
            <div className="glass-card settings-section">
                <h3>General Settings</h3>
                <div className="settings-grid">
                    <div className="form-group">
                        <label className="form-label">Site Name</label>
                        <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => handleChange('siteName', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            value={settings.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            value={settings.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Timezone</label>
                        <select
                            value={settings.timezone}
                            onChange={(e) => handleChange('timezone', e.target.value)}
                            className="form-input"
                        >
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                            <option value="America/New_York">America/New_York (EST)</option>
                            <option value="Europe/London">Europe/London (GMT)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Currency</label>
                        <select
                            value={settings.currency}
                            onChange={(e) => handleChange('currency', e.target.value)}
                            className="form-input"
                        >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-card settings-section">
                <h3>Notifications</h3>
                <div className="settings-list">
                    <div className="setting-item">
                        <div className="setting-info">
                            <div className="setting-title">Email Notifications</div>
                            <div className="setting-description">Receive email alerts for new bookings</div>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <div className="setting-title">SMS Notifications</div>
                            <div className="setting-description">Receive SMS alerts for new bookings</div>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={settings.smsNotifications}
                                onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <div className="setting-title">Auto-Confirm Bookings</div>
                            <div className="setting-description">Automatically confirm new demo bookings</div>
                        </div>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={settings.autoConfirm}
                                onChange={(e) => handleChange('autoConfirm', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Backup & Restore */}
            <div className="glass-card settings-section">
                <h3>Backup & Restore</h3>
                <div className="backup-actions">
                    <button onClick={handleBackup} className="btn btn-primary">
                        📥 Download Backup
                    </button>
                    <label className="btn btn-secondary">
                        📤 Restore Backup
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleRestore}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
                <p className="backup-note">
                    Backup includes all bookings and settings. Restore will overwrite current data.
                </p>
            </div>

            {/* Save Button */}
            <div className="settings-footer">
                <button onClick={handleSave} className="btn btn-primary btn-lg">
                    {saved ? '✓ Saved!' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
