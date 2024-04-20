-- Active: 1712913441556@@ist-linkedin.c1gqwxxyqcc1.ap-southeast-1.rds.amazonaws.com@null@ist_hub


select * from user;

ALTER TABLE user
ADD about varchar(2000);

ALTER TABLE education
ADD grade FLOAT;


update user set fullname = 'reaz' where email = 'reazahammed.iii@gmail.com';

select * from experience;

Alter TABLE experience
add COLUMN  still BOOLEAN;



drop table experience;
drop table experiance_tech;

select * from experience;


update education set still = TRUE;