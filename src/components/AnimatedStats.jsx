import { useState, useEffect, useRef } from 'react';
import './AnimatedStats.css';

export default function AnimatedStats() {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({
        students: 0,
        coaches: 0,
        hours: 0,
        rating: 0
    });

    const sectionRef = useRef(null);

    const finalValues = {
        students: 500,
        coaches: 50,
        hours: 10000,
        rating: 98
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutQuad = 1 - Math.pow(1 - progress, 3);

            setCounts({
                students: Math.floor(finalValues.students * easeOutQuad),
                coaches: Math.floor(finalValues.coaches * easeOutQuad),
                hours: Math.floor(finalValues.hours * easeOutQuad),
                rating: Math.floor(finalValues.rating * easeOutQuad)
            });

            if (currentStep >= steps) {
                clearInterval(interval);
                setCounts(finalValues);
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="section stats-section">
            <div className="container">
                <div className="stats-grid">
                    <div className="stat-card glass-card">
                        <div className="stat-icon">👨‍🎓</div>
                        <div className="stat-content">
                            <div className="stat-number">
                                {counts.students.toLocaleString()}+
                            </div>
                            <div className="stat-label">Happy Students</div>
                            <div className="stat-description">
                                Learning and growing with us
                            </div>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">👨‍🏫</div>
                        <div className="stat-content">
                            <div className="stat-number">
                                {counts.coaches}+
                            </div>
                            <div className="stat-label">Expert Coaches</div>
                            <div className="stat-description">
                                FIDE-rated professionals
                            </div>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-content">
                            <div className="stat-number">
                                {counts.hours.toLocaleString()}+
                            </div>
                            <div className="stat-label">Training Hours</div>
                            <div className="stat-description">
                                Of quality chess education
                            </div>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-content">
                            <div className="stat-number">
                                {counts.rating}%
                            </div>
                            <div className="stat-label">Success Rate</div>
                            <div className="stat-description">
                                Students achieving their goals
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
