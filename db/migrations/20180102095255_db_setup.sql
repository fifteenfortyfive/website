-- +micrate Up
CREATE TABLE accounts (
    id integer PRIMARY KEY,
    username text NOT NULL,
    encrypted_password text NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    discord text,
    twitch text,
    twitter text,
    timezone text,
    admin boolean DEFAULT false
);

CREATE SEQUENCE accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE accounts_id_seq OWNED BY accounts.id;
ALTER TABLE ONLY accounts ALTER COLUMN id SET DEFAULT nextval('accounts_id_seq'::regclass);




CREATE TABLE commentator_submissions (
    id integer PRIMARY KEY,
    games text,
    experience text,
    availability text,
    account_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    revoked boolean DEFAULT false
);

CREATE SEQUENCE commentator_submission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE commentator_submission_id_seq OWNED BY commentator_submissions.id;
ALTER TABLE ONLY commentator_submissions ALTER COLUMN id SET DEFAULT nextval('commentator_submission_id_seq'::regclass);



CREATE TABLE runner_submissions (
    id integer PRIMARY KEY,
    max_games text,
    max_time text,
    pair text,
    avoid text,
    account_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    games_json text,
    revoked boolean DEFAULT false
);

CREATE SEQUENCE runner_submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE runner_submissions_id_seq OWNED BY runner_submissions.id;
ALTER TABLE ONLY runner_submissions ALTER COLUMN id SET DEFAULT nextval('runner_submissions_id_seq'::regclass);



CREATE TABLE sessions (
    id character varying NOT NULL,
    account_id integer,
    expires_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    active boolean DEFAULT false
);



ALTER TABLE ONLY commentator_submissions
    ADD CONSTRAINT commentator_submissions_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY runner_submissions
    ADD CONSTRAINT submissions_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;
