-- +migrate up
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name text,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    owner_id integer REFERENCES accounts(id),
    avatar_object_id text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    custom_url text,
    description text,
    link text
);

-- +migrate down
DROP TABLE "public"."events";
