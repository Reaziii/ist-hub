

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