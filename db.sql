

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
    primary key(userid)

);
CREATE TABLE IF NOT EXISTS edication(
    userid int,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    grade FLOAT(2,2) NOT NULL,
    degree varchar(20) NOT NULL,
    school varchar(100) NOT NULL,
    FOREIGN KEY (userid) REFERENCES user(userid)
);
