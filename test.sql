-- Active: 1714986337180@@127.0.0.1@3307@ist-hub


select * from user;

ALTER Table `user` DROP COLUMN about;

ALTER TABLE user
ADD COLUMN about varchar(2000);

ALTER TABLE education
ADD grade FLOAT;


update user set fullname = 'reaz' where email = 'reazahammed.iii@gmail.com';

select * from experience;
delete from showcase;
Alter TABLE user
add COLUMN  resume VARCHAR(100);



drop table experience;
drop table experiance_tech;

select * from showcase;


update education set still = TRUE;

drop table email_verification;

ALTER TABLE user
MODIFY 
MODIFY COLU
MOD
COLUMN about VARCHAR(2000);

ALTER TABLE education add column still BOOLEAN

ALTER Table education drop COLUMN grade;

ALTER TABLE education add COLUMN grade FLOAT;

select * from showcase;