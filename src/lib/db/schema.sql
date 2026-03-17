-- Analytics events table
CREATE TABLE IF NOT EXISTS events (
  id          SERIAL PRIMARY KEY,
  session_id  VARCHAR(64) NOT NULL,
  visitor_id  VARCHAR(64) NOT NULL,
  variant     CHAR(1) NOT NULL,
  event_type  VARCHAR(32) NOT NULL,
  event_data  JSONB DEFAULT '{}',
  url         VARCHAR(512),
  referrer    VARCHAR(512),
  user_agent  VARCHAR(512),
  device_type VARCHAR(16),
  country     VARCHAR(2),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at);
CREATE INDEX IF NOT EXISTS idx_events_variant ON events (variant);
CREATE INDEX IF NOT EXISTS idx_events_type ON events (event_type);
CREATE INDEX IF NOT EXISTS idx_events_session ON events (session_id);
CREATE INDEX IF NOT EXISTS idx_events_visitor ON events (visitor_id);

-- Stripe conversion events
CREATE TABLE IF NOT EXISTS conversions (
  id              SERIAL PRIMARY KEY,
  stripe_event_id VARCHAR(128) UNIQUE NOT NULL,
  event_type      VARCHAR(64) NOT NULL,
  variant         CHAR(1),
  amount          NUMERIC(10,2),
  customer_email  VARCHAR(256),
  subscription_id VARCHAR(128),
  visitor_id      VARCHAR(64),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversions_created_at ON conversions (created_at);
CREATE INDEX IF NOT EXISTS idx_conversions_variant ON conversions (variant);

-- Aggregated daily stats for fast dashboard queries
CREATE TABLE IF NOT EXISTS daily_stats (
  id                SERIAL PRIMARY KEY,
  date              DATE NOT NULL,
  variant           CHAR(1) NOT NULL,
  pageviews         INTEGER DEFAULT 0,
  unique_visitors   INTEGER DEFAULT 0,
  cta_clicks        INTEGER DEFAULT 0,
  avg_scroll_depth  NUMERIC(5,2) DEFAULT 0,
  avg_time_on_page  INTEGER DEFAULT 0,
  conversions       INTEGER DEFAULT 0,
  UNIQUE(date, variant)
);
