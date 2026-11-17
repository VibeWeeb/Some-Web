-- MySQL dump 10.13  Distrib 26.10.0, for Linux (x86_64)
--
-- Host: localhost    Database: kinerjaguru
-- ------------------------------------------------------
-- Server version	26.10.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dataguru`
--

DROP TABLE IF EXISTS `dataguru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dataguru` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'Teacher name',
  `nip` varchar(12) NOT NULL,
  `email` varchar(100) NOT NULL COMMENT 'Teacher Email',
  `phonenumber` varchar(13) NOT NULL,
  `address` varchar(100) NOT NULL,
  `pelajaran` varchar(50) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dataguru`
--

LOCK TABLES `dataguru` WRITE;
/*!40000 ALTER TABLE `dataguru` DISABLE KEYS */;
INSERT INTO `dataguru` VALUES (63,'Konci','123456789012','zxcv@fe.fsdsss','0895808850506','adsfadsfadsfadfsdfsadfs','bahasa','1794927348917-786729612.jpg'),(64,'adsfcxzv','12334123','zxcv@fe.fsd','08957977212','12edsafadsfasxdasf','sejarah indonesia','1794927356262-485930774.jpeg'),(65,'dgfzsvadsv','1232141234','adsfasf@fdsa.asdf','12132412341','adfasdfadsxc','ipa','1794927366357-47859265.jpeg'),(66,'fadsfad','431245342','asaa@dsaf.asdf','12312332411','adsfasdfadsf',NULL,''),(67,'23dsafdsaadfs','12312321','asdfaf@adf.as','12123123123','aasdfasdfasdfasdf',NULL,''),(68,'adsfcxzv','123214','asdf@gmail.com','12334512413','asdfasdfadsdsf',NULL,''),(69,'dasfascvcxv','123123','asdfasdf@gmail.com','12332141234','asdfasdf',NULL,''),(72,'asdfsxa','12334234','asdffadsf@adsf.asdfa','12343132132','asdfasxafsdfadsf',NULL,''),(79,'adfads','123451234','zxcv@fe.fsd','08957977212','adsfasdfadsfads',NULL,''),(80,'asdfxvav','12312312312','zxcv@fe.fsd','08957977212','zxcvzcxvzxcv',NULL,''),(81,'dsafavcxvz','2345234','asdf@adf.adsfxx','456251341234','dsafaewfqqqwefasdfasdfassdf','bahasa',NULL),(82,'testing image','5324234','tss@sdfs.ss','121237891236','sebuah text kok ada di tengah yak!','darkstar','1794918298478-17921736.png');
/*!40000 ALTER TABLE `dataguru` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penilaian`
--

DROP TABLE IF EXISTS `penilaian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penilaian` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_guru` int NOT NULL,
  `pedagogik` int NOT NULL,
  `profesional` int NOT NULL,
  `sosial` int NOT NULL,
  `kepribadian` int NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_guru` (`id_guru`),
  CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`id_guru`) REFERENCES `dataguru` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penilaian`
--

LOCK TABLES `penilaian` WRITE;
/*!40000 ALTER TABLE `penilaian` DISABLE KEYS */;
/*!40000 ALTER TABLE `penilaian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','tost','gene','gono');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-17 14:59:26
