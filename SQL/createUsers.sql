CREATE SCHEMA `internetbanking` ;
CREATE TABLE `internetbanking`.`users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Permission` INT(11) NOT NULL,
  `RefreshToken` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`));
