CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE reactAuth;

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_first_name VARCHAR(300) NOT NULL,
  user_last_name VARCHAR(300) NOT NULL,
  user_email VARCHAR(300) NOT NULL UNIQUE,
  user_password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users(user_first_name,user_last_name,user_email,user_password) VALUES ('toto','lamster','toto@email.com','mdp');
