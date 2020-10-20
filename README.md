Mysql:
root
Trio@123
mysql -h localhost -u root -p
show databases;
use databasename;
CREATE DATABASE test1;
DROP DATABASE databasename;
show tables;

CREATE USER 'root'@'localhost' IDENTIFIED BY 'Trio@123';
GRANT ALL PRIVILEGES ON  *.* to 'root'@'localhost';
mysql> GRANT REPLICATION SLAVE ON *.* TO 'root'@'%' IDENTIFIED BY 'Trio@123';
mysql> FLUSH PRIVILEGES;
mysql> FLUSH TABLES WITH READ LOCK;
mysql> SHOW MASTER STATUS;

====================================
CREATE DATABASE master;

USE master;

CREATE TABLE MyGuests (
    Personid int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (Personid)
);

INSERT INTO MyGuests (FirstName,LastName, Age)
VALUES ('React','NODE', 20);

On master database
=======================
nano /etc/mysql/mysql.conf.d/mysqld.cnf
bind-address            = 0.0.0.0
server-id               = 1
log_bin                 = /var/log/mysql/mysql-bin.log
expire_logs_days        = 10
max_binlog_size   = 100M
binlog_do_db            = master

GRANT REPLICATION SLAVE ON *.* TO 'root'@'%'IDENTIFIED BY 'Trio#123'; //master user and pwd
FLUSH PRIVILEGES;
FLUSH TABLES WITH READ LOCK;
UNLOCK TABLES;

file: mysql-bin.000001 |     position: 1366 | db: master 

on slave database
=====================
server-id               = 2
log_bin                 = /var/log/mysql/mysql-bin.log
expire_logs_days        = 10
max_binlog_size   = 100M
binlog_do_db            = master
relay_log               = /var/log/mysql/mysql-relay-bin.log

CHANGE MASTER TO MASTER_HOST='192.168.0.250', MASTER_USER='root', MASTER_PASSWORD='Trio#123', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=1366;    //master details
START SLAVE;
SHOW SLAVE STATUS;
=========================