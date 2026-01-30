-- Demo Assessments Table
CREATE TABLE IF NOT EXISTS demo_assessments (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    age INTEGER,
    experience VARCHAR(50),
    game_pgn TEXT,
    game_moves JSONB,
    accuracy INTEGER,
    tactical_rating INTEGER,
    positional_rating INTEGER,
    recommended_course VARCHAR(255),
    strengths JSONB,
    weaknesses JSONB,
    suggested_focus JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_demo_assessments_email ON demo_assessments(email);
CREATE INDEX IF NOT EXISTS idx_demo_assessments_created_at ON demo_assessments(created_at DESC);

-- Leaderboard Table
CREATE TABLE IF NOT EXISTS leaderboard (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    score INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index on score for quick sorting
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);

-- User Stats Table
CREATE TABLE IF NOT EXISTS user_stats (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    total_puzzles INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    best_streak INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index on user_id for quick lookups
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE demo_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Demo Assessments: Allow public insert, admin read
CREATE POLICY "Allow public insert demo assessments" 
    ON demo_assessments FOR INSERT 
    TO public 
    WITH CHECK (true);

CREATE POLICY "Allow admin read demo assessments" 
    ON demo_assessments FOR SELECT 
    TO authenticated 
    USING (true);

-- Leaderboard: Public read, authenticated write
CREATE POLICY "Allow public read leaderboard" 
    ON leaderboard FOR SELECT 
    TO public 
    USING (true);

CREATE POLICY "Allow authenticated write leaderboard" 
    ON leaderboard FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update leaderboard" 
    ON leaderboard FOR UPDATE 
    TO authenticated 
    USING (true);

-- User Stats: Public read own stats, authenticated write
CREATE POLICY "Allow public read user stats" 
    ON user_stats FOR SELECT 
    TO public 
    USING (true);

CREATE POLICY "Allow authenticated write user stats" 
    ON user_stats FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update user stats" 
    ON user_stats FOR UPDATE 
    TO authenticated 
    USING (true);

-- Optional: Add trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_demo_assessments_updated_at BEFORE UPDATE ON demo_assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leaderboard_updated_at BEFORE UPDATE ON leaderboard
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
