-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: myapp1: 3306
-- Generation Time: Nov 27, 2021 at 03:22 PM
-- Server version: 5.7.36
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `progettoHackaton`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `chatId` varchar(256) NOT NULL DEFAULT '0',
  `filter` varchar(256) NOT NULL DEFAULT '0',
  `nftCollection` varchar(256) NOT NULL DEFAULT '0',
  `nftObject` varchar(256) NOT NULL DEFAULT '0',
  `priceLimit` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`chatId`, `filter`, `nftCollection`, `nftObject`, `priceLimit`) VALUES
('1238654632', '1', '0', '0', 0),
('128255474', '0', '0', '0', 0),
('131940888', '0', '0', 'Donkey', 0),
('1326709265', '1', '0', '0', 0),
('1494621657', '0', 'donkey', '0', 0),
('1562741742', '0', '0', '0', 0),
('1623154253', '0', '0a8ce195286c168f19-DONKEY', '0', 0),
('1755615197', '0', 'donkeygang', '0', 0),
('2028622504', '0', '0a8ce195286c168f19-DONKEY', '0', 0),
('2076302222', '0', 'donkey', '0', 0),
('208952331', '0', '0a8ce195286c168f19', '0', 5),
('243755892', '1', '0', '0', 0),
('336186936', '1', '0', '0', 0),
('38268643', '0', 'Donkey', '0', 0),
('460574088', '0', 'undefined', '0', 0),
('469562895', '0', '0', '0', 0),
('579428794', '0', 'donkey', '0', 0),
('665943962', '0', 'donkey', '0', 0),
('755099900', '0', 'donkey', '0', 0),
('76832935', '0', '0', '0', 0),
('980389380', '0', 'donkey', '0', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`chatId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
