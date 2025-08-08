CREATE DATABASE IF NOT EXISTS Stockly;
USE Stockly;
CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Prod_name VARCHAR(255) NOT NULL,
    quantity INT,
    cost_price INT NOT NULL,
    selling_price INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    Prod_Description VARCHAR(255),
    code_bar VARCHAR(255),
    date_of_arrival DATETIME DEFAULT current_timestamp(),
    supplier INT(255),
    Prod_image VARCHAR(255)
);
CREATE TABLE Factures(
    id INT PRIMARY KEY AUTO_INCREMENT,
    clien_id INT,
    date_of_creation DATETIME DEFAULT current_timestamp(),
    date_echeance DATETIME,
    total_hors_reduction INT,
    reduction_type VARCHAR(255),
    reduction INT,
    tva INT,
    total INT,
);
CREATE TABLE Client(
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(255),
    client_Signature VARCHAR(255),
    client_PhoneNumber INT
);
CREATE TABLE supplier(
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(255) NOT NULL,
    supplier_address VARCHAR(255),
    phone_number VARCHAR(255)
);
ALTER TABLE `Product`
ADD FOREIGN KEY (`supplier`) REFERENCES `supplier`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `Factures`
ADD FOREIGN KEY (`clien_id`) REFERENCES `Client`(`id`) ON DELETE CASCADE