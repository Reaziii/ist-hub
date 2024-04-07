-- Active: 1710972936505@@ist-linkedin.c1gqwxxyqcc1.ap-southeast-1.rds.amazonaws.com@null@ist_hub


select * from user;

ALTER TABLE user
ADD about varchar(2000);


update user set fullname = 'reaz' where email = 'reazahammed.iii@gmail.com';