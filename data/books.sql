drop table  if exists books ;

CREATE TABLE books (
 
 id serial primary key,
 author varchar(255),
 title varchar(255),
 isbn varchar(255),
 image_url varchar(255),
 description text

);
