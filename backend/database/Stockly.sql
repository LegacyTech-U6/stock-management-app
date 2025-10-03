-- phpMyAdmin SQL Dump
-- version 5.2.1
-- Hôte : localhost
-- Généré le : jeu. 07 août 2025 à 21:25
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
DROP DATABASE IF EXISTS Stockly;
CREATE DATABASE IF NOT EXISTS Stockly;
USE Stockly;
SET NAMES utf8mb4;

-- -----------------------------
-- Table users
-- -----------------------------
CREATE TABLE `users` (
    `id` INT(11)  NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `Last_name` VARCHAR(100) NOT NULL ,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `telephone` VARCHAR(100) NOT NULL,
    `role` ENUM('admin','gestionnaire','caissier') DEFAULT 'caissier',
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- Table Client
CREATE TABLE `Client` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(255) DEFAULT NULL,
  `client_Signature` VARCHAR(255) DEFAULT NULL,
  `client_PhoneNumber` VARCHAR(20) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- Table Category
CREATE TABLE `Category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Table supplier
CREATE TABLE `supplier` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `supplier_name` VARCHAR(255) NOT NULL,
    `supplier_address` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `whatsapp_number` VARCHAR(50) DEFAULT NULL,
    `preferred_channel` ENUM('email', 'whatsapp', 'phone') DEFAULT 'email',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- Table Product
CREATE TABLE `Product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Prod_name` VARCHAR(255) NOT NULL,
  `quantity` INT(11) DEFAULT NULL,
  `cost_price` INT(11) NOT NULL,
  `selling_price` INT(11) NOT NULL,
  `category_id` INT(11) DEFAULT NULL,
  `Prod_Description` TEXT DEFAULT NULL,
  `code_bar` VARCHAR(255) DEFAULT NULL,
  `date_of_arrival` DATE DEFAULT NULL,
  `supplier` INT(11) DEFAULT NULL,
  `Prod_image` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier` (`supplier`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`supplier`) REFERENCES `supplier` (`id`) ON DELETE
  SET NULL,
    CONSTRAINT `Product_fk_category` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE
  SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- Table Factures
CREATE TABLE `Factures` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `client_id` INT(11) NOT NULL,
  `user_id` INT(11) DEFAULT NULL,
  `date_of_creation` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date_echeance` DATE DEFAULT NULL,
  `status` ENUM('en_attente', 'payee', 'annulee') DEFAULT 'en_attente',
  `mode_paiement` VARCHAR(50) DEFAULT NULL,
  `total_hors_reduction` INT(11) DEFAULT NULL,
  `reduction_type` VARCHAR(255) DEFAULT NULL,
  `reduction` INT(11) DEFAULT NULL,
  `tva` INT(11) DEFAULT NULL,
  `total` INT(11) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Factures_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- Table FactureItems
CREATE TABLE `FactureItems` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `facture_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `unit_price` INT(11) NOT NULL,
  `tva` INT(11) DEFAULT 0,
  `discount` INT(11) DEFAULT 0,
  `total_item` INT GENERATED ALWAYS AS ((quantity * unit_price * (1 + tva / 100))-discount) STORED,
  PRIMARY KEY (`id`),
  CONSTRAINT `FactureItems_fk_facture` FOREIGN KEY (`facture_id`) REFERENCES `Factures`(`id`) ON DELETE CASCADE,
  CONSTRAINT `FactureItems_fk_product` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- Table Sales
CREATE TABLE `Sales` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT(11) NOT NULL,
  `quantity_sold` INT(11) NOT NULL,
  `total_price` DECIMAL(10, 2) NOT NULL,
  `total_profit` DECIMAL(22) NOT NULL,
  `sale_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `Sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
-- Table Settings
CREATE TABLE `Settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stock_alert_threshold` INT NOT NULL DEFAULT 5,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Table Orders
CREATE TABLE `Orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT DEFAULT NULL,
  `supplier_id` INT DEFAULT NULL,
  `quantity` INT(10) DEFAULT 0,
  `status` ENUM('pending', 'sent', 'delivered') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATE DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Orders_fk_product` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL,
  CONSTRAINT `Orders_fk_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;