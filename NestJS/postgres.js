/*
SQL - Structured Query Language, it is a language, not software
- use to create tables, insert data, query data, update/delete records, manage relationships

SELECT * FROM users; --- (here users is a table name)

PostgreSQL - is a database management system (DBMS)
- it is actual software installed on computer/server that stores data, manages tables, executes SQL queries, handles transactions & security

Connect to PostgreSQL
-- psql -U postgres -p 5433 

Terminal Commands
##  Show All Databases -- \l or \list
## Connect to Database -- \c <database name>
## Show All Schemas    -- \dn
## Show All Tables     -- \dt
## Describe table structure -- \d users (we see: columns, types, constraints, indexes)
## Clear Screen -- \! clear
## Exit PostgreSQL -- \q


Basic SQL Commands (Run Inside psql)

### Create Database
- CREATE DATABASE <database name>

### Create Table
CREATE TABLE users(
id serial primary key,
name varchar(100),
email varchar(255)
)

### Insert Data
INSERT INTO users(name, email)
VALUES ('Rahul', 'rahul@test.com')

### View Data
SELECT * FROM users;

### Update Query
UPDATE users SET name = 'Amit WHERE id = 1;

### Delete Query
DELETE FROM users WHERE id = 1;

### DELETE Table
DROP TABLE users


IMPORTANT COMMAND
Show command history:
\s

Data types in SQL
1. Numeric (numbers)
2. Text (strings)
3. Boolean
4. Date & Time
5. UUID
6. JSON
7. Arrays
8. Binary
9. Special types (enum, etc.)






Numeric Types (Numbers)
------------------------------
SMALLINT   small values 2bytes ex: 10
INTEGER/INT most common 4bytes 1000
BIGINT large IDs
SERIAL auto increment 1,2,3  primary keys
BIGSERIAL large auto increment   big systems


Text /String Types
------------------------
CHAR(n) ----------- fixed length
VARCHAR(n)--------- limited length
TEXT -------------- unlimited length (MOST USED)

name VARCHAR(100),
description TEXT



Boolean Type
---------------
TRUE
FALSE
NULL

ex: is_active BOOLEAN
INSERT INTO users(is_active) VALUES(true);
INSERT INTO users(is_active) VALUES(false);


Date & Time Types
-----------------------

DATE --- only date
TIME --- only time
TIMESTAMP --- date + time
TIMESTAMPTZ ---- timezone aware

ex: created_at TIMESTAP DEFAULT NOW();



UUID
-------

id UUID DEFAULT gen_random_uuid()
- used in microservices
- public APIs
- distributed systems




JSON /JSONB (PostgreSQL superpower)
----------------------------------------
JSON -- plain storage
JSONB -- optimized + searchable



Array Type -- PostgreSQL allows arrays directly
------------------------------------------------------
tags TEXT[]

ex: INSERT INTO posts(tags)
VALUES (ARRAY['nestjs', 'postgres'])



ENUM (controlled values) -- Good for fixed options.
----------------------------------------------------
CREATE TYPE user_role AS ENUM('admin', 'user', 'public');



NULL - Value is unknown/empty
--------------------------------

middle_name TEXT NULL
name VARCHAR(100) NOT NULL

query -- SELECT * FROM users WHERE name IS NULL;



ENUM Type
--------
- Before using enum in a table, you must create it.
CREATE TYPE roles AS ENUM (
'ADMIN',
'USER',
'CONTENT_MANAGER'
);


- Create table using enum type: 
CREATE TABLE users(
role roles DEFAULT 'USER'
)

Add new column in existing table

ALTER TABLE <table name>
ADD COLUMN <cloumn name datatypes>



How to change and update the Constraint 
ALTER TABLE <table_name>
ALTER COLUMN <column_name> set <add_datatypes>


Drop the existing foreign key constraint
ALTER TABLE orders
DROP CONSTRAINT order_userid_fkey;



Relational database
ex:  users -> cartItems <- products

Foreign Key -- 
orders table

FOREIGN KEY (userid) REFERENCES users(id);
FOREIGN KEY (productid) REFERENCES products(id);


here when the users table userid exist then only it will work


ON DELETE CASCADE and ON UPDATE CASCADE are referential actions  we can define on a foreign key constraint in SQL.
- used when we want changes in the parent table to automatically propagate to the child table.

Where and When to Use
1. ON DELETE CASCADE 
-----------------------
- Use When: if a parent row is deleted, you also want all related child rows to be deleted automatically.
- if a customer is deleted, all their orders should also be deleted.
ON DELETE CASCADE

query: DELETE FROM users where userid = 1;
-- all orders with userid = 1 will be deleted automatically.

2. ON UPDATE CASCADE
--------------------- 
- When if a parent key value changes, we want the foreign key in the child table to update automatically.
- if a customerID changes in customers, it should also change in orders.
ON UPDATE CASCADE

Query: UPDATE users SET userid = 2 where userid = 10;
-- All orders with userid = 2 will now have userid = 10;


*/

/*

JOin - A Join combines rows from two or more tables based on a related column.

1. INNER JOIN -> returns only matching rows from both tables.
query:
-------
SELECT users.name, orders.productid
from users
inner join orders
on users.id = orders.userid;


2. LEFT Join (Left outer join)
- All rows from left table 
- matching rows from right table
- return all data from left side

3. RIGHT JOIN (RIGHT OUTER JOIN)
- All rows from right table
- matching tows from left
- return all data from right side


Q. write a query which user by which product
users -> orders <- products

select users.name, users.email, products.product_name, products.price
from orders
inner join users
on users.id = orders.userid
inner join products
on products.id = orders.productid;


Q. return the user name , user email, address with city & location, and ordered product name description and price;

select users.name, users.email, address.city, address.location, products.product_name, products.description, products.price
from orders
inner join users
on users.id = orders.userid
inner join products
on products.id = orders.productid
inner join address
on address.user_id = users.id;

*/

/*
Index in PostgreSQL ?
- An Index is a special data structure that helps postgreSQL find rows faster.

ex: like a book index. (without index): read every page to find a topic  (with index): you jump directly to the page.

Why do we use Indexes ?
- When tables becomes large (thousands or millions of rows): 
SELECT * FROM users where email = 'rahul@gmail.com';
--- here each row find the email  (Sequential Scan)


Create index 
CREATE INDEX idx_users_email 
ON users(email);

PostgreSQL creates something like:
amit@gmail.com - row 1
john@gmail.com - row 2
sara@gmail.com - row 3

Jump directly to john@gmail.com

An index allows postgreSQL to: directly locate matching rows.


*/

/*

Transaction - A transaction is a group of SQL operations treated as one single task.
- Either everything succeeds
- or nothing happens

BEGIN; -- start transaction

COMMIT; when transaction success without any error then COMMIT;
- after COMMIT we do not change it

ROLLBACK; transaction will BACK;



*/

/*

Trigger -- A trigger is a piece of code that runs automatically when something happens in a table.
- You don't run it manually.
- PostgreSQL runs it for you.

trigger -> automatic action when INSERT, UPDATE, or DELETE happens.









*/
