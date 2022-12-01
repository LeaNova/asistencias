-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: asistencias
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access`
--

DROP TABLE IF EXISTS `access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access` (
  `idAccess` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(11) NOT NULL,
  PRIMARY KEY (`idAccess`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access`
--

LOCK TABLES `access` WRITE;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;
INSERT INTO `access` VALUES (1,'Coordinador'),(2,'Profesor'),(3,'Alumno');
/*!40000 ALTER TABLE `access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumnos` (
  `DNI` varchar(8) NOT NULL,
  PRIMARY KEY (`DNI`),
  KEY `DNI` (`DNI`),
  CONSTRAINT `DNI_alumno` FOREIGN KEY (`DNI`) REFERENCES `usuarios` (`DNI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES ('123123'),('222'),('333');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencias`
--

DROP TABLE IF EXISTS `asistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistencias` (
  `codAsistencia` varchar(30) NOT NULL,
  `codMateria` varchar(15) NOT NULL,
  `fecha` datetime NOT NULL,
  `enCuenta` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`codAsistencia`) USING BTREE,
  KEY `codMateria_asistencia` (`codMateria`),
  CONSTRAINT `codMateria_asistencia` FOREIGN KEY (`codMateria`) REFERENCES `materias` (`codMateria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencias`
--

LOCK TABLES `asistencias` WRITE;
/*!40000 ALTER TABLE `asistencias` DISABLE KEYS */;
INSERT INTO `asistencias` VALUES ('ABD-2022-11-01hs17','ABD-2022','2022-11-01 20:00:00',1),('ABD-2022-11-02hs19','ABD-2022','2022-11-02 22:00:00',1),('ABD-2022-11-08hs17','ABD-2022','2022-11-08 20:00:00',1),('ABD-2022-11-09hs19','ABD-2022','2022-11-09 22:00:00',1),('ABD-2022-11-15hs17','ABD-2022','2022-11-15 20:00:00',1),('ABD-2022-11-16hs19','ABD-2022','2022-11-16 22:00:00',1),('ABD-2022-11-22hs17','ABD-2022','2022-11-22 20:00:00',1),('ABD-2022-11-23hs19','ABD-2022','2022-11-23 22:00:00',1),('ABD-2022-11-29hs17','ABD-2022','2022-11-29 20:00:00',1),('ABD-2022-11-30hs19','ABD-2022','2022-11-30 22:00:00',1),('ABD-2022-12-06hs17','ABD-2022','2022-12-06 20:00:00',1),('ABD-2022-12-07hs19','ABD-2022','2022-12-07 22:00:00',1),('MAT-2022-11-01hs18','MAT-2022','2022-11-01 21:30:00',1),('MAT-2022-11-03hs15','MAT-2022','2022-11-03 18:00:00',1),('MAT-2022-11-08hs18','MAT-2022','2022-11-08 21:30:00',0),('MAT-2022-11-10hs15','MAT-2022','2022-11-10 18:00:00',1),('MAT-2022-11-15hs18','MAT-2022','2022-11-15 21:30:00',1),('MAT-2022-11-17hs15','MAT-2022','2022-11-17 18:00:00',1),('MAT-2022-11-22hs18','MAT-2022','2022-11-22 21:30:00',1),('MAT-2022-11-24hs15','MAT-2022','2022-11-24 18:00:00',1),('MAT-2022-11-29hs18','MAT-2022','2022-11-29 21:30:00',0),('MAT-2022-12-01hs15','MAT-2022','2022-12-01 18:00:00',1),('MAT-2022-12-06hs18','MAT-2022','2022-12-06 21:30:00',1),('MAT-2022-12-08hs15','MAT-2022','2022-12-08 18:00:00',1),('MAT-2022-12-13hs18','MAT-2022','2022-12-13 21:30:00',1),('MAT-2022-12-15hs15','MAT-2022','2022-12-15 18:00:00',1),('MAT1-2022-3-18hs19','MAT1-2022','2022-03-18 22:00:00',1),('MAT1-2022-3-21hs19','MAT1-2022','2022-03-21 22:00:00',1),('MAT1-2022-3-25hs19','MAT1-2022','2022-03-25 22:00:00',1),('MAT1-2022-3-28hs19','MAT1-2022','2022-03-28 22:00:00',1),('MAT1-2022-4-01hs19','MAT1-2022','2022-04-01 22:00:00',1),('MAT1-2022-4-04hs19','MAT1-2022','2022-04-04 22:00:00',1),('MAT1-2022-4-08hs19','MAT1-2022','2022-04-08 22:00:00',1),('MAT1-2022-4-11hs19','MAT1-2022','2022-04-11 22:00:00',1),('MAT1-2022-4-15hs19','MAT1-2022','2022-04-15 22:00:00',1),('MAT1-2022-4-18hs19','MAT1-2022','2022-04-18 22:00:00',1),('MAT1-2022-4-22hs19','MAT1-2022','2022-04-22 22:00:00',1),('MAT1-2022-4-25hs19','MAT1-2022','2022-04-25 22:00:00',1),('MAT1-2022-4-29hs19','MAT1-2022','2022-04-29 22:00:00',1),('MAT1-2022-5-02hs19','MAT1-2022','2022-05-02 22:00:00',1),('MAT1-2022-5-06hs19','MAT1-2022','2022-05-06 22:00:00',1),('MAT1-2022-5-09hs19','MAT1-2022','2022-05-09 22:00:00',1),('MAT1-2022-5-13hs19','MAT1-2022','2022-05-13 22:00:00',1),('MAT1-2022-5-16hs19','MAT1-2022','2022-05-16 22:00:00',1),('MAT1-2022-5-20hs19','MAT1-2022','2022-05-20 22:00:00',1),('MAT1-2022-5-23hs19','MAT1-2022','2022-05-23 22:00:00',1),('MAT1-2022-5-27hs19','MAT1-2022','2022-05-27 22:00:00',1),('MAT1-2022-5-30hs19','MAT1-2022','2022-05-30 22:00:00',1),('MAT1-2022-6-03hs19','MAT1-2022','2022-06-03 22:00:00',1),('MAT1-2022-6-06hs19','MAT1-2022','2022-06-06 22:00:00',1),('MAT1-2022-6-10hs19','MAT1-2022','2022-06-10 22:00:00',1),('MAT1-2022-6-13hs19','MAT1-2022','2022-06-13 22:00:00',1),('WEB1-2022-3-17hs14','WEB1-2022','2022-03-17 17:00:00',1),('WEB1-2022-3-18hs18','WEB1-2022','2022-03-18 21:00:00',1),('WEB1-2022-3-24hs14','WEB1-2022','2022-03-24 17:00:00',1),('WEB1-2022-3-25hs18','WEB1-2022','2022-03-25 21:00:00',1),('WEB1-2022-3-31hs14','WEB1-2022','2022-03-31 17:00:00',1),('WEB1-2022-4-01hs18','WEB1-2022','2022-04-01 21:00:00',1),('WEB1-2022-4-07hs14','WEB1-2022','2022-04-07 17:00:00',1),('WEB1-2022-4-08hs18','WEB1-2022','2022-04-08 21:00:00',1),('WEB1-2022-4-14hs14','WEB1-2022','2022-04-14 17:00:00',1),('WEB1-2022-4-15hs18','WEB1-2022','2022-04-15 21:00:00',1),('WEB1-2022-4-21hs14','WEB1-2022','2022-04-21 17:00:00',1),('WEB1-2022-4-22hs18','WEB1-2022','2022-04-22 21:00:00',1),('WEB1-2022-4-28hs14','WEB1-2022','2022-04-28 17:00:00',1),('WEB1-2022-4-29hs18','WEB1-2022','2022-04-29 21:00:00',1),('WEB1-2022-5-05hs14','WEB1-2022','2022-05-05 17:00:00',1),('WEB1-2022-5-06hs18','WEB1-2022','2022-05-06 21:00:00',1),('WEB1-2022-5-12hs14','WEB1-2022','2022-05-12 17:00:00',1),('WEB1-2022-5-13hs18','WEB1-2022','2022-05-13 21:00:00',1),('WEB1-2022-5-19hs14','WEB1-2022','2022-05-19 17:00:00',1),('WEB1-2022-5-20hs18','WEB1-2022','2022-05-20 21:00:00',1),('WEB1-2022-5-26hs14','WEB1-2022','2022-05-26 17:00:00',1),('WEB1-2022-5-27hs18','WEB1-2022','2022-05-27 21:00:00',1),('WEB1-2022-6-02hs14','WEB1-2022','2022-06-02 17:00:00',1),('WEB1-2022-6-03hs18','WEB1-2022','2022-06-03 21:00:00',1),('WEB1-2022-6-09hs14','WEB1-2022','2022-06-09 17:00:00',1),('WEB1-2022-6-10hs18','WEB1-2022','2022-06-10 21:00:00',1),('WEB1-2022-6-16hs14','WEB1-2022','2022-06-16 17:00:00',1);
/*!40000 ALTER TABLE `asistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condiciones`
--

DROP TABLE IF EXISTS `condiciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `condiciones` (
  `idCondicion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(10) NOT NULL,
  PRIMARY KEY (`idCondicion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condiciones`
--

LOCK TABLES `condiciones` WRITE;
/*!40000 ALTER TABLE `condiciones` DISABLE KEYS */;
INSERT INTO `condiciones` VALUES (1,'Regular'),(2,'Promocion'),(3,'Libre'),(4,'Pendiente');
/*!40000 ALTER TABLE `condiciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dias`
--

DROP TABLE IF EXISTS `dias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dias` (
  `idDia` int(11) NOT NULL AUTO_INCREMENT,
  `dia` varchar(10) NOT NULL,
  PRIMARY KEY (`idDia`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dias`
--

LOCK TABLES `dias` WRITE;
/*!40000 ALTER TABLE `dias` DISABLE KEYS */;
INSERT INTO `dias` VALUES (1,'Lunes'),(2,'Martes'),(3,'Miercoles'),(4,'Jueves'),(5,'Viernes');
/*!40000 ALTER TABLE `dias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dictados`
--

DROP TABLE IF EXISTS `dictados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dictados` (
  `idDictado` int(11) NOT NULL AUTO_INCREMENT,
  `tipoDictado` varchar(30) NOT NULL,
  `mesInicio` varchar(15) NOT NULL,
  `mesFin` varchar(15) NOT NULL,
  PRIMARY KEY (`idDictado`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dictados`
--

LOCK TABLES `dictados` WRITE;
/*!40000 ALTER TABLE `dictados` DISABLE KEYS */;
INSERT INTO `dictados` VALUES (1,'1er Cuatrimestre','Marzo','Junio'),(2,'2do Cuatrimestre','Agosto','Noviembre'),(3,'Ambos Cuatrimestres','Marzo','Junio'),(4,'Anual','Marzo','Junio'),(5,'1er Bimestre','Marzo','Abril'),(6,'2do Bimestre','Mayo','Junio'),(7,'3er Bimestre','Agosto','Septiembre'),(8,'4to Bimestre','Octubre','Noviembre');
/*!40000 ALTER TABLE `dictados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario_materias`
--

DROP TABLE IF EXISTS `horario_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horario_materias` (
  `idHorario` int(11) NOT NULL AUTO_INCREMENT,
  `codMateria` varchar(15) NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFin` time NOT NULL,
  `idDia` int(11) NOT NULL,
  PRIMARY KEY (`idHorario`),
  KEY `idDia` (`idDia`),
  KEY `codMateria_hora` (`codMateria`),
  CONSTRAINT `codMateria_hora` FOREIGN KEY (`codMateria`) REFERENCES `materias` (`codMateria`),
  CONSTRAINT `idDia` FOREIGN KEY (`idDia`) REFERENCES `dias` (`idDia`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario_materias`
--

LOCK TABLES `horario_materias` WRITE;
/*!40000 ALTER TABLE `horario_materias` DISABLE KEYS */;
INSERT INTO `horario_materias` VALUES (17,'MAT-2022','15:00:00','17:00:00',4),(18,'MAT-2022','18:30:00','20:00:00',2),(19,'ABD-2022','17:00:00','19:00:00',2),(21,'ABD-2022','19:00:00','22:00:00',3),(22,'WEB1-2022','14:00:00','16:00:00',4),(23,'WEB1-2022','18:00:00','20:00:00',5),(24,'MAT1-2022','19:00:00','21:00:00',1),(26,'MAT1-2022','19:00:00','21:00:00',5);
/*!40000 ALTER TABLE `horario_materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscripciones` (
  `DNI` varchar(8) NOT NULL,
  `codMateria` varchar(15) NOT NULL,
  `idCondicion` int(11) NOT NULL,
  PRIMARY KEY (`DNI`,`codMateria`),
  KEY `codMateria_alumno` (`codMateria`),
  KEY `idCondicion` (`idCondicion`),
  KEY `DNI` (`DNI`),
  CONSTRAINT `DNIalumno_materia` FOREIGN KEY (`DNI`) REFERENCES `alumnos` (`DNI`),
  CONSTRAINT `codMateria_alumno` FOREIGN KEY (`codMateria`) REFERENCES `materias` (`codMateria`),
  CONSTRAINT `idCondicion` FOREIGN KEY (`idCondicion`) REFERENCES `condiciones` (`idCondicion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES ('123123','ABD-2022',1),('123123','MAT-2022',1),('123123','MAT1-2022',1),('222','MAT-2022',1),('333','MAT1-2022',1),('333','WEB1-2022',1),('123123','WEB1-2022',4),('222','ABD-2022',4),('333','ABD-2022',4);
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materias` (
  `codMateria` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `ciclo` int(11) NOT NULL,
  `año` int(11) NOT NULL,
  `inicio` date NOT NULL,
  `fin` date NOT NULL,
  `idDictado` int(11) NOT NULL,
  PRIMARY KEY (`codMateria`),
  KEY `idDictado` (`idDictado`),
  CONSTRAINT `idDictado` FOREIGN KEY (`idDictado`) REFERENCES `dictados` (`idDictado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES ('ABD-2022','Adm. Base de Datos',2022,2,'2022-11-01','2022-12-11',2),('MAT-2022','Matematica',2022,1,'2022-11-01','2022-12-19',2),('MAT1-2022','Matematica I',2022,2,'2022-03-16','2022-06-17',1),('WEB1-2022','Web I',2022,1,'2022-03-16','2022-06-17',1);
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presentes`
--

DROP TABLE IF EXISTS `presentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presentes` (
  `codAsistencia` varchar(30) NOT NULL,
  `DNI` varchar(8) NOT NULL,
  `presente` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`codAsistencia`,`DNI`),
  KEY `DNI_alumno_asistencia` (`DNI`),
  KEY `codAsistencia` (`codAsistencia`),
  CONSTRAINT `DNI_alumno_asistencia` FOREIGN KEY (`DNI`) REFERENCES `alumnos` (`DNI`),
  CONSTRAINT `codAsistencia` FOREIGN KEY (`codAsistencia`) REFERENCES `asistencias` (`codAsistencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentes`
--

LOCK TABLES `presentes` WRITE;
/*!40000 ALTER TABLE `presentes` DISABLE KEYS */;
INSERT INTO `presentes` VALUES ('ABD-2022-11-01hs17','123123',1),('ABD-2022-11-02hs19','123123',1),('ABD-2022-11-08hs17','123123',1),('ABD-2022-11-09hs19','123123',1),('ABD-2022-11-15hs17','123123',1),('ABD-2022-11-16hs19','123123',1),('ABD-2022-11-22hs17','123123',1),('ABD-2022-11-23hs19','123123',1),('ABD-2022-11-29hs17','123123',1),('ABD-2022-11-30hs19','123123',1),('ABD-2022-12-06hs17','123123',0),('ABD-2022-12-07hs19','123123',0),('MAT-2022-11-01hs18','123123',1),('MAT-2022-11-01hs18','222',1),('MAT-2022-11-03hs15','123123',1),('MAT-2022-11-03hs15','222',0),('MAT-2022-11-08hs18','123123',0),('MAT-2022-11-08hs18','222',0),('MAT-2022-11-10hs15','123123',1),('MAT-2022-11-10hs15','222',1),('MAT-2022-11-15hs18','123123',1),('MAT-2022-11-15hs18','222',0),('MAT-2022-11-17hs15','123123',1),('MAT-2022-11-17hs15','222',1),('MAT-2022-11-22hs18','123123',1),('MAT-2022-11-22hs18','222',0),('MAT-2022-11-24hs15','123123',1),('MAT-2022-11-24hs15','222',1),('MAT-2022-11-29hs18','123123',0),('MAT-2022-11-29hs18','222',0),('MAT-2022-12-01hs15','123123',0),('MAT-2022-12-01hs15','222',0),('MAT-2022-12-06hs18','123123',0),('MAT-2022-12-06hs18','222',0),('MAT-2022-12-08hs15','123123',0),('MAT-2022-12-08hs15','222',0),('MAT-2022-12-13hs18','123123',0),('MAT-2022-12-13hs18','222',0),('MAT-2022-12-15hs15','123123',0),('MAT-2022-12-15hs15','222',0),('MAT1-2022-3-18hs19','123123',1),('MAT1-2022-3-18hs19','333',1),('MAT1-2022-3-21hs19','123123',0),('MAT1-2022-3-21hs19','333',1),('MAT1-2022-3-25hs19','123123',1),('MAT1-2022-3-25hs19','333',0),('MAT1-2022-3-28hs19','123123',0),('MAT1-2022-3-28hs19','333',0),('MAT1-2022-4-01hs19','123123',0),('MAT1-2022-4-01hs19','333',0),('MAT1-2022-4-04hs19','123123',0),('MAT1-2022-4-04hs19','333',0),('MAT1-2022-4-08hs19','123123',0),('MAT1-2022-4-08hs19','333',0),('MAT1-2022-4-11hs19','123123',0),('MAT1-2022-4-11hs19','333',0),('MAT1-2022-4-15hs19','123123',0),('MAT1-2022-4-15hs19','333',0),('MAT1-2022-4-18hs19','123123',0),('MAT1-2022-4-18hs19','333',0),('MAT1-2022-4-22hs19','123123',0),('MAT1-2022-4-22hs19','333',0),('MAT1-2022-4-25hs19','123123',0),('MAT1-2022-4-25hs19','333',0),('MAT1-2022-4-29hs19','123123',0),('MAT1-2022-4-29hs19','333',0),('MAT1-2022-5-02hs19','123123',0),('MAT1-2022-5-02hs19','333',0),('MAT1-2022-5-06hs19','123123',0),('MAT1-2022-5-06hs19','333',0),('MAT1-2022-5-09hs19','123123',0),('MAT1-2022-5-09hs19','333',0),('MAT1-2022-5-13hs19','123123',0),('MAT1-2022-5-13hs19','333',0),('MAT1-2022-5-16hs19','123123',0),('MAT1-2022-5-16hs19','333',0),('MAT1-2022-5-20hs19','123123',0),('MAT1-2022-5-20hs19','333',0),('MAT1-2022-5-23hs19','123123',0),('MAT1-2022-5-23hs19','333',0),('MAT1-2022-5-27hs19','123123',0),('MAT1-2022-5-27hs19','333',0),('MAT1-2022-5-30hs19','123123',0),('MAT1-2022-5-30hs19','333',0),('MAT1-2022-6-03hs19','123123',0),('MAT1-2022-6-03hs19','333',0),('MAT1-2022-6-06hs19','123123',0),('MAT1-2022-6-06hs19','333',0),('MAT1-2022-6-10hs19','123123',0),('MAT1-2022-6-10hs19','333',0),('MAT1-2022-6-13hs19','123123',0),('MAT1-2022-6-13hs19','333',0),('WEB1-2022-3-17hs14','333',0),('WEB1-2022-3-18hs18','333',0),('WEB1-2022-3-24hs14','333',0),('WEB1-2022-3-25hs18','333',0),('WEB1-2022-3-31hs14','333',0),('WEB1-2022-4-01hs18','333',0),('WEB1-2022-4-07hs14','333',0),('WEB1-2022-4-08hs18','333',0),('WEB1-2022-4-14hs14','333',0),('WEB1-2022-4-15hs18','333',0),('WEB1-2022-4-21hs14','333',0),('WEB1-2022-4-22hs18','333',0),('WEB1-2022-4-28hs14','333',0),('WEB1-2022-4-29hs18','333',0),('WEB1-2022-5-05hs14','333',0),('WEB1-2022-5-06hs18','333',0),('WEB1-2022-5-12hs14','333',0),('WEB1-2022-5-13hs18','333',0),('WEB1-2022-5-19hs14','333',0),('WEB1-2022-5-20hs18','333',0),('WEB1-2022-5-26hs14','333',0),('WEB1-2022-5-27hs18','333',0),('WEB1-2022-6-02hs14','333',0),('WEB1-2022-6-03hs18','333',0),('WEB1-2022-6-09hs14','333',0),('WEB1-2022-6-10hs18','333',0),('WEB1-2022-6-16hs14','333',0);
/*!40000 ALTER TABLE `presentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesores` (
  `DNI` varchar(8) NOT NULL,
  `idRol` int(11) NOT NULL,
  `codMateria` varchar(15) NOT NULL,
  `generado` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`DNI`,`codMateria`),
  KEY `idRol` (`idRol`),
  KEY `codMateria` (`codMateria`),
  KEY `DNI` (`DNI`),
  CONSTRAINT `DNI_profesor` FOREIGN KEY (`DNI`) REFERENCES `usuarios` (`DNI`),
  CONSTRAINT `codMateria` FOREIGN KEY (`codMateria`) REFERENCES `materias` (`codMateria`),
  CONSTRAINT `idRol` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES ('111555',1,'WEB1-2022',1),('123444',1,'MAT-2022',1),('123444',1,'MAT1-2022',1),('333222',1,'ABD-2022',1);
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(11) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Responsable'),(2,'Suplente'),(3,'Ayudante');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `DNI` varchar(8) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `pass` varchar(60) NOT NULL,
  `idAccess` int(11) NOT NULL,
  PRIMARY KEY (`DNI`),
  KEY `idAccess` (`idAccess`),
  CONSTRAINT `idAccess` FOREIGN KEY (`idAccess`) REFERENCES `access` (`idAccess`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('111555','Gabriel','Farias','gf@mail.com','$2b$10$/1S4qkPKI4m6NWTq3zHAXu6p4mdJp/XuYoyhUnkQP3AxB4UjcSC8O',2),('123123','Fabricio','Molina','fabri.m@mail.com','$2b$10$BFJI/X1XEV82L1WbONKazO1AMgfU./jXkOf9WKNKSGfBWUX7ghOqC',3),('123444','Sebastian','Borras','sebaborras@mail.com','$2b$10$qDEk9xsIdlIoSuKPMvJkUOSGpSRbidXfZlQ4k1lyWTSgWcoFopldu',2),('222','Jose','Calistro','jose@mail.com','$2b$10$v11DOFpGJ.VNCZX9t8M7VON8uerM30.5KBXCZ8I9ZQn93nnN8HuSq',3),('222123','Monica','Leyes','mleyes@mail.com','$2b$10$IaNNuTrAuZyZLO9GPvPmpeoKEG3xetsu6VLaM7dK5VCWXSoCtfyqS',2),('333','Analia','Herrera','aherrera@mail.com','$2b$10$rq3TNW41h2zYAqt0lAvrouKiK9QusxJ8Rc3kZLGvivSxTizlRhDq6',3),('333222','Pedro','Blanco','pblanco@mail.com','$2b$10$zS1ckkPUvfY8Lg4Jv7PSduZ372xfsmX./8p8Y/e2ezdNrZRPbuiOm',2),('39612','Leandro','Heredia','lea@mail.com','$2b$10$udWc/1tbHbt2Dwov.Qt6L.MScwCHJmbzJepbiesDveIs/YGgiO4NC',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-01  3:17:23
