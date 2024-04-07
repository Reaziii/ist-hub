-- Active: 1710972936505@@ist-linkedin.c1gqwxxyqcc1.ap-southeast-1.rds.amazonaws.com@null@ist_hub

create DATABASE ist_hub;

CREATE TABLE IF NOT EXISTS user(
    userid int NOT NULL AUTO_INCREMENT,
    fullname varchar(30) NOT NULL,
    department varchar(10) NOT NULL,
    batch int(3) NOT NULL,
    roll_no int(10) NOT NULL,
    phone varchar(11) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    photo varchar(100) NOT NULL,
    verified boolean,
    username VARCHAR(20),
    email_verified BOOLEAN,
    PRIMARY KEY(userid),
    bio VARCHAR(255),
    about VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS education(
    userid int NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    grade FLOAT(2,2) NOT NULL,
    degree varchar(20) NOT NULL,
    school varchar(100) NOT NULL,
    FOREIGN KEY (userid) REFERENCES user(userid)
);

CREATE TABLE IF NOT EXISTS projects(
    projectid int NOT NULL AUTO_INCREMENT,
    userid int NOT NULL,
    photo varchar(100) NOT NULL,
    title varchar(100) NOT NULL,
    description varchar(500) NOT NULL,
    PRIMARY KEY(projectid),
    FOREIGN KEY (userid) REFERENCES user(userid)
);

CREATE TABLE IF NOT EXISTS project_tech(
    projectid int NOT NULL,
    techname varchar(50) NOT NULL,
    FOREIGN KEY (projectid) REFERENCES projects(projectid)
);

CREATE TABLE IF NOT EXISTS experiance(
    userid int NOT NULL,
    experianceid int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    employee_type varchar(100) NOT NULL,
    position varchar(100) NOT NULL,
    company_name varchar(200) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY(experianceid),
    FOREIGN KEY (userid) REFERENCES user(userid)
);

CREATE TABLE IF NOT EXISTS experiance_tech(
    experianceid int NOT NULL,
    techname varchar(50) NOT NULL,
    FOREIGN KEY (experianceid) REFERENCES experiance(experianceid)
);

CREATE TABLE IF NOT EXISTS verify(
    verifiedby int NOT NULL,
    userid int NOT NULL,
    FOREIGN KEY (verifiedby) REFERENCES user(userid),
    FOREIGN KEY (userid) REFERENCES user(userid)
);


CREATE TABLE IF NOT EXISTS email_verification(
    userid int NOT NULL,
    email VARCHAR(100) NOT NULL,
    code varchar(6) NOT NULL,
    time int NOT NULL,
    tried int NOT NULL,
    FOREIGN KEY (userid) REFERENCES user(userid)
)


