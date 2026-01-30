import { useState, useEffect } from 'react';
import './CoachProfiles.css';

// Sample coaches data (admin can update these via admin panel)
const defaultCoaches = [
    {
        id: 1,
        name: 'GM Rajesh Kumar',
        title: 'GM',
        experience: '15 years',
        photo: null, // Will use initials if no photo
        specialization: 'Opening Theory'
    },
    {
        id: 2,
        name: 'IM Priya Sharma',
        title: 'IM',
        experience: '10 years',
        photo: null,
        specialization: 'Tactics'
    },
    {
        id: 3,
        name: 'FM Arjun Patel',
        title: 'FM',
        experience: '8 years',
        photo: null,
        specialization: 'Kids Training'
    },
    {
        id: 4,
        name: 'CM Sneha Reddy',
        title: 'CM',
        experience: '6 years',
        photo: null,
        specialization: 'Endgames'
    }
];

function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getTitleColor(title) {
    switch (title) {
        case 'GM': return '#ffd700'; // Gold
        case 'IM': return '#c0c0c0'; // Silver
        case 'FM': return '#cd7f32'; // Bronze
        case 'CM': return '#8b5cf6'; // Purple
        case 'NM': return '#3b82f6'; // Blue
        default: return '#a1a1aa';
    }
}

export default function CoachProfiles() {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        // Load coaches from localStorage or use defaults
        const stored = localStorage.getItem('coaches');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setCoaches(parsed.length > 0 ? parsed : defaultCoaches);
            } catch {
                setCoaches(defaultCoaches);
            }
        } else {
            setCoaches(defaultCoaches);
        }
    }, []);

    return (
        <section className="coach-profiles-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Meet Our Expert Coaches</h2>
                    <p className="section-subtitle fade-in">
                        Learn from FIDE-titled masters with proven track records
                    </p>
                </div>

                <div className="coaches-carousel">
                    {coaches.slice(0, 4).map((coach) => (
                        <div key={coach.id} className="coach-profile-card">
                            <div className="coach-avatar">
                                {coach.photo ? (
                                    <img src={coach.photo} alt={coach.name} />
                                ) : (
                                    <div className="coach-initials">
                                        {getInitials(coach.name)}
                                    </div>
                                )}
                                {coach.title && (
                                    <span
                                        className="coach-title-badge"
                                        style={{ backgroundColor: getTitleColor(coach.title) }}
                                    >
                                        {coach.title}
                                    </span>
                                )}
                            </div>
                            <h3 className="coach-name">{coach.name}</h3>
                            <p className="coach-experience">{coach.experience} experience</p>
                            <p className="coach-specialization">{coach.specialization}</p>
                        </div>
                    ))}
                </div>

                <div className="coaches-cta">
                    <p>All our coaches are certified and have extensive teaching experience</p>
                </div>
            </div>
        </section>
    );
}
