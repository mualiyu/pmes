-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: pmes
-- ------------------------------------------------------
-- Server version	8.4.6-0ubuntu0.25.04.3

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_capable_id` bigint unsigned NOT NULL,
  `activity_capable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,1,5,'New project','\"Demo Project\" was created by Prince Murphy',1,'App\\Models\\Project','2025-10-06 08:18:13'),(3,1,5,'New task','\"Et quisquam error saepe.\" was created by Prince Murphy',1,'App\\Models\\Task','2025-10-06 08:18:14'),(4,1,5,'New task','\"Accusamus minima voluptatibus nemo alias.\" was created by Prince Murphy',2,'App\\Models\\Task','2025-10-06 08:18:14'),(5,1,5,'New task','\"Quia non earum quam.\" was created by Prince Murphy',3,'App\\Models\\Task','2025-10-06 08:18:15'),(6,1,5,'New task','\"Qui itaque adipisci iure.\" was created by Prince Murphy',4,'App\\Models\\Task','2025-10-06 08:18:15'),(7,1,5,'New task','\"Repellat omnis sunt mollitia aut at totam velit.\" was created by Prince Murphy',5,'App\\Models\\Task','2025-10-06 08:18:16'),(8,1,5,'New task','\"Qui optio vitae ducimus harum excepturi qui et.\" was created by Prince Murphy',6,'App\\Models\\Task','2025-10-06 08:18:16'),(9,1,5,'New task','\"At aut qui molestiae temporibus delectus neque repudiandae.\" was created by Prince Murphy',7,'App\\Models\\Task','2025-10-06 08:18:17'),(10,1,5,'New task','\"Nostrum exercitationem quam corrupti accusamus mollitia ipsum.\" was created by Prince Murphy',8,'App\\Models\\Task','2025-10-06 08:18:17'),(11,1,5,'New task','\"Nemo tenetur sapiente reiciendis et et consequatur dolor.\" was created by Prince Murphy',9,'App\\Models\\Task','2025-10-06 08:18:18'),(12,1,5,'New task','\"Ullam ipsa qui molestias ipsum excepturi quia.\" was created by Prince Murphy',10,'App\\Models\\Task','2025-10-06 08:18:18'),(13,1,5,'New task','\"A expedita sequi expedita est a molestiae labore facilis.\" was created by Prince Murphy',11,'App\\Models\\Task','2025-10-06 08:18:19'),(14,1,5,'New task','\"Numquam qui impedit iste qui ea.\" was created by Prince Murphy',12,'App\\Models\\Task','2025-10-06 08:18:19'),(15,1,5,'New task','\"Magni nobis blanditiis aut reiciendis cum sed.\" was created by Prince Murphy',13,'App\\Models\\Task','2025-10-06 08:18:20'),(16,1,5,'New task','\"Assumenda assumenda dolores quas a.\" was created by Prince Murphy',14,'App\\Models\\Task','2025-10-06 08:18:20'),(17,1,5,'New task','\"Maxime qui alias alias praesentium.\" was created by Prince Murphy',15,'App\\Models\\Task','2025-10-06 08:18:21'),(18,1,5,'New task','\"Voluptatibus dicta enim sit quis.\" was created by Prince Murphy',16,'App\\Models\\Task','2025-10-06 08:18:22'),(19,1,5,'New task','\"Repudiandae non ut explicabo eos rerum voluptatem impedit.\" was created by Prince Murphy',17,'App\\Models\\Task','2025-10-06 08:18:22'),(20,1,5,'New task','\"Enim incidunt eveniet sit.\" was created by Prince Murphy',18,'App\\Models\\Task','2025-10-06 08:18:22');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `task_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumb` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audits`
--

DROP TABLE IF EXISTS `audits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_id` bigint unsigned NOT NULL,
  `old_values` text COLLATE utf8mb4_unicode_ci,
  `new_values` text COLLATE utf8mb4_unicode_ci,
  `url` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(1023) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audits_auditable_type_auditable_id_index` (`auditable_type`,`auditable_id`),
  KEY `audits_user_id_user_type_index` (`user_id`,`user_type`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audits`
--

LOCK TABLES `audits` WRITE;
/*!40000 ALTER TABLE `audits` DISABLE KEYS */;
INSERT INTO `audits` VALUES (1,'App\\Models\\User',5,'updated','App\\Models\\OwnerCompany',1,'{\"country_id\":115,\"name\":\"Skiles PLC\",\"address\":\"48704 Volkman Mountains\",\"postal_code\":\"28947-9538\",\"city\":\"Adamstown\",\"email\":\"jackeline.rowe@brown.com\",\"phone\":\"510.906.7409\",\"web\":\"https:\\/\\/company.com\"}','{\"country_id\":\"161\",\"name\":\"NASENI\",\"address\":\"17 M. S. Haruna Avenue, Idu Industrial Area P.M.B. 391, Garki, Abuja, Nigeria. 900106\",\"postal_code\":\"900106\",\"city\":\"Abuja\",\"email\":\"admin@naseni.gov.ng\",\"phone\":\"08123456789\",\"web\":\"https:\\/\\/naseni.gov.ng\"}','http://127.0.0.1:8000/settings/company','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 09:23:31','2025-10-07 09:23:31'),(2,'App\\Models\\User',5,'updated','App\\Models\\ClientCompany',4,'{\"archived_at\":\"2025-10-07 10:23:54\"}','{\"archived_at\":null}','http://127.0.0.1:8000/clients/companies/4/restore','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 09:24:01','2025-10-07 09:24:01'),(3,'App\\Models\\User',5,'updated','App\\Models\\ClientCompany',2,'{\"code\":null,\"name\":\"Erdman-Casper\",\"email\":\"lcronin@schaden.com\",\"phone\":\"+1-408-681-5642\"}','{\"code\":\"AAM\",\"name\":\"AAM LTD\",\"email\":\"admin@aam.com\",\"phone\":\"+234 8188778899\"}','http://127.0.0.1:8000/clients/companies/2','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 09:27:22','2025-10-07 09:27:22'),(4,'App\\Models\\User',5,'updated','App\\Models\\ClientCompany',1,'{\"code\":null,\"name\":\"Ferry, Maggio and Douglas\",\"email\":\"hbrown@yahoo.com\",\"phone\":\"1-615-842-2749\"}','{\"code\":\"TheCans\",\"name\":\"The CANs Park LTD\",\"email\":\"admin@thecans.ng\",\"phone\":\"+2348167233376\"}','http://127.0.0.1:8000/clients/companies/1','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 09:28:25','2025-10-07 09:28:25'),(5,'App\\Models\\User',5,'updated','App\\Models\\OwnerCompany',1,'{\"logo\":null}','{\"logo\":\"\\/storage\\/company\\/logo.png\"}','http://127.0.0.1:8000/settings/company','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 09:33:53','2025-10-07 09:33:53'),(6,'App\\Models\\User',5,'updated','App\\Models\\User',5,'{\"name\":\"Prince Murphy\",\"email\":\"admin@mail.com\",\"phone\":\"+1 (808) 972-2524\",\"job_title\":\"Owner\"}','{\"name\":\"Muktar Usman\",\"email\":\"mualiyuoox@gmail.com\",\"phone\":\"+234 8167236629\",\"job_title\":\"Dev\"}','http://127.0.0.1:8000/account/profile?5=','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 09:35:38','2025-10-07 09:35:38'),(7,'App\\Models\\User',5,'updated','App\\Models\\User',5,'{\"job_title\":\"Dev\"}','{\"job_title\":\"System Admin\"}','http://127.0.0.1:8000/account/profile?5=','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:10:13','2025-10-07 10:10:13'),(8,'App\\Models\\User',5,'created','App\\Models\\Project',3,'[]','{\"name\":\"Test\",\"description\":\"Testing\",\"default_pricing_type\":\"hourly\",\"client_company_id\":\"2\",\"rate\":0,\"id\":3}','http://127.0.0.1:8000/projects','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:12:43','2025-10-07 10:12:43'),(9,'App\\Models\\User',5,'created','App\\Models\\TaskGroup',13,'[]','{\"name\":\"Backlog\",\"project_id\":3,\"order_column\":13,\"id\":13}','http://127.0.0.1:8000/projects','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:12:43','2025-10-07 10:12:43'),(10,'App\\Models\\User',5,'created','App\\Models\\TaskGroup',14,'[]','{\"name\":\"Todo\",\"project_id\":3,\"order_column\":14,\"id\":14}','http://127.0.0.1:8000/projects','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:12:43','2025-10-07 10:12:43'),(11,'App\\Models\\User',5,'created','App\\Models\\TaskGroup',15,'[]','{\"name\":\"In progress\",\"project_id\":3,\"order_column\":15,\"id\":15}','http://127.0.0.1:8000/projects','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:12:43','2025-10-07 10:12:43'),(12,'App\\Models\\User',5,'created','App\\Models\\TaskGroup',16,'[]','{\"name\":\"QA\",\"project_id\":3,\"order_column\":16,\"id\":16}','http://127.0.0.1:8000/projects','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:12:44','2025-10-07 10:12:44'),(13,'App\\Models\\User',5,'created','App\\Models\\TaskGroup',17,'[]','{\"name\":\"Done\",\"project_id\":3,\"order_column\":17,\"id\":17}','http://127.0.0.1:8000/projects','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:12:44','2025-10-07 10:12:44'),(14,'App\\Models\\User',5,'created','App\\Models\\TaskGroup',18,'[]','{\"name\":\"Deployed\",\"project_id\":3,\"order_column\":18,\"id\":18}','http://127.0.0.1:8000/projects','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',NULL,'2025-10-07 10:12:44','2025-10-07 10:12:44');
/*!40000 ALTER TABLE `audits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_companies`
--

DROP TABLE IF EXISTS `client_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_companies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` bigint unsigned DEFAULT NULL,
  `currency_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `web` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `swift` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_companies`
--

LOCK TABLES `client_companies` WRITE;
/*!40000 ALTER TABLE `client_companies` DISABLE KEYS */;
INSERT INTO `client_companies` VALUES (1,'TheCans',96,97,'The CANs Park LTD','752 Janick Trail\nKerlukeland, WA 78089-2256','74786-7227','Port Hershel','admin@thecans.ng','+2348167233376','https://company.com','PS77RCQQDZ1X10Z7JI4024M970AXW','SPUEIMPH','111111111','222222222','333333333','2025-10-06 08:18:05','2025-10-07 09:28:25',NULL),(2,'AAM',11,97,'AAM LTD','57301 Isac Street Apt. 720\nJanessaside, VA 52107-1816','03701-8085','West Abbyside','admin@aam.com','+234 8188778899','https://company.com','EG151618065033240703620497005','BJKDZLLU','111111111','222222222','333333333','2025-10-06 08:18:11','2025-10-07 09:27:22',NULL);
/*!40000 ALTER TABLE `client_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `task_id` bigint unsigned NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Afghanistan'),(2,'Albania'),(3,'Antarctica'),(4,'Algeria'),(5,'American Samoa'),(6,'Andorra'),(7,'Angola'),(8,'Antigua and Barbuda'),(9,'Azerbaijan'),(10,'Argentina'),(11,'Australia'),(12,'Austria'),(13,'Bahamas'),(14,'Bahrain'),(15,'Bangladesh'),(16,'Armenia'),(17,'Barbados'),(18,'Belgium'),(19,'Bermuda'),(20,'Bhutan'),(21,'Bolivia, Plurinational State of'),(22,'Bosnia and Herzegovina'),(23,'Botswana'),(24,'Bouvet Island'),(25,'Brazil'),(26,'Belize'),(27,'British Indian Ocean Territory'),(28,'Solomon Islands'),(29,'Virgin Islands, British'),(30,'Brunei Darussalam'),(31,'Bulgaria'),(32,'Myanmar'),(33,'Burundi'),(34,'Belarus'),(35,'Cambodia'),(36,'Cameroon'),(37,'Canada'),(38,'Cape Verde'),(39,'Cayman Islands'),(40,'Central African Republic'),(41,'Sri Lanka'),(42,'Chad'),(43,'Chile'),(44,'China'),(45,'Taiwan, Province of China'),(46,'Christmas Island'),(47,'Cocos (Keeling) Islands'),(48,'Colombia'),(49,'Comoros'),(50,'Mayotte'),(51,'Congo'),(52,'Congo, the Democratic Republic of the'),(53,'Cook Islands'),(54,'Costa Rica'),(55,'Croatia'),(56,'Cuba'),(57,'Cyprus'),(58,'Czechia'),(59,'Benin'),(60,'Denmark'),(61,'Dominica'),(62,'Dominican Republic'),(63,'Ecuador'),(64,'El Salvador'),(65,'Equatorial Guinea'),(66,'Ethiopia'),(67,'Eritrea'),(68,'Estonia'),(69,'Faroe Islands'),(70,'Falkland Islands (Malvinas)'),(71,'South Georgia and the South Sandwich Islands'),(72,'Fiji'),(73,'Finland'),(74,'Åland Islands'),(75,'France'),(76,'French Guiana'),(77,'French Polynesia'),(78,'French Southern Territories'),(79,'Djibouti'),(80,'Gabon'),(81,'Georgia'),(82,'Gambia'),(83,'Palestine'),(84,'Germany'),(85,'Ghana'),(86,'Gibraltar'),(87,'Kiribati'),(88,'Greece'),(89,'Greenland'),(90,'Grenada'),(91,'Guadeloupe'),(92,'Guam'),(93,'Guatemala'),(94,'Guinea'),(95,'Guyana'),(96,'Haiti'),(97,'Heard Island and McDonald Islands'),(98,'Holy See (Vatican City State)'),(99,'Honduras'),(100,'Hong Kong'),(101,'Hungary'),(102,'Iceland'),(103,'India'),(104,'Indonesia'),(105,'Iran, Islamic Republic of'),(106,'Iraq'),(107,'Ireland'),(108,'Israel'),(109,'Italy'),(110,'Côte d\'Ivoire'),(111,'Jamaica'),(112,'Japan'),(113,'Kazakhstan'),(114,'Jordan'),(115,'Kenya'),(116,'Korea, Democratic People\'s Republic of'),(117,'Korea, Republic of'),(118,'Kuwait'),(119,'Kyrgyzstan'),(120,'Lao People\'s Democratic Republic'),(121,'Lebanon'),(122,'Lesotho'),(123,'Latvia'),(124,'Liberia'),(125,'Libya'),(126,'Liechtenstein'),(127,'Lithuania'),(128,'Luxembourg'),(129,'Macao'),(130,'Madagascar'),(131,'Malawi'),(132,'Malaysia'),(133,'Maldives'),(134,'Mali'),(135,'Malta'),(136,'Martinique'),(137,'Mauritania'),(138,'Mauritius'),(139,'Mexico'),(140,'Monaco'),(141,'Mongolia'),(142,'Moldova, Republic of'),(143,'Montenegro'),(144,'Montserrat'),(145,'Morocco'),(146,'Mozambique'),(147,'Oman'),(148,'Namibia'),(149,'Nauru'),(150,'Nepal'),(151,'Netherlands'),(152,'Curaçao'),(153,'Aruba'),(154,'Sint Maarten (Dutch part)'),(155,'Bonaire, Sint Eustatius and Saba'),(156,'New Caledonia'),(157,'Vanuatu'),(158,'New Zealand'),(159,'Nicaragua'),(160,'Niger'),(161,'Nigeria'),(162,'Niue'),(163,'Norfolk Island'),(164,'Norway'),(165,'Northern Mariana Islands'),(166,'United States Minor Outlying Islands'),(167,'Micronesia, Federated States of'),(168,'Marshall Islands'),(169,'Palau'),(170,'Pakistan'),(171,'Panama'),(172,'Papua New Guinea'),(173,'Paraguay'),(174,'Peru'),(175,'Philippines'),(176,'Pitcairn'),(177,'Poland'),(178,'Portugal'),(179,'Guinea-Bissau'),(180,'Timor-Leste'),(181,'Puerto Rico'),(182,'Qatar'),(183,'Réunion'),(184,'Romania'),(185,'Russian Federation'),(186,'Rwanda'),(187,'Saint Barthélemy'),(188,'Saint Helena, Ascension and Tristan da Cunha'),(189,'Saint Kitts and Nevis'),(190,'Anguilla'),(191,'Saint Lucia'),(192,'Saint Martin (French part)'),(193,'Saint Pierre and Miquelon'),(194,'Saint Vincent and the Grenadines'),(195,'San Marino'),(196,'Sao Tome and Principe'),(197,'Saudi Arabia'),(198,'Senegal'),(199,'Serbia'),(200,'Seychelles'),(201,'Sierra Leone'),(202,'Singapore'),(203,'Slovakia'),(204,'Viet Nam'),(205,'Slovenia'),(206,'Somalia'),(207,'South Africa'),(208,'Zimbabwe'),(209,'Spain'),(210,'South Sudan'),(211,'Sudan'),(212,'Western Sahara'),(213,'Suriname'),(214,'Svalbard and Jan Mayen'),(215,'Eswatini'),(216,'Sweden'),(217,'Switzerland'),(218,'Syrian Arab Republic'),(219,'Tajikistan'),(220,'Thailand'),(221,'Togo'),(222,'Tokelau'),(223,'Tonga'),(224,'Trinidad and Tobago'),(225,'United Arab Emirates'),(226,'Tunisia'),(227,'Turkey'),(228,'Turkmenistan'),(229,'Turks and Caicos Islands'),(230,'Tuvalu'),(231,'Uganda'),(232,'Ukraine'),(233,'North Macedonia'),(234,'Egypt'),(235,'United Kingdom'),(236,'Guernsey'),(237,'Jersey'),(238,'Isle of Man'),(239,'Tanzania, United Republic of'),(240,'United States'),(241,'Virgin Islands, U.S.'),(242,'Burkina Faso'),(243,'Uruguay'),(244,'Uzbekistan'),(245,'Venezuela, Bolivarian Republic of'),(246,'Wallis and Futuna'),(247,'Samoa'),(248,'Yemen'),(249,'Zambia');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currencies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `symbol` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `decimals` smallint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
INSERT INTO `currencies` VALUES (1,'Afghani','AFN','؋',2),(2,'Lek','ALL','Lek',2),(3,'Netherlands Antillian Guilder','ANG','ƒ',2),(4,'Argentine Peso','ARS','$',2),(5,'Australian Dollar','AUD','$',2),(6,'Aruban Guilder','AWG','ƒ',2),(7,'Azerbaijanian Manat','AZN','ман',2),(8,'Convertible Marks','BAM','KM',2),(9,'Bangladeshi Taka','BDT','৳',2),(10,'Barbados Dollar','BBD','$',2),(11,'Bulgarian Lev','BGN','лв',2),(12,'Bermudian Dollar','BMD','$',2),(13,'Brunei Dollar','BND','$',2),(14,'BOV Boliviano Mvdol','BOB','$b',2),(15,'Brazilian Real','BRL','R$',2),(16,'Bahamian Dollar','BSD','$',2),(17,'Pula','BWP','P',2),(18,'Belarussian Ruble','BYR','₽',2),(19,'Belize Dollar','BZD','BZ$',2),(20,'Canadian Dollar','CAD','$',2),(21,'Swiss Franc','CHF','CHF',2),(22,'CLF Chilean Peso Unidades de fomento','CLP','$',0),(23,'Yuan Renminbi','CNY','¥',2),(24,'COU Colombian Peso Unidad de Valor Real','COP','$',2),(25,'Costa Rican Colon','CRC','₡',2),(26,'CUC Cuban Peso Peso Convertible','CUP','₱',2),(27,'Czech Koruna','CZK','Kč',2),(28,'Danish Krone','DKK','kr',2),(29,'Dominican Peso','DOP','RD$',2),(30,'Egyptian Pound','EGP','£',2),(31,'Euro','EUR','€',2),(32,'Fiji Dollar','FJD','$',2),(33,'Falkland Islands Pound','FKP','£',2),(34,'Pound Sterling','GBP','£',2),(35,'Gibraltar Pound','GIP','£',2),(36,'Quetzal','GTQ','Q',2),(37,'Guyana Dollar','GYD','$',2),(38,'Hong Kong Dollar','HKD','$',2),(39,'Lempira','HNL','L',2),(40,'Croatian Kuna','HRK','kn',2),(41,'Forint','HUF','Ft',2),(42,'Rupiah','IDR','Rp',2),(43,'New Israeli Sheqel','ILS','₪',2),(44,'Iranian Rial','IRR','﷼',2),(45,'Iceland Krona','ISK','kr',0),(46,'Jamaican Dollar','JMD','J$',2),(47,'Yen','JPY','¥',0),(48,'Som','KGS','лв',2),(49,'Riel','KHR','៛',2),(50,'North Korean Won','KPW','₩',2),(51,'Won','KRW','₩',0),(52,'Cayman Islands Dollar','KYD','$',2),(53,'Tenge','KZT','лв',2),(54,'Kip','LAK','₭',0),(55,'Lebanese Pound','LBP','£',2),(56,'Sri Lanka Rupee','LKR','₨',2),(57,'Liberian Dollar','LRD','$',2),(58,'Lithuanian Litas','LTL','Lt',2),(59,'Latvian Lats','LVL','Ls',2),(60,'Moroccan Dirham','MAD','Dhs',2),(61,'Denar','MKD','ден',2),(62,'Tugrik','MNT','₮',2),(63,'Mauritius Rupee','MUR','₨',2),(64,'MXV Mexican Peso Mexican Unidad de Inversion (UDI]','MXN','$',2),(65,'Malaysian Ringgit','MYR','RM',2),(66,'Metical','MZN','MT',2),(67,'Naira','NGN','₦',2),(68,'Cordoba Oro','NIO','C$',2),(69,'Norwegian Krone','NOK','kr',2),(70,'Nepalese Rupee','NPR','₨',2),(71,'New Zealand Dollar','NZD','$',2),(72,'Rial Omani','OMR','﷼',3),(73,'USD Balboa US Dollar','PAB','B/.',2),(74,'Nuevo Sol','PEN','S/.',2),(75,'Philippine Peso','PHP','Php',2),(76,'Pakistan Rupee','PKR','₨',2),(77,'Zloty','PLN','zł',2),(78,'Guarani','PYG','Gs',0),(79,'Qatari Rial','QAR','﷼',2),(80,'New Leu','RON','lei',2),(81,'Serbian Dinar','RSD','Дин.',2),(82,'Russian Ruble','RUB','руб',2),(83,'Saudi Riyal','SAR','﷼',2),(84,'Solomon Islands Dollar','SBD','$',2),(85,'Seychelles Rupee','SCR','₨',2),(86,'Swedish Krona','SEK','kr',2),(87,'Singapore Dollar','SGD','$',2),(88,'Saint Helena Pound','SHP','£',2),(89,'Somali Shilling','SOS','S',2),(90,'Surinam Dollar','SRD','$',2),(91,'USD El Salvador Colon US Dollar','SVC','$',2),(92,'Syrian Pound','SYP','£',2),(93,'Baht','THB','฿',2),(94,'Turkish Lira','TRY','TL',2),(95,'Trinidad and Tobago Dollar','TTD','TT$',2),(96,'New Taiwan Dollar','TWD','NT$',2),(97,'Hryvnia','UAH','₴',2),(98,'US Dollar','USD','$',2),(99,'UYI Uruguay Peso en Unidades Indexadas','UYU','$U',0),(100,'Uzbekistan Sum','UZS','лв',2),(101,'Bolivar Fuerte','VEF','Bs',2),(102,'Dong','VND','₫',2),(103,'East Caribbean Dollar','XCD','$',2),(104,'Yemeni Rial','YER','﷼',2),(105,'Rand','ZAR','R',2);
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL COMMENT 'user_id',
  `favoriteable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `favoriteable_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `favorites_favoriteable_type_favoriteable_id_index` (`favoriteable_type`,`favoriteable_id`),
  KEY `favorites_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_company_id` bigint unsigned NOT NULL,
  `created_by_user_id` bigint unsigned NOT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `amount` int unsigned NOT NULL,
  `amount_with_tax` int unsigned DEFAULT NULL,
  `hourly_rate` int unsigned DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoices_created_by_user_id_foreign` (`created_by_user_id`),
  CONSTRAINT `invoices_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `label_task`
--

DROP TABLE IF EXISTS `label_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `label_task` (
  `label_id` bigint unsigned NOT NULL,
  `task_id` bigint unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label_task`
--

LOCK TABLES `label_task` WRITE;
/*!40000 ALTER TABLE `label_task` DISABLE KEYS */;
INSERT INTO `label_task` VALUES (5,2),(4,2),(1,2),(2,3),(5,3),(3,3),(2,4),(2,5),(4,5),(5,5),(3,6),(1,6),(5,6),(5,7),(5,8),(2,8),(3,9),(1,9),(4,10),(2,10),(3,10),(4,11),(2,12),(1,12),(5,12),(2,13),(3,13),(5,14),(2,14),(2,15),(4,15),(3,15),(3,16),(4,16),(1,16),(5,17),(4,17),(5,19),(4,19),(2,19),(2,25),(3,25),(4,25),(4,26),(3,26),(5,26),(3,27),(2,27),(5,27),(4,29),(5,29),(4,31),(2,31),(1,32);
/*!40000 ALTER TABLE `label_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labels`
--

DROP TABLE IF EXISTS `labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labels`
--

LOCK TABLES `labels` WRITE;
/*!40000 ALTER TABLE `labels` DISABLE KEYS */;
INSERT INTO `labels` VALUES (1,'Confirmed','#37B24D',NULL,NULL,NULL),(2,'Estimate','#AE3EC9',NULL,NULL,NULL),(3,'Blocked','#F03E3E',NULL,NULL,NULL),(4,'Bug','#D6336C',NULL,NULL,NULL),(5,'Rework','#F76707',NULL,NULL,NULL);
/*!40000 ALTER TABLE `labels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_100000_create_password_reset_tokens_table',1),(2,'2018_12_14_000000_create_favorites_table',1),(3,'2019_12_14_000001_create_personal_access_tokens_table',1),(4,'2023_10_26_165503_create_permission_tables',1),(5,'2023_10_31_105255_create_jobs_table',1),(6,'2023_10_31_113749_create_failed_jobs_table',1),(7,'2023_11_01_120111_create_labels_table',1),(8,'2023_11_01_182514_add_archived_at_to_roles',1),(9,'2023_11_02_153937_create_owner_companies_table',1),(10,'2023_11_02_165827_create_currencies_table',1),(11,'2023_11_03_134217_create_countries_table',1),(12,'2023_11_03_190241_create_client_companies_table',1),(13,'2023_11_03_190242_create_users_table',1),(14,'2023_11_04_104543_create_client_company_pivot_table',1),(15,'2023_11_06_094257_create_projects_table',1),(16,'2023_11_06_153749_create_project_user_access',1),(17,'2023_11_07_131704_create_task_groups_table',1),(18,'2023_11_07_192734_create_tasks_table',1),(19,'2023_11_10_144123_create_label_task_pivot_table',1),(20,'2023_11_15_220141_create_subscribe_task',1),(21,'2023_11_15_220222_create_attachments',1),(22,'2023_11_16_144304_create_notifications_table',1),(23,'2023_11_17_211110_create_time_logs_table',1),(24,'2023_11_18_193550_create_comments_table',1),(25,'2023_11_28_142456_create_audits_table',1),(26,'2023_11_28_155542_create_activities',1),(27,'2023_12_04_145458_create_invoices_table',1),(28,'2024_01_30_190158_add_rate_to_projects',1),(29,'2025_03_31_193719_add_default_pricing_type_to_projects',1),(30,'2025_03_31_204815_add_fixed_price_to_tasks',1),(31,'2025_03_31_210544_add_pricing_type_to_tasks',1),(32,'2025_06_02_100803_add_code_to_client_companies_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(2,'App\\Models\\User',2),(3,'App\\Models\\User',3),(5,'App\\Models\\User',4),(6,'App\\Models\\User',5),(5,'App\\Models\\User',6),(4,'App\\Models\\User',7),(5,'App\\Models\\User',8),(1,'App\\Models\\User',9),(3,'App\\Models\\User',10),(5,'App\\Models\\User',11),(5,'App\\Models\\User',12),(1,'App\\Models\\User',13),(5,'App\\Models\\User',14),(4,'App\\Models\\User',15),(1,'App\\Models\\User',16),(1,'App\\Models\\User',17),(3,'App\\Models\\User',18),(1,'App\\Models\\User',19),(1,'App\\Models\\User',20),(1,'App\\Models\\User',21),(1,'App\\Models\\User',22),(1,'App\\Models\\User',23),(4,'App\\Models\\User',24),(1,'App\\Models\\User',25),(4,'App\\Models\\User',26),(4,'App\\Models\\User',27),(4,'App\\Models\\User',28),(4,'App\\Models\\User',29),(4,'App\\Models\\User',30);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint unsigned NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_company`
--

DROP TABLE IF EXISTS `owner_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_company` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `country_id` bigint unsigned DEFAULT NULL,
  `currency_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `web` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `swift` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_company`
--

LOCK TABLES `owner_company` WRITE;
/*!40000 ALTER TABLE `owner_company` DISABLE KEYS */;
INSERT INTO `owner_company` VALUES (1,161,97,'NASENI','/storage/company/logo.png','17 M. S. Haruna Avenue, Idu Industrial Area P.M.B. 391, Garki, Abuja, Nigeria. 900106','900106','Abuja','admin@naseni.gov.ng','08123456789','https://naseni.gov.ng','AL5491177982H81G14811292411E','NYEPKC8PZYF','111111111','222222222','333333333',1000);
/*!40000 ALTER TABLE `owner_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'view users','web','2025-10-06 08:17:45','2025-10-06 08:17:45'),(2,'view user rate','web','2025-10-06 08:17:45','2025-10-06 08:17:45'),(3,'create user','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(4,'edit user','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(5,'archive user','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(6,'restore user','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(7,'view labels','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(8,'create label','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(9,'edit label','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(10,'archive label','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(11,'restore label','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(12,'view roles','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(13,'create role','web','2025-10-06 08:17:46','2025-10-06 08:17:46'),(14,'edit role','web','2025-10-06 08:17:47','2025-10-06 08:17:47'),(15,'archive role','web','2025-10-06 08:17:47','2025-10-06 08:17:47'),(16,'restore role','web','2025-10-06 08:17:47','2025-10-06 08:17:47'),(17,'view owner company','web','2025-10-06 08:17:47','2025-10-06 08:17:47'),(18,'edit owner company','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(19,'view client users','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(20,'create client user','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(21,'edit client user','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(22,'archive client user','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(23,'restore client user','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(24,'view client companies','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(25,'create client company','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(26,'edit client company','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(27,'archive client company','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(28,'restore client company','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(29,'view projects','web','2025-10-06 08:17:48','2025-10-06 08:17:48'),(30,'view project','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(31,'create project','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(32,'edit project','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(33,'archive project','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(34,'restore project','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(35,'edit project user access','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(36,'create task group','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(37,'edit task group','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(38,'archive task group','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(39,'restore task group','web','2025-10-06 08:17:49','2025-10-06 08:17:49'),(40,'reorder task group','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(41,'view tasks','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(42,'create task','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(43,'edit task','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(44,'archive task','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(45,'restore task','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(46,'reorder task','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(47,'complete task','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(48,'add time log','web','2025-10-06 08:17:50','2025-10-06 08:17:50'),(49,'delete time log','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(50,'view time logs','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(51,'view comments','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(52,'view invoices','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(53,'create invoice','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(54,'edit invoice','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(55,'archive invoice','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(56,'restore invoice','web','2025-10-06 08:17:51','2025-10-06 08:17:51'),(57,'change invoice status','web','2025-10-06 08:17:52','2025-10-06 08:17:52'),(58,'download invoice','web','2025-10-06 08:17:52','2025-10-06 08:17:52'),(59,'print invoice','web','2025-10-06 08:17:52','2025-10-06 08:17:52'),(60,'view logged time sum report','web','2025-10-06 08:17:52','2025-10-06 08:17:52'),(61,'view daily logged time report','web','2025-10-06 08:17:52','2025-10-06 08:17:52'),(62,'view activities','web','2025-10-06 08:17:52','2025-10-06 08:17:52');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_user_access`
--

DROP TABLE IF EXISTS `project_user_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_user_access` (
  `user_id` bigint unsigned NOT NULL,
  `project_id` bigint unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_user_access`
--

LOCK TABLES `project_user_access` WRITE;
/*!40000 ALTER TABLE `project_user_access` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_user_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_company_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `default_pricing_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'hourly',
  `rate` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_client_company_id_foreign` (`client_company_id`),
  CONSTRAINT `projects_client_company_id_foreign` FOREIGN KEY (`client_company_id`) REFERENCES `client_companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,1,'Demo Project','Minima facilis similique nobis assumenda impedit.','hourly',NULL,'2025-10-06 08:18:13','2025-10-06 08:18:13',NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (29,1),(30,1),(41,1),(42,1),(43,1),(45,1),(46,1),(47,1),(48,1),(49,1),(50,1),(51,1),(29,3),(30,3),(41,3),(42,3),(43,3),(45,3),(46,3),(47,3),(48,3),(49,3),(50,3),(51,3),(29,4),(30,4),(41,4),(42,4),(50,4),(51,4),(1,5),(29,5),(30,5),(31,5),(32,5),(33,5),(34,5),(35,5),(36,5),(37,5),(38,5),(39,5),(40,5),(41,5),(42,5),(43,5),(44,5),(45,5),(46,5),(47,5),(48,5),(49,5),(50,5),(51,5),(60,5),(61,5),(1,6),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(8,6),(9,6),(10,6),(11,6),(12,6),(13,6),(14,6),(15,6),(16,6),(17,6),(18,6),(19,6),(20,6),(21,6),(22,6),(23,6),(24,6),(25,6),(26,6),(27,6),(28,6),(29,6),(30,6),(31,6),(32,6),(33,6),(34,6),(35,6),(36,6),(37,6),(38,6),(39,6),(40,6),(41,6),(42,6),(43,6),(44,6),(45,6),(46,6),(47,6),(48,6),(49,6),(50,6),(51,6),(52,6),(53,6),(54,6),(55,6),(56,6),(57,6),(58,6),(59,6),(60,6),(61,6),(62,6);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'developer','web','2025-10-06 08:17:45','2025-10-06 08:17:45',NULL),(2,'qa engineer','web','2025-10-06 08:17:45','2025-10-06 08:17:45',NULL),(3,'designer','web','2025-10-06 08:17:45','2025-10-06 08:17:45',NULL),(4,'client','web','2025-10-06 08:17:45','2025-10-06 08:17:45',NULL),(5,'manager','web','2025-10-06 08:17:45','2025-10-06 08:17:45',NULL),(6,'admin','web','2025-10-06 08:17:45','2025-10-06 08:17:45',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribe_task`
--

DROP TABLE IF EXISTS `subscribe_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribe_task` (
  `user_id` bigint unsigned NOT NULL,
  `task_id` bigint unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribe_task`
--

LOCK TABLES `subscribe_task` WRITE;
/*!40000 ALTER TABLE `subscribe_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribe_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_groups`
--

DROP TABLE IF EXISTS `task_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_groups` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_column` int unsigned NOT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_groups`
--

LOCK TABLES `task_groups` WRITE;
/*!40000 ALTER TABLE `task_groups` DISABLE KEYS */;
INSERT INTO `task_groups` VALUES (1,1,'Backlog',1,NULL),(2,1,'Todo',2,NULL),(3,1,'In progress',3,NULL),(4,1,'QA',4,NULL),(5,1,'Done',5,NULL),(6,1,'Deployed',6,NULL);
/*!40000 ALTER TABLE `task_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint unsigned NOT NULL,
  `group_id` bigint unsigned NOT NULL,
  `created_by_user_id` bigint unsigned DEFAULT NULL,
  `assigned_to_user_id` bigint unsigned DEFAULT NULL,
  `invoice_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `due_on` date DEFAULT NULL,
  `estimation` decimal(6,2) unsigned DEFAULT NULL,
  `pricing_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'hourly',
  `fixed_price` int unsigned DEFAULT NULL,
  `hidden_from_clients` tinyint(1) NOT NULL DEFAULT '0',
  `billable` tinyint(1) NOT NULL DEFAULT '1',
  `order_column` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `assigned_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,1,2,5,5,NULL,'Et quisquam error saepe.',1,'Repudiandae quis velit dignissimos odit totam nostrum. Aut velit quod accusantium deserunt. Adipisci maiores consequatur voluptates veniam placeat velit inventore corporis. Dolores est saepe minima laboriosam alias voluptas.',NULL,0.00,'hourly',NULL,0,1,1,'2025-10-06 08:18:14','2025-10-07 10:49:12','2025-10-06 08:18:14',NULL,NULL),(2,1,1,5,5,NULL,'Accusamus minima voluptatibus nemo alias.',2,'Magnam ut repudiandae accusamus et. Quia voluptas eaque qui eveniet. Delectus consequatur qui deleniti atque deserunt distinctio. Minima nam delectus ullam et.',NULL,0.00,'hourly',NULL,0,1,2,'2025-10-06 08:18:14','2025-10-07 10:14:15','2025-10-06 08:18:14',NULL,NULL),(3,1,1,5,5,NULL,'Quia non earum quam.',3,'Illum esse voluptatem molestiae labore id dolor. Cum quia sed culpa quibusdam. Accusantium quidem eveniet itaque temporibus. Nisi repudiandae similique repudiandae perferendis.',NULL,0.00,'hourly',NULL,0,1,3,'2025-10-06 08:18:15','2025-10-07 10:14:15','2025-10-06 08:18:15',NULL,NULL),(4,1,1,5,5,NULL,'Qui itaque adipisci iure.',4,'Ipsa eius laborum et possimus harum. Minima est sed officiis qui error qui quis eos. Rem ad sed facilis minus. Molestias quibusdam natus praesentium iure sint et neque numquam.',NULL,0.00,'hourly',NULL,0,1,4,'2025-10-06 08:18:15','2025-10-07 10:14:15','2025-10-06 08:18:16',NULL,NULL),(5,1,1,5,5,NULL,'Repellat omnis sunt mollitia aut at totam velit.',5,'Nihil sit temporibus et animi aliquam esse illum sed. Ratione aut voluptatem sit et dolor nisi. Voluptate est laboriosam cupiditate qui debitis magni cupiditate. Aut quia veritatis cupiditate consequuntur voluptas.',NULL,0.00,'hourly',NULL,0,1,5,'2025-10-06 08:18:16','2025-10-07 10:14:15','2025-10-06 08:18:16',NULL,NULL),(6,1,1,5,5,NULL,'Qui optio vitae ducimus harum excepturi qui et.',6,'Vero ipsa nostrum ut minima aut. Incidunt corporis ut pariatur dolore dolore error error. Fugit id repellat est ut porro autem cumque. Et alias illo voluptatem tempora deserunt.',NULL,0.00,'hourly',NULL,0,1,6,'2025-10-06 08:18:16','2025-10-06 08:18:16','2025-10-06 08:18:17','2025-10-06 08:18:16',NULL);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_logs`
--

DROP TABLE IF EXISTS `time_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `task_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `minutes` smallint unsigned DEFAULT NULL,
  `timer_start` int unsigned DEFAULT NULL,
  `timer_stop` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_logs`
--

LOCK TABLES `time_logs` WRITE;
/*!40000 ALTER TABLE `time_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `time_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_company_id` bigint unsigned NOT NULL,
  `rate` int unsigned DEFAULT NULL,
  `google_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `archived_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_client_company_id_foreign` (`client_company_id`),
  CONSTRAINT `users_client_company_id_foreign` FOREIGN KEY (`client_company_id`) REFERENCES `client_companies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Deborah Littel','developer@mail.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'(864) 564-1828','Frontend Developer',1,4700,NULL,'oR1BIO7LFb','2025-10-06 08:18:05','2025-10-06 08:18:05',NULL),(2,'Prof. Robin Little','qa engineer@mail.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'551-324-3076','QA Engineer',1,1000,NULL,'EAVviSXq4w','2025-10-06 08:18:06','2025-10-06 08:18:06',NULL),(3,'Wendy Yost','designer@mail.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1.510.678.1009','Designer',1,2000,NULL,'T5iFVTtM8i','2025-10-06 08:18:06','2025-10-06 08:18:06',NULL),(4,'Ms. Nayeli Lind Sr.','manager@mail.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'1-425-916-4147','Manager',1,1800,NULL,'1xdoElIQmq','2025-10-06 08:18:06','2025-10-06 08:18:06',NULL),(5,'Muktar Usman','mualiyuoox@gmail.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+234 8167236629','System Admin',1,2300,NULL,'k0hnRLOrWu','2025-10-06 08:18:06','2025-10-07 10:10:13',NULL),(6,'Mrs. Ophelia Christiansen MD','padberg.kiley@example.net','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'(412) 931-5893','Manager',1,3500,NULL,'QRNv7fAjEo','2025-10-06 08:18:06','2025-10-06 08:18:06',NULL),(7,'Ms. Leonor Schulist','quinten22@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+14198247111','Client',2,4400,NULL,'H0gs2MLEGT','2025-10-06 08:18:07','2025-10-06 08:18:11',NULL),(8,'Prof. Consuelo Bartoletti V','dane12@example.net','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1.224.436.2015','Manager',1,3300,NULL,'5txsyjofy9','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(9,'Wilhelmine Dach','kristy63@example.net','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'704.645.7106','Fullstack Developer',1,1900,NULL,'TtkfW7gfLl','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(10,'Mr. Bruce Pollich','bode.elinore@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1 (906) 235-8783','Designer',1,1100,NULL,'Uim3OBFY9l','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(11,'Jed Greenfelder','zcassin@example.net','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1-641-240-4042','Manager',1,3100,NULL,'1QtL3Jrswi','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(12,'Gage Rau','nienow.ayden@example.net','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1-636-209-7472','Manager',1,1100,NULL,'eyeu2tBB7Z','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(13,'Carli Paucek Sr.','agnes43@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1-434-752-9564','Backend Developer',1,2700,NULL,'JfXjBR61GY','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(14,'Ms. Dawn Labadie','misty.tillman@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'283.852.7543','Manager',1,1300,NULL,'no5NjEzfXL','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(16,'Tanya Heller','kiera41@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'989.449.0768','Fullstack Developer',1,2700,NULL,'TPFo51X7kS','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(17,'Danial O\'Conner','heller.emelie@example.org','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'225-371-1938','Backend Developer',1,2600,NULL,'Bca6O1zjNS','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(18,'Dave Rau','fidel.feeney@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'225-778-0489','Designer',1,1800,NULL,'OULM7LM21U','2025-10-06 08:18:07','2025-10-06 08:18:07',NULL),(19,'Prof. Kaycee Funk','bailey.anne@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1-458-521-5143','Backend Developer',1,1400,NULL,'tIhCgUF94F','2025-10-06 08:18:08','2025-10-06 08:18:08',NULL),(20,'Queen Bailey','vparisian@example.net','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+18609676115','Fullstack Developer',1,3700,NULL,'Im6WhHs6qk','2025-10-06 08:18:08','2025-10-06 08:18:08',NULL),(21,'Stella Friesen','karley.morissette@example.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'458-641-5742','Frontend Developer',1,4400,NULL,'bLcJA1v1YW','2025-10-06 08:18:08','2025-10-06 08:18:08',NULL),(22,'Jules Witting IV','durgan.kayley@example.org','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+1-847-414-9569','Backend Developer',1,3700,NULL,'W9LUrkt3jl','2025-10-06 08:18:08','2025-10-06 08:18:08',NULL),(23,'Ottis Bartoletti III','herman.elena@example.org','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'+12819254824','Fullstack Developer',1,1900,NULL,'4jaWunr0i5','2025-10-06 08:18:08','2025-10-06 08:18:08',NULL),(25,'Trever Sporer','qdooley@example.org','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',NULL,'469.652.6736','Frontend Developer',1,4300,NULL,'Bhj4KTDszl','2025-10-06 08:18:08','2025-10-06 08:18:08',NULL);
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

-- Dump completed on 2025-10-07 19:10:44
