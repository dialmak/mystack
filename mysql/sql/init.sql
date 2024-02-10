CREATE DATABASE IF NOT EXISTS `mysqlitto`;

USE `mysqlitto`;


CREATE USER IF NOT EXISTS `mysqlitto` IDENTIFIED WITH mysql_native_password BY 'osa00NET';


CREATE TABLE IF NOT EXISTS `devices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `device` char(6) NOT NULL,
  `description` varchar(50),
  PRIMARY KEY (`id`),
  UNIQUE (`device`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `measures` (
  `when` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `device` INT NOT NULL,
  `temperature` decimal(5,2),
  `humidity` decimal(5,2),
  `battery` decimal(3,2),
  `rssi` tinyint(4),
  PRIMARY KEY (`when`,`device`),
  FOREIGN KEY (`device`) REFERENCES `devices` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


GRANT SELECT ON `devices` TO `mysqlitto`;

GRANT SELECT, INSERT, UPDATE ON `measures` TO `mysqlitto`;
