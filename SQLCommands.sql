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
('Elise.Hebert', '1234', 'Elise', 'Hebert', 'heberte@oregonstate.edu'),
('Kyle.Hiebel', '1234', 'Kyle', 'Hiebel', 'hiebelky@oregonstate.edu'),
('Melody.Reebs', '1234', 'Melody', 'Reebs', 'reebsm@oregonstate.edu'),
('Kevin.Ohrlund', '1234', 'Kevin', 'Ohrlund', 'ohrlundk@oregonstate.edu'),
('Dougherty.Meghan', '1234', 'Meghan', 'Dougherty', 'dougherm@oregonstate.edu');