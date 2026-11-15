CREATE TABLE attachments (key TEXT PRIMARY KEY, content_type TEXT NOT NULL);
CREATE TABLE attachment_chunks (key TEXT NOT NULL REFERENCES attachments(key) ON DELETE CASCADE, part INTEGER NOT NULL, data BLOB NOT NULL, PRIMARY KEY(key, part));
CREATE INDEX rate_limits_expires ON rate_limits(expires_at);
