-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
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

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Stockly`
--

-- --------------------------------------------------------

--
-- Structure de la table `Client`
--

CREATE TABLE `Client` (
  `id` int(11) NOT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `client_Signature` varchar(255) DEFAULT NULL,
  `client_PhoneNumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Factures`
--

CREATE TABLE `Factures` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
  FOREIGN KEY (`client_id`) REFERENCES Clients(id) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE FactureItems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  facture_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price INT NOT NULL,
  tva INT DEFAULT 0,
  total_item INT GENERATED ALWAYS AS (quantity * unit_price * (1 + tva / 100)) STORED,
  FOREIGN KEY (facture_id) REFERENCES Factures(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Product(id)
);

-- --------------------------------------------------------

--
-- Structure de la table `Product`
--

CREATE TABLE `Product` (
  `id` int(11) NOT NULL,
  `Prod_name` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `cost_price` int(11) NOT NULL,
  `selling_price` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `Prod_Description` text DEFAULT NULL,
  `code_bar` varchar(255) DEFAULT NULL,
  `date_of_arrival` date DEFAULT NULL,
  `supplier` int(255) DEFAULT NULL,
  `Prod_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
CREATE TABLE Settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stock_alert_threshold INT NOT NULL DEFAULT 5
);
-- Structure de la table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `supplier_address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `Sales` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `product_id` INT(11) NOT NULL,
    `quantity_sold` INT(11) NOT NULL,
    `total_price` DECIMAL(10,2) NOT NULL,
    `sale_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `Sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Structure de la table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL UNIQUE,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Index for `Category` table
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

-- AUTO_INCREMENT for `Category`
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


-- Index pour les tables déchargées
--

--
-- Index pour la table `Client`
--
ALTER TABLE `Client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Factures`
--
ALTER TABLE `Factures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clien_id` (`clien_id`);

--
-- Index pour la table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier` (`supplier`);

--
-- Index pour la table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Factures`
--
ALTER TABLE `Factures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Factures`
--
ALTER TABLE `Factures`
  ADD CONSTRAINT `Factures_ibfk_1` FOREIGN KEY (`clien_id`) REFERENCES `Client` (`id`);


--
-- Contraintes pour la table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`supplier`) REFERENCES `supplier` (`id`);
  ADD CONSTRAINT `Product_fk_category` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`);
--
-- Contraintes pour la table `supplier`
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
