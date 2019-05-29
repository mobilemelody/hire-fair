CREATE TABLE Applicant_User
(
	Username VARCHAR(40) NOT NULL,
	Password VARCHAR(40) NOT NULL,
	First VARCHAR(40) NOT NULL,
	Last VARCHAR(40) NOT NULL,
	Email VARCHAR(100) NOT NULL,
	PRIMARY KEY(Username),
	UNIQUE(Username)
);

INSERT INTO Applicant_User VALUES
('Elise.Hebert', '1234', 'Elise', 'Hebert', 'heberte@oregonstate.edu');