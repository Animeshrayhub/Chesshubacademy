import { useState, useEffect } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="chess-pieces-animation">
                    <div className="chess-piece king">♔</div>
                    <div className="chess-piece queen">♕</div>
                    <div className="chess-piece rook">♖</div>
                    <div className="chess-piece bishop">♗</div>
                    <div className="chess-piece knight">♘</div>
                    <div className="chess-piece pawn">♙</div>
                </div>

                <h1 className="loading-title">ChessHub Academy</h1>
                <p className="loading-subtitle">Master Chess with Expert Coaching</p>

                <div className="loading-bar">
                    <div className="loading-progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="loading-percentage">{progress}%</div>
            </div>
        </div>
    );
}
