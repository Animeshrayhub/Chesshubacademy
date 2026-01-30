import { useState, useEffect, useRef } from 'react';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
    const [activeTab, setActiveTab] = useState('all');
    const sectionRef = useRef(null);
    const circle1Ref = useRef(null);
    const circle2Ref = useRef(null);
    const circle3Ref = useRef(null);

    // Parallax scrolling effect
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const sectionTop = sectionRef.current.offsetTop;
            const sectionHeight = sectionRef.current.offsetHeight;
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                const scrollProgress = (scrollY - sectionTop + windowHeight) / (sectionHeight + windowHeight);

                if (circle1Ref.current) {
                    const translateY1 = scrollProgress * 100;
                    circle1Ref.current.style.transform = `translateY(${translateY1}px)`;
                }

                if (circle2Ref.current) {
                    const translateY2 = scrollProgress * -80;
                    const translateX2 = scrollProgress * 50;
                    circle2Ref.current.style.transform = `translate(${translateX2}px, ${translateY2}px)`;
                }

                if (circle3Ref.current) {
                    const translateY3 = scrollProgress * 120;
                    const translateX3 = scrollProgress * -60;
                    circle3Ref.current.style.transform = `translate(${translateX3}px, ${translateY3}px)`;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            category: 'coaching',
            icon: '👨‍🏫',
            title: 'Grandmaster Mentorship',
            description: 'Learn from FIDE-rated Grandmasters and International Masters',
            stats: [
                { label: 'Active GMs', value: '15+' },
                { label: 'Avg Rating', value: '2500+' }
            ],
            color: '#8b5cf6'
        },
        {
            category: 'training',
            icon: '🤖',
            title: 'AI-Powered Analysis',
            description: 'Advanced engine analysis and personalized performance insights',
            stats: [
                { label: 'Games Analyzed', value: '1000+' },
                { label: 'Accuracy', value: '99.9%' }
            ],
            color: '#3b82f6'
        },
        {
            category: 'practice',
            icon: '🏆',
            title: 'Weekly Tournaments',
            description: 'Compete in regular tournaments and gain competitive experience',
            stats: [
                { label: 'Events/Year', value: '100+' },
                { label: 'Prize Pool', value: '₹50K' }
            ],
            color: '#f59e0b'
        },
        {
            category: 'training',
            icon: '💻',
            title: 'Interactive Platform',
            description: 'World-class online learning with live boards and puzzles',
            stats: [
                { label: 'Availability', value: '24/7' },
                { label: 'Uptime', value: '99.9%' }
            ],
            color: '#10b981'
        },
        {
            category: 'certification',
            icon: '📜',
            title: 'Certified Training',
            description: 'GM-signed certificates recognized globally',
            stats: [
                { label: 'Certified', value: '500+' },
                { label: 'FIDE Status', value: 'Recognized' }
            ],
            color: '#ec4899'
        },
        {
            category: 'coaching',
            icon: '🎯',
            title: 'Title Preparation',
            description: 'Specialized guidance for national and international titles',
            stats: [
                { label: 'Titles Won', value: '50+' },
                { label: 'Success Rate', value: '92%' }
            ],
            color: '#06b6d4'
        }
    ];

    const categories = [
        { id: 'all', label: 'All Features', icon: '✨' },
        { id: 'coaching', label: 'Coaching', icon: '👨‍🏫' },
        { id: 'training', label: 'Training', icon: '📚' },
        { id: 'practice', label: 'Practice', icon: '🏆' },
        { id: 'certification', label: 'Certification', icon: '📜' }
    ];

    const filteredFeatures = activeTab === 'all'
        ? features
        : features.filter(f => f.category === activeTab);

    return (
        <section className="section why-choose-section-modern" id="features" ref={sectionRef}>
            <div className="container">
                {/* Animated Background */}
                <div className="bg-decorations">
                    <div className="decoration-circle decoration-1" ref={circle1Ref}></div>
                    <div className="decoration-circle decoration-2" ref={circle2Ref}></div>
                    <div className="decoration-circle decoration-3" ref={circle3Ref}></div>
                </div>

                {/* Header */}
                <div className="modern-header">
                    <div className="header-badge">
                        <span className="pulse-dot"></span>
                        <span>Premium Training Platform</span>
                    </div>
                    <h1 className="modern-title">
                        Elite Chess Training,
                        <br />
                        <span className="gradient-text">Redefined</span>
                    </h1>
                    <p className="modern-subtitle">
                        Experience world-class coaching powered by technology, delivered by grandmasters
                    </p>
                </div>

                {/* Category Filter */}
                <div className="category-filter">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${activeTab === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            <span className="filter-icon">{cat.icon}</span>
                            <span className="filter-label">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="modern-features-grid">
                    {filteredFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="modern-feature-card"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                '--card-color': feature.color
                            }}
                        >
                            <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${feature.color}20, transparent)` }}></div>

                            <div className="card-header">
                                <div className="icon-container" style={{ background: `${feature.color}15` }}>
                                    <span className="feature-icon-modern">{feature.icon}</span>
                                </div>
                            </div>

                            <div className="card-body">
                                <h3 className="feature-title-modern">{feature.title}</h3>
                                <p className="feature-desc-modern">{feature.description}</p>
                            </div>

                            <div className="card-stats">
                                {feature.stats.map((stat, idx) => (
                                    <div key={idx} className="stat-item">
                                        <div className="stat-value">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="card-border" style={{ borderColor: feature.color }}></div>
                        </div>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat-block">
                        <div className="stat-number">500+</div>
                        <div className="stat-text">Active Students</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-block">
                        <div className="stat-number">15+</div>
                        <div className="stat-text">Grandmasters</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-block">
                        <div className="stat-number">98%</div>
                        <div className="stat-text">Success Rate</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-block">
                        <div className="stat-number">4.9★</div>
                        <div className="stat-text">Rating</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="modern-cta">
                    <h3 className="cta-title">Ready to elevate your game?</h3>
                    <p className="cta-text">Join hundreds of students training with world-class grandmasters</p>
                    <div className="cta-actions">
                        <button
                            className="btn-modern btn-modern-primary"
                            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <span>Start Free Trial</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="btn-modern btn-modern-secondary"
                            onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Programs
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
