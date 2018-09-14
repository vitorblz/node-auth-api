create database auth;

CREATE TABLE auth.users (
	id MEDIUMINT NOT NULL AUTO_INCREMENT,
	login VARCHAR(150) NOT NULL,
	password CHAR(60),
	isAdmin BOOLEAN DEFAULT false,
    UNIQUE (login),
    PRIMARY KEY (id)
);

INSERT INTO auth.users(login, password, isAdmin) VALUES('admin',
	'$2b$10$NtXXw9hMHlrmkdlaFRCBbeXNwERnZ9tMPL2fr5x52B48fUYLFatrq', true);
