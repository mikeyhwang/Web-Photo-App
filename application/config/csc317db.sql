-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` longtext NOT NULL,
  `fk_authorid` int NOT NULL,
  `fk_postid` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_tousertable_idx` (`fk_authorid`),
  KEY `key_toposttable_idx` (`fk_postid`),
  CONSTRAINT `key_toposttable` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`),
  CONSTRAINT `key_tousertable` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (3,'test comment from curl!',13,13,'2020-12-18 13:32:14'),(4,'I am cool',13,24,'2020-12-18 15:45:26'),(5,'testing comment posting',13,24,'2020-12-18 15:56:15'),(6,'fff',13,24,'2020-12-18 15:57:15'),(7,'actual test',13,24,'2020-12-18 15:59:11'),(8,'very nice\n',13,24,'2020-12-18 15:59:17'),(9,'good job!',13,24,'2020-12-18 15:59:34'),(10,'f',13,24,'2020-12-18 16:00:11'),(11,'yay I\'m done',13,24,'2020-12-18 16:00:17'),(12,'that\'s rough man',13,25,'2020-12-18 16:02:40'),(13,'this was a great trip',13,26,'2020-12-18 17:19:28'),(14,'fairwell',13,26,'2020-12-18 17:19:36');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (6,'5dps','Overwatch','public\\images\\uploads\\505bae9a509bd730dc0cb6bfa5a30c6085208685.png','public/images/uploads/thumbnail-505bae9a509bd730dc0cb6bfa5a30c6085208685.png',0,'2020-12-17 20:39:29',13),(7,'second image','yay','public\\images\\uploads\\9fb77547d3a96a5bf4a674704f63e34db4d424a8.png','public/images/uploads/thumbnail-9fb77547d3a96a5bf4a674704f63e34db4d424a8.png',0,'2020-12-17 20:40:20',13),(8,'5dps','Overwatch','public\\images\\uploads\\5378827076aa8091593e4cdf8387e88d277257fb.png','public/images/uploads/thumbnail-5378827076aa8091593e4cdf8387e88d277257fb.png',0,'2020-12-17 21:28:07',13),(9,'5dps','Overwatch','public\\images\\uploads\\6526fe2e160fcb881e57a2b0bf9d58fbd5bcb2c0.jpeg','public/images/uploads/thumbnail-6526fe2e160fcb881e57a2b0bf9d58fbd5bcb2c0.jpeg',0,'2020-12-17 21:28:29',13),(10,'5dps','Overwatch','public\\images\\uploads\\8362a03cb553d7c17a4d3b60e440b60c214840c7.jpeg','public/images/uploads/thumbnail-8362a03cb553d7c17a4d3b60e440b60c214840c7.jpeg',0,'2020-12-17 21:28:53',13),(11,'5dps','Overwatch','public\\images\\uploads\\de4eaec414cc37ba053698a1d85bd97cfc5bd0bd.jpeg','public/images/uploads/thumbnail-de4eaec414cc37ba053698a1d85bd97cfc5bd0bd.jpeg',0,'2020-12-17 21:29:11',13),(12,'5dps','Overwatch','public\\images\\uploads\\618e3fd30f30d23d15449804e7735c611673e5b0.jpeg','public/images/uploads/thumbnail-618e3fd30f30d23d15449804e7735c611673e5b0.jpeg',0,'2020-12-17 21:29:39',13),(13,'5dps','Overwatch','public\\images\\uploads\\4d4f695e53c049e7d81fc18439bc0f84ede87eb8.png','public/images/uploads/thumbnail-4d4f695e53c049e7d81fc18439bc0f84ede87eb8.png',0,'2020-12-17 21:29:58',13),(14,'5dps','Overwatch','public\\images\\uploads\\4fb0ab2b26a866f5537477fa016fc527b6a0729e.jpeg','public/images/uploads/thumbnail-4fb0ab2b26a866f5537477fa016fc527b6a0729e.jpeg',0,'2020-12-17 21:30:13',13),(15,'5dps','Overwatch','public\\images\\uploads\\6669ac5d041170293ec955dc7bd6e9d79ee5fc68.jpeg','public/images/uploads/thumbnail-6669ac5d041170293ec955dc7bd6e9d79ee5fc68.jpeg',0,'2020-12-17 21:36:31',13),(16,'5dps','Overwatch','public\\images\\uploads\\9c2dae916d344012eee9e931cc4ee60a59d15213.png','public/images/uploads/thumbnail-9c2dae916d344012eee9e931cc4ee60a59d15213.png',0,'2020-12-17 21:36:53',13),(17,'5dps','Overwatch','public\\images\\uploads\\c30a06df34872c4a861299a2f4718b810d4f1d3c.png','public/images/uploads/thumbnail-c30a06df34872c4a861299a2f4718b810d4f1d3c.png',0,'2020-12-17 22:36:08',13),(18,'one','Overwatch','public\\images\\uploads\\80e1ba8632c163b2226d0a6f60b43f7941c2b2b3.png','public/images/uploads/thumbnail-80e1ba8632c163b2226d0a6f60b43f7941c2b2b3.png',0,'2020-12-17 23:13:05',13),(19,'two','Overwatch','public\\images\\uploads\\4816a11f20193b5b2afdcbe34bbada689715ccdd.png','public/images/uploads/thumbnail-4816a11f20193b5b2afdcbe34bbada689715ccdd.png',0,'2020-12-17 23:13:18',13),(20,'three','Overwatch','public\\images\\uploads\\45099399e3e7af5c4ecdfc63756999881eb7a65f.png','public/images/uploads/thumbnail-45099399e3e7af5c4ecdfc63756999881eb7a65f.png',0,'2020-12-17 23:13:30',13),(21,'five','Overwatch','public\\images\\uploads\\92c8226af6170ec71090322b1b49e83e80662903.png','public/images/uploads/thumbnail-92c8226af6170ec71090322b1b49e83e80662903.png',0,'2020-12-17 23:15:50',13),(22,'second image','yay','public\\images\\uploads\\4be8e7898c83cda016dd8bc86a9d97ea4a907e85.jpeg','public/images/uploads/thumbnail-4be8e7898c83cda016dd8bc86a9d97ea4a907e85.jpeg',0,'2020-12-18 09:59:50',13),(23,'Report One','Overwatch','public\\images\\uploads\\20d77eaff74d471b3a40b68e1bf50b4c88f29428.png','public/images/uploads/thumbnail-20d77eaff74d471b3a40b68e1bf50b4c88f29428.png',0,'2020-12-18 10:58:17',14),(24,'second image','yay','public\\images\\uploads\\9f08230b4e6f5138547bf2992fc2cde9a931b0fc.png','public/images/uploads/thumbnail-9f08230b4e6f5138547bf2992fc2cde9a931b0fc.png',0,'2020-12-18 11:25:52',14),(25,'another test','description woo','public\\images\\uploads\\f158ad049b6e058ac70c8e977e52f674550cfb79.png','public/images/uploads/thumbnail-f158ad049b6e058ac70c8e977e52f674550cfb79.png',0,'2020-12-18 15:07:26',13),(26,'one last ride','the final post','public\\images\\uploads\\332bb56ceb7b336d77d138148170f462ad65d849.jpeg','public/images/uploads/thumbnail-332bb56ceb7b336d77d138148170f462ad65d849.jpeg',0,'2020-12-18 17:19:17',13);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'rd','e@e','$2b$15$D4fbeQLXP4XPPacJXQel9eJ5t/boe9nXzMXSFMBrrRqtwnxsnBDj6',0,0,'2020-12-17 16:03:17'),(14,'MCV','MCV@mail.com','$2b$15$kdH5zykJEX2QASPIFe6GWu8bjFYrVbTYf0matdbem5w06Vb6NRdoq',0,0,'2020-12-18 10:38:39'),(15,'1qwewq','adfs@qwea','$2b$15$7ZjkYUZuXyQlinMnpik/uOFnusxaF3zfbvPNqGk1A9rNsRBIDln9u',0,0,'2020-12-18 16:23:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-18 17:43:46
