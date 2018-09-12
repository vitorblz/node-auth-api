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
	'$2y$10$YBFS1g6ebVPIHx5psRrnSuCoKLI8plxYgkX4Wwc3HVR8yeneBLz9m', true);
