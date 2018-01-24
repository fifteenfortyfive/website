-- +micrate Up
CREATE TABLE feature_flags (
    "id" serial,
    "name" text NOT NULL,
    "enabled" boolean NOT NULL DEFAULT 'false',
    PRIMARY KEY ("id")
);

INSERT INTO feature_flags (id, name, enabled) VALUES (1, 'signups', 'false');
