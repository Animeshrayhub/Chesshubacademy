import './Features.css';

export default function Features() {
    const features = [
        {
            icon: '👨‍🏫',
            title: 'Expert Coaches',
            description: 'Learn from FIDE-rated masters and international coaches with proven track records.'
        },
        {
            icon: '🎯',
            title: 'Personalized Learning',
            description: 'Custom training plans tailored to your skill level, goals, and learning pace.'
        },
        {
            icon: '💻',
            title: 'Interactive Classes',
            description: 'Live online sessions with real-time feedback and interactive chess boards.'
        },
        {
            icon: '🏆',
            title: 'Tournament Prep',
            description: 'Specialized training for competitive players preparing for tournaments.'
        },
        {
            icon: '📊',
            title: 'Progress Tracking',
            description: 'Advanced analytics and performance metrics to monitor your improvement.'
        },
        {
            icon: '🎓',
            title: 'Structured Curriculum',
            description: 'Comprehensive courses from beginner to advanced levels with clear milestones.'
        }
    ];

    return (
        <section id="features" className="section features-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="fade-in">Why Choose ChessHub Academy?</h2>
                    <p className="section-subtitle fade-in">
                        Everything you need to excel in chess, all in one place
                    </p>
                </div>

                <div className="grid grid-3 features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card feature-card fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
