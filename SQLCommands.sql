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

CREATE TABLE Employer_User
(
 
	Username VARCHAR(40) NOT NULL,
	Password VARCHAR(40) NOT NULL,
	First VARCHAR(40) NOT NULL,
	Last VARCHAR(40) NOT NULL,
	Email VARCHAR(100) NOT NULL,
	CompanyName VARCHAR(40) NOT NULL,
	Department VARCHAR(40),
	Phone VARCHAR(20) NOT NULL,
	PRIMARY KEY(Username),
	UNIQUE(Username)
);


CREATE TABLE listing
(	listingID INT NOT NULL AUTO_INCREMENT, 
	internal bool NOT NULL,
	jobTitle VARCHAR(40) NOT NULL,
	location VARCHAR(40) NOT NULL,
	description VARCHAR(40) NOT NULL,
	salary VARCHAR(100) NOT NULL,
	email VARCHAR(40) NOT NULL,
	phone VARCHAR(40) NOT NULL,
	employerUserName VARCHAR (40) NOT NULL,
	numApplicants INT DEFAULT 0,
	deadline DATE NOT NULL,
	PRIMARY KEY(listingID),
	FOREIGN KEY(employerUserName) REFERENCES Employer_User(Username)
); 

CREATE TABLE requirement
(	reqID INT NOT NULL AUTO_INCREMENT, 
	reqType VARCHAR(40) NOT NULL,
	description VARCHAR(100) NOT NULL,
	weight INT NOT NULL,
	listingID INT NOT NULL,
	PRIMARY KEY(reqID),
	FOREIGN KEY(listingID) REFERENCES listing(listingID)
);





INSERT INTO Applicant_User VALUES
('Elise.Hebert', '1234', 'Elise', 'Hebert', 'heberte@oregonstate.edu'),
('Kyle.Hiebel', '1234', 'Kyle', 'Hiebel', 'hiebelky@oregonstate.edu'),
('Melody.Reebs', '1234', 'Melody', 'Reebs', 'reebsm@oregonstate.edu'),
('Kevin.Ohrlund', '1234', 'Kevin', 'Ohrlund', 'ohrlundk@oregonstate.edu'),
('Dougherty.Meghan', '1234', 'Meghan', 'Dougherty', 'dougherm@oregonstate.edu');

INSERT INTO Employer_User VALUES
('Elise.Hebert', '1234', 'Elise', 'Hebert', 'heberte@oregonstate.edu', 'OregonState', 'HR', '(555) 867-5309');

INSERT INTO listing (internal, jobTitle, location, description, salary, email, phone, employerUserName, numApplicants, deadline)VALUES
('0','Grunt', 'Here', 'just a job', '10000000', 'heberte@oregonstate.edu', '(555) 867-5309', 'Elise.Hebert', 1, "2019-6-2");


INSERT INTO listing (internal, jobTitle, location, description, salary, email, phone, employerUserName, numApplicants, deadline)VALUES
('1','Other', 'Here', 'just a job', '10000002', 'heberte@oregonstate.edu', '(555) 867-5309', 'Elise.Hebert', 4, "2019-8-10");


