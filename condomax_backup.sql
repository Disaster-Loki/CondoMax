-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: condomax
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-0+deb12u1

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
-- Table structure for table `balancete`
--

DROP TABLE IF EXISTS `balancete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balancete` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_condominio` int(11) DEFAULT NULL,
  `mes` int(11) NOT NULL,
  `ano` int(11) NOT NULL,
  `total_despesas` decimal(10,2) NOT NULL,
  `total_pagamentos` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_condominio` (`id_condominio`),
  CONSTRAINT `balancete_ibfk_1` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balancete`
--

LOCK TABLES `balancete` WRITE;
/*!40000 ALTER TABLE `balancete` DISABLE KEYS */;
INSERT INTO `balancete` VALUES
(1,1,6,2024,2000.00,1000.00),
(2,2,6,2024,800.00,700.00);
/*!40000 ALTER TABLE `balancete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condominio`
--

DROP TABLE IF EXISTS `condominio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `condominio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `gerente_responsavel` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condominio`
--

LOCK TABLES `condominio` WRITE;
/*!40000 ALTER TABLE `condominio` DISABLE KEYS */;
INSERT INTO `condominio` VALUES
(1,'Condominio A','Rua Principal, 123','João da Silva'),
(2,'Condominio B','Avenida Secundaria, 456','Maria Santos'),
(3,'Condomínio Bela Vista','Rua das Flores, 123','Pedro Oliveira');
/*!40000 ALTER TABLE `condominio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `despesa`
--

DROP TABLE IF EXISTS `despesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `despesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  `id_condominio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_condominio` (`id_condominio`),
  CONSTRAINT `despesa_ibfk_1` FOREIGN KEY (`id_condominio`) REFERENCES `condominio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `despesa`
--

LOCK TABLES `despesa` WRITE;
/*!40000 ALTER TABLE `despesa` DISABLE KEYS */;
INSERT INTO `despesa` VALUES
(1,'Manutenção mensal',1500.00,'2024-06-01',1),
(2,'Limpeza geral',800.00,'2024-06-05',2);
/*!40000 ALTER TABLE `despesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa_servico`
--

DROP TABLE IF EXISTS `empresa_servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa_servico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `tipo_servico` varchar(255) NOT NULL,
  `contato` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa_servico`
--

LOCK TABLES `empresa_servico` WRITE;
/*!40000 ALTER TABLE `empresa_servico` DISABLE KEYS */;
INSERT INTO `empresa_servico` VALUES
(1,'Empresa A','Manutenção de Elevadores','contato@empresaA.com'),
(2,'Empresa B','Serviços de Segurança','contato@empresaB.com');
/*!40000 ALTER TABLE `empresa_servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `morada` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES
(1,'João Silva','Administrador',3500.00,'joao.silva@example.com','(11) 98765-4321','Rua das Flores, 123','senha123'),
(2,'Maria Santos','Porteira',2000.00,'maria.santos@example.com','(11) 98765-6789','Avenida Principal, 456','senha456'),
(3,'Joelson Pascoal','Gerente',3500.00,'joelsonPascoal@example.com','(11) 98765-4321','Rua das Flores, 987','senha1235'),
(4,'Saveti','Gerente',3500.00,'joelsonPascoal@example.com','(11) 98765-4321','Rua das Flores, 987','senha1235'),
(5,'Rafael Marcos','Gerente',3500.00,'joelsonPascoal@example.com','(11) 98765-4321','Rua das Flores, 987','senha1235');
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento`
--

DROP TABLE IF EXISTS `pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_condomino` int(11) DEFAULT NULL,
  `valor` decimal(10,2) NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_condomino` (`id_condomino`),
  CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`id_condomino`) REFERENCES `condominio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento`
--

LOCK TABLES `pagamento` WRITE;
/*!40000 ALTER TABLE `pagamento` DISABLE KEYS */;
INSERT INTO `pagamento` VALUES
(1,1,1000.00,'2024-06-10'),
(2,2,700.00,'2024-06-15');
/*!40000 ALTER TABLE `pagamento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01 10:41:34
