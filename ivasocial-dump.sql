CREATE DATABASE  IF NOT EXISTS `social` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `social`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: social
-- ------------------------------------------------------
-- Server version	8.0.32

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
  `desc` varchar(200) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  KEY `postId_idx` (`postId`),
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'first try','2023-01-27 14:58:18',2,11),(2,'soo','2023-01-27 15:00:09',2,11),(3,'g','2023-01-27 15:00:55',2,11),(4,'hey','2023-01-27 15:02:00',2,11),(5,'hello','2023-01-27 15:04:15',2,12),(8,'hello','2023-03-04 00:13:01',2,23),(9,'hi!','2023-03-04 17:48:40',6,23);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(200) DEFAULT NULL,
  `userId` int NOT NULL,
  `type` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `galleryUserId_idx` (`userId`),
  CONSTRAINT `galleryUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (36,'167599023789313.png',2,1),(37,'167599023785915478912261843641.jpg',2,2),(38,'167599068821900ce57faeced3eacd975cd1f09d81fbc.jpg',2,1),(39,'16759926432422d-wallpapers-2.jpg',2,2),(40,'167599266503102f1ddcc8712d20f640843c8f8cf9784.jpg',2,1),(41,'1676661261143wallpaper_ori_and_the_blind_forest_01_1920x1080.jpg',2,2),(42,'16766651728611546443244185671079.jpg',3,1),(43,'167666517284656aa1bac35b1b789.jpeg',3,2),(44,'16766652421002f4e369af38392bf70746987518005769ce5e5fb_hq.jpg',3,1),(45,'16766653123591546443244185671079.jpg',3,1),(46,'16766654324791546443244185671079.jpg',3,1),(47,'1676665478355maxresdefault.jpg',3,2),(48,'16766664925844_1.jpg',4,1),(49,'1676666492568185603b68c66af4.jpg',4,2),(50,'1676716686195image0 (3).jpg',4,1),(51,'16767177188701531894985133951199.png',2,1),(52,'16767181751161544027162142771968.jpg',2,1),(53,'16767183410461536758355158334706.jpg',2,1),(54,'16767184017721fecce3b38d8d1e3bdfa4c56b104f871.jpg',2,1),(55,'16767189456238e57bc85244c9ba06189870dc63a0181.jpg',2,1),(56,'16767190563841545502419148969322.jpg',2,1),(57,'167671922808408184b9340b31ce4867e193b5a0985e5.png',2,2),(58,'16767192727405492-cartoon-girl-hair-black-black_hair-2560x1440.jpg',2,2),(59,'16767193216614923.jpg',2,2),(60,'16767193963558913ca83c57c71296be08d500b3914ce.png',2,2),(61,'167671941007641a11b8b1a802f71896258360ed7fb15.jpg',2,2),(62,'1677940202567anime-your-name-kimi-no-na-wa-mitsuha-miyamizu-wallpaper-preview.jpg',5,1),(63,'1677940202551gglight.png',5,2),(64,'1677940219581gglight.png',5,1),(65,'1677940219573anime-your-name-kimi-no-na-wa-mitsuha-miyamizu-wallpaper-preview.jpg',5,2),(66,'1677945994298339285-sepik.jpg',6,2),(67,'1677945994314154117858316628881.jpg',6,1);
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `likeUserId_idx` (`userId`),
  KEY `likePostId_idx` (`postId`),
  CONSTRAINT `likePostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likeUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (68,2,8),(70,3,4),(76,4,12),(80,2,16),(83,2,12),(84,2,23),(85,6,18),(86,6,23);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,'Hello from Postman!',NULL,3,'2023-01-26 20:20:39'),(5,'test from react',NULL,2,'2023-01-27 12:56:03'),(6,'smth beautiful','16748187842601551515559174238186.jpg',2,'2023-01-27 13:26:24'),(7,'l','167481983208002f1ddcc8712d20f640843c8f8cf97841.jpg',2,'2023-01-27 13:43:52'),(8,'tea party','16748198994661489587910196738445.png',2,'2023-01-27 13:44:59'),(9,'magic','1674819960590thumb-1920-878746main2.png',2,'2023-01-27 13:46:00'),(10,'gg wp','1674820124636ddd87503a41d7d9c0e81debb1229b8ec.jpg',2,'2023-01-27 13:48:44'),(11,'me','167482058146313.png',2,'2023-01-27 13:56:21'),(12,'post','16748246457771538932262191579385.jpg',2,'2023-01-27 15:04:05'),(16,'like to play it after school','1676665682877rocket-league-hd-wallpapers-33579-2383215.jpg',3,'2023-02-17 22:28:02'),(18,'wanna buy them','1676665753246naushniki_stol_zvuk_121712_1920x1080.jpg',3,'2023-02-17 22:29:13'),(23,'hey wassup',NULL,4,'2023-02-17 22:41:43'),(33,'Hi? I\'m new here.','1677942738713shutterstock_501090175-1024x678.jpg',6,'2023-03-04 17:12:18');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerUserId` int NOT NULL,
  `followedUserId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `followerUser_idx` (`followerUserId`),
  KEY `followedUser_idx` (`followedUserId`),
  CONSTRAINT `followedUser` FOREIGN KEY (`followedUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followerUser` FOREIGN KEY (`followerUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationships`
--

LOCK TABLES `relationships` WRITE;
/*!40000 ALTER TABLE `relationships` DISABLE KEYS */;
INSERT INTO `relationships` VALUES (25,2,3),(28,4,2),(31,4,3),(32,2,4),(33,6,3),(34,6,4);
/*!40000 ALTER TABLE `relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(45) NOT NULL,
  `coverPic` varchar(300) DEFAULT 'defcover.jpeg',
  `profilePic` varchar(300) DEFAULT 'defpic.jpeg',
  `status` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'test2','test2@gmail.com','$2a$10$IhRSJAYt98hG5mVFnmLZMeu7wHijRmr9Z5F/f5LUo2DSkUsmf/hAe','Iva Lind','167671941007641a11b8b1a802f71896258360ed7fb15.jpg','16767190563841545502419148969322.jpg','hello motorola'),(3,'test3','test3@gmail.com','$2a$10$18EbbAhsQ8HOllxut9Za0u4VL4l4/EYATT4hEogkZ/Dl.E4hpjgc6','Aaron Winterrrrr','1676665478355maxresdefault.jpg','16766654324791546443244185671079.jpg','nobody here'),(4,'test4','test4@gmail.com','$2a$10$W9xCSlrO1d/Z2Z.vaaJ.yemQNCCtnDExcUJ66GI6mX8E/QqxA/2YK','Opra Garden','1676666492568185603b68c66af4.jpg','1676716686195image0 (3).jpg','heeh'),(5,'test5','test5gmail.com','$2a$10$4Qht8FEteSq6R.FZCUwIYeHxddCqo9EybY0n64ZSBl68S5ar01TDC','Jenny Wiskons','1677940219573anime-your-name-kimi-no-na-wa-mitsuha-miyamizu-wallpaper-preview.jpg','1677940219581gglight.png','I\'m here'),(6,'test6','test6@gmail.com','$2a$10$eMKadxkAnZ30Vkw50kvy5u4jCONQLToQt6YdhxYy9ZZUlqe3e5UwS','Tom Holland','1677945994298339285-sepik.jpg','1677945994314154117858316628881.jpg','my favourite day is Friday'),(7,'test7','test7@gmail.com','$2a$10$oFt37PpcAgT2IG9Qow90a.xiX6wPSZh0dBVo7K2545cPxqYYiU0Ku','Dan Jeffry','defcover.jpeg','defpic.jpeg',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'social'
--

--
-- Dumping routines for database 'social'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-12 17:35:50
