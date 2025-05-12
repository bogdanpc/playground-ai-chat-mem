DO $$ BEGIN
    CREATE EXTENSION vector;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
CREATE TABLE IF NOT EXISTS embeddings (
    embedding_id UUID PRIMARY KEY,
    embedding vector(384),
    text TEXT,
    metadata JSON
);

CREATE TABLE IF NOT EXISTS language_model(
    id bigint NOT NULL,
    name VARCHAR,
    description VARCHAR,
    version VARCHAR(20),
    provider VARCHAR,
    primary key (id)
);

CREATE TABLE knowledge (
    id bigint NOT NULL,
    user_id bigint,
    name VARCHAR(255),
    description VARCHAR(255),
    metadata JSON,
    created_at timestamp,
    primary key (id));

CREATE SEQUENCE knowledge_seq
    START WITH 1
    INCREMENT BY 1;

INSERT INTO language_model(id, name, description, version, provider) VALUES(1, 'Mistral 7B', 'Mistral', '0.3', 'OLLAMA');
INSERT INTO language_model(id, name, description, version, provider) VALUES(2, 'Granite 3.3', 'Granite', '3.3', 'OLLAMA');
INSERT INTO language_model(id, name, description, version, provider) VALUES(3, 'Gemma3', 'Gemma', '3', 'OLLAMA');
