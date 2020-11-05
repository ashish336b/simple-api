const db = require("./dbconnection");
let sqlForMembers = `create table if not exists members(
  id serial primary key not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  address varchar(255) not null,
  phone varchar(255) not null,
  email varchar(255) not null,
  addedby bigint not null,
  foreign key (addedby) References alluser(id)
)`;
let sqlForAllUsers = `
create table if not exists alluser(
	id serial not null primary key,
	firstname varchar(255) not null,
	lastname varchar(255) not null,
	email varchar(255) not null,
	pass varchar(255) not null
)

`;
db.any(sqlForMembers).then((result) => {
  console.log("success creating table members");
});
db.any(sqlForAllUsers).then((result) => {
  console.log("success creating table alluser");
});
