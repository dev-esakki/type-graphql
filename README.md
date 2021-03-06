# Master - Slave configuration


## Master Config

configure the mysql master instance with the below commands.
```
- nano /etc/mysql/mysql.conf.d/mysqld.cnf 
- server-id               = 1
- bind-address   = 0.0.0.0
- skip-grant-tables [geant accecc to all ip's, add below mysqld ]
- log_bin                 = /var/log/mysql/mysql-bin.log
- expire_logs_days        = 10
- max_binlog_size         = 100M
- binlog_do_db            = master [dbname]
```

## Restart the mysql and check the status for master
```
- sudo systemctl restart mysql
- sudo systemctl status mysql
```


---
## Master database

Login to the master database using the command mysql -u root -p and then add the below commands
```
- GRANT REPLICATION SLAVE ON *.* TO 'root'@'%'IDENTIFIED BY 'Test#123';
- FLUSH PRIVILEGES;
- FLUSH TABLES WITH READ LOCK;
- UNLOCK TABLES;
- SHOW MASTER STATUS\G
```

when the check the master status you have got the file and position. collect the details
```
- file: mysql-bin.000001 
- position: 1366
```

---
##  Slave Config
configure the mysql slave instance with the below commands.
```
- nano /etc/mysql/mysql.conf.d/mysqld.cnf 
- server-id               = 2
- bind-address   = 0.0.0.0
- skip-grant-tables [geant accecc to all ip's, add below mysqld ]
- log_bin                 = /var/log/mysql/mysql-bin.log
- expire_logs_days        = 10
- max_binlog_size         = 100M
- binlog_do_db            = master [dbname]
relay_log                 = /var/log/mysql/mysql-relay-bin.log
```
---

## Restart the mysql and check the status for slave
```
- sudo systemctl restart mysql
- sudo systemctl status mysql
```
---
## Slave database
Login to the master database using the command mysql -u root -p and then add the below commands

```
CHANGE MASTER TO MASTER_HOST='192.168.0.250', MASTER_USER='root', MASTER_PASSWORD='Test#123', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=1366;    //master details
START SLAVE;
SHOW SLAVE STATUS\G

```
## Database Creation
Login to your master database and create a table and insert some values
```
CREATE DATABASE master;

USE master;

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    lastName varchar(255) NOT NULL,
    firstName varchar(255),
    Age int,
    email varchar(255),
    password varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO user (firstName,lastName, Age, email, password)
VALUES ('sdfs','sdfsdf', 20, "devs@mail.com", "aaasd");

```

## Slave Replication
When You login to the slave database and check the replicated data with the below commands

```
USE master;
SELECT * FROM user;
```