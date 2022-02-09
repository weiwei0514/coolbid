-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-05-04 12:28:45
-- 伺服器版本： 10.4.18-MariaDB
-- PHP 版本： 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `coolbid3`
--

-- --------------------------------------------------------

--
-- 資料表結構 `address`
--

CREATE TABLE `address` (
  `addressId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `zipcodeId` int(3) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `auction`
--

CREATE TABLE `auction` (
  `auctionId` int(11) NOT NULL,
  `auctionTime` timestamp NULL DEFAULT NULL,
  `auctionTitle` varchar(255) NOT NULL,
  `auctionIntro` varchar(255) NOT NULL,
  `actionMaxSeen` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `auctionorder`
--

CREATE TABLE `auctionorder` (
  `auctionOrderId` int(11) NOT NULL,
  `auctionProductId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `auctionOrderTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `auctionOrderPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `auctionproduct`
--

CREATE TABLE `auctionproduct` (
  `auctionProductId` int(11) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `auctionProductName` varchar(255) NOT NULL,
  `auctionProductInfo` varchar(255) NOT NULL,
  `auctionProductStartPrice` int(11) NOT NULL,
  `auctionProductStatusId` int(2) DEFAULT 1,
  `auctionBiddingHistory` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`auctionBiddingHistory`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `auctionproductstatus`
--

CREATE TABLE `auctionproductstatus` (
  `auctionProductStatusId` int(2) NOT NULL,
  `auctionProductStatusDescription` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `auctionproductstatus`
--

INSERT INTO `auctionproductstatus` (`auctionProductStatusId`, `auctionProductStatusDescription`) VALUES
(1, '上架'),
(2, '下架'),
(3, '刪除'),
(4, '結標'),
(5, '流標'),
(6, '售出');

-- --------------------------------------------------------

--
-- 資料表結構 `bank`
--

CREATE TABLE `bank` (
  `bankId` int(3) NOT NULL,
  `bankNumber` int(3) NOT NULL,
  `bankName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `bank`
--

INSERT INTO `bank` (`bankId`, `bankNumber`, `bankName`) VALUES
(1, 1, '中央信託'),
(2, 3, '交通銀行'),
(3, 4, '台灣銀行'),
(4, 5, '土地銀行'),
(5, 6, '合庫商銀'),
(6, 7, '第一銀行'),
(7, 8, '華南銀行'),
(8, 9, '彰化銀行'),
(9, 10, '華僑銀行'),
(10, 11, '上海銀行'),
(11, 12, '台北富邦'),
(12, 13, '國泰世華'),
(13, 16, '高雄銀行'),
(14, 17, '兆豐商銀'),
(15, 18, '農業金庫'),
(16, 21, '花旗銀行'),
(17, 24, '運通銀行'),
(18, 25, '首都銀行'),
(19, 39, '荷蘭銀行'),
(20, 40, '中華開發'),
(21, 50, '臺灣企銀'),
(22, 51, '台北商銀'),
(23, 52, '新竹商銀'),
(24, 53, '台中商銀'),
(25, 54, '京城商銀'),
(26, 56, '花蓮企銀'),
(27, 57, '台東企銀'),
(28, 75, '東亞銀行'),
(29, 81, '匯豐銀行'),
(30, 83, '渣打銀行'),
(31, 87, '標旗銀行'),
(32, 101, '台北一信'),
(33, 102, '華泰銀行'),
(34, 103, '臺灣新光商銀'),
(35, 104, '台北五信'),
(36, 106, '台北九信'),
(37, 108, '陽信銀行'),
(38, 114, '基隆一信'),
(39, 115, '基隆二信'),
(40, 118, '板信銀行'),
(41, 119, '淡水一信'),
(42, 120, '淡水信合社'),
(43, 124, '宜蘭信合社'),
(44, 127, '桃園信合社'),
(45, 130, '新竹一信<,'),
(46, 132, '新竹三信<,'),
(47, 139, '竹南信合社'),
(48, 146, '台中二信'),
(49, 147, '三信銀行'),
(50, 151, '第七商銀'),
(51, 158, '彰化一信'),
(52, 161, '彰化五信'),
(53, 162, '彰化六信'),
(54, 163, '彰化十信'),
(55, 165, '鹿港信合社'),
(56, 178, '嘉義三信'),
(57, 179, '嘉義四信'),
(58, 188, '台南三信'),
(59, 203, '高雄二信'),
(60, 204, '高雄三信'),
(61, 215, '花蓮一信'),
(62, 216, '花蓮二信'),
(63, 222, '澎湖一信'),
(64, 223, '澎湖二信'),
(65, 224, '金門信合社'),
(66, 512, '雲林漁會'),
(67, 515, '嘉義漁會'),
(68, 517, '南市區漁會'),
(69, 518, '南縣漁會'),
(70, 521, '彌陀漁會'),
(71, 521, '永安漁會'),
(72, 521, '興達港漁會'),
(73, 521, '林園區漁會'),
(74, 523, '東港漁會'),
(75, 523, '琉球區漁會'),
(76, 523, '林邊區漁會'),
(77, 524, '新港漁會'),
(78, 525, '澎湖區漁會'),
(79, 605, '高雄市農會'),
(80, 613, '名間農會'),
(81, 614, '永靖農會'),
(82, 614, '秀水農會'),
(83, 614, '二林農會'),
(84, 614, '埔心農會'),
(85, 614, '員林農會'),
(86, 614, '埤頭鄉農會'),
(87, 614, '竹塘農會'),
(88, 616, '四湖農會'),
(89, 616, '大埤農會'),
(90, 616, '二崙農會'),
(91, 616, '口湖農會'),
(92, 616, '莿桐農會'),
(93, 616, '褒忠農會'),
(94, 616, '斗六農會'),
(95, 616, '西螺農會'),
(96, 616, '虎尾農會'),
(97, 616, '崙背鄉農會'),
(98, 616, '台西農會'),
(99, 616, '古坑農會'),
(100, 616, '斗南農會'),
(101, 617, '六腳農會'),
(102, 617, '朴子農會'),
(103, 617, '太保農會'),
(104, 617, '鹿草農會'),
(105, 617, '大埔農會'),
(106, 617, '水上鄉農會'),
(107, 617, '民雄農會'),
(108, 617, '溪口農會'),
(109, 617, '竹崎農會'),
(110, 617, '布袋鎮農會'),
(111, 617, '東石農會'),
(112, 617, '新港農會'),
(113, 617, '大林農會'),
(114, 617, '梅山農會'),
(115, 617, '嘉義農會'),
(116, 617, '番路農會'),
(117, 617, '義竹農會'),
(118, 618, '歸仁農會'),
(119, 618, '六甲農會'),
(120, 618, '善化鎮農會'),
(121, 618, '西港農會'),
(122, 618, '北門農會'),
(123, 618, '佳里鎮農會'),
(124, 618, '永康農會'),
(125, 618, '鹽水農會'),
(126, 618, '新營農會'),
(127, 618, '將軍農會'),
(128, 618, '玉井農會'),
(129, 619, '鳳山市農會'),
(130, 619, '阿蓮農會'),
(131, 619, '仁武農會'),
(132, 619, '大社農會'),
(133, 619, '田寮農會'),
(134, 619, '鳥松農會'),
(135, 619, '梓官農會'),
(136, 619, '林園農會'),
(137, 619, '大寮農會'),
(138, 619, '橋頭農會'),
(139, 619, '燕巢農會'),
(140, 619, '永安農會'),
(141, 619, '湖內農會'),
(142, 619, '路竹農會'),
(143, 619, '彌陀農會'),
(144, 619, '甲仙農會'),
(145, 619, '杉林農會'),
(146, 619, '旗山農會'),
(147, 619, '岡山農會'),
(148, 619, '茄萣農會'),
(149, 619, '美濃農會'),
(150, 620, '恒春農會'),
(151, 620, '滿州農會'),
(152, 620, '新埤農會'),
(153, 620, '枋山農會'),
(154, 620, '東港鎮農會'),
(155, 620, '里港鄉農會'),
(156, 620, '南州農會'),
(157, 620, '崁頂鄉農會'),
(158, 620, '麟洛農會'),
(159, 620, '琉球農會'),
(160, 620, '九如鄉農會'),
(161, 621, '富里鄉農會'),
(162, 621, '壽豐農會'),
(163, 621, '吉安農會'),
(164, 621, '新秀農會'),
(165, 622, '太麻里農會'),
(166, 622, '東河農會'),
(167, 622, '台東農會'),
(168, 622, '成功農會'),
(169, 622, '關山農會'),
(170, 622, '池上農會'),
(171, 622, '鹿野農會'),
(172, 622, '長濱農會'),
(173, 624, '澎湖農會'),
(174, 625, '台中市農會'),
(175, 627, '連江縣農會'),
(176, 700, '中華郵政'),
(177, 803, '聯邦銀行'),
(178, 804, '中華銀行'),
(179, 805, '遠東銀行'),
(180, 806, '復華銀行'),
(181, 807, '建華銀行'),
(182, 808, '玉山銀行'),
(183, 809, '萬泰銀行'),
(184, 810, '寶華銀行'),
(185, 812, '台新銀行'),
(186, 814, '大眾銀行'),
(187, 815, '日盛銀行'),
(188, 816, '安泰銀行'),
(189, 822, '中國信託'),
(190, 825, '慶豐銀行');

-- --------------------------------------------------------

--
-- 資料表結構 `bankaccount`
--

CREATE TABLE `bankaccount` (
  `bankAccountId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `bankId` int(3) NOT NULL,
  `bankAccountNumber` varchar(20) NOT NULL,
  `bankAccountDefault` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `biddinghistory`
--

CREATE TABLE `biddinghistory` (
  `biddingHistoryId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `bidTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `bidprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `brand`
--

CREATE TABLE `brand` (
  `brandId` int(11) NOT NULL,
  `brandName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `brand`
--

INSERT INTO `brand` (`brandId`, `brandName`) VALUES
(1, 'Adidas'),
(2, 'Adidas Apparel'),
(3, 'Aime Leon Dore'),
(4, 'Air Jordan'),
(5, 'Alexander McQueen'),
(6, 'Apple'),
(7, 'Artist Merch'),
(8, 'Asics'),
(9, 'Assc'),
(10, 'Audemars Piguet'),
(11, 'Awake'),
(12, 'Balenciaga'),
(13, 'Bape'),
(14, 'Bathing Ape'),
(15, 'Bell & Ross'),
(16, 'Brandon Blackwood'),
(17, 'Breitling'),
(18, 'Bulova'),
(19, 'Burberry'),
(20, 'Cactus Plant Flea Market'),
(21, 'Cartier'),
(22, 'Casio'),
(23, 'CDG'),
(24, 'Chanel'),
(25, 'Chinatown Market'),
(26, 'Chrome Hearts'),
(27, 'Citizen'),
(28, 'Common Projects'),
(29, 'Converse'),
(30, 'Crocs'),
(31, 'Diadora'),
(32, 'Dior'),
(33, 'drew house'),
(34, 'Eric Emanuel'),
(35, 'Ernst Benz'),
(36, 'Fear Of God'),
(37, 'FTP'),
(38, 'Full Send'),
(39, 'Girls Don\'t Cry'),
(40, 'Goyard'),
(41, 'Gucci'),
(42, 'Hermes'),
(43, 'Hidden NY'),
(44, 'Hublot'),
(45, 'Human Made'),
(46, 'Ivy Park'),
(47, 'Iwc'),
(48, 'Jacob & Co.'),
(49, 'Jordan Apparel'),
(50, 'Kaws'),
(51, 'Kith'),
(52, 'Li-Ning'),
(53, 'Longchamp'),
(54, 'Louis Vuitton'),
(55, 'MCM'),
(56, 'Movado'),
(57, 'New Balance'),
(58, 'Nike'),
(59, 'Nike Apparel'),
(60, 'Nixon'),
(61, 'Noah'),
(62, 'Off-White'),
(63, 'Omega'),
(64, 'Oris'),
(65, 'OVO'),
(66, 'Palace'),
(67, 'Palm Angels'),
(68, 'Panerai'),
(69, 'Polo'),
(70, 'Prada'),
(71, 'Puma'),
(72, 'Rolex'),
(73, 'Seiko'),
(74, 'Shinola'),
(75, 'SKIMS'),
(76, 'Supreme'),
(77, 'Swatch'),
(78, 'Tag Heuer'),
(79, 'Takashi Murakami'),
(80, 'Telfar'),
(81, 'The Hundreds'),
(82, 'The North Face'),
(83, 'Timex'),
(84, 'Tissot'),
(85, 'Tudor'),
(86, 'Ulysse Nardin'),
(87, 'Uniqlo'),
(88, 'Versace'),
(89, 'Yeezy'),
(90, 'Yeezy Apparel'),
(91, 'Reebok'),
(92, 'Levis');

-- --------------------------------------------------------

--
-- 資料表結構 `brandcat`
--

CREATE TABLE `brandcat` (
  `brandCatId` int(11) NOT NULL,
  `brandId` int(11) NOT NULL,
  `categoryId` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `brandcat`
--

INSERT INTO `brandcat` (`brandCatId`, `brandId`, `categoryId`) VALUES
(1, 76, 'C'),
(2, 13, 'C'),
(3, 51, 'C'),
(4, 66, 'C'),
(5, 36, 'C'),
(6, 50, 'C'),
(7, 62, 'C'),
(8, 9, 'C'),
(9, 7, 'C'),
(10, 59, 'C'),
(11, 2, 'C'),
(12, 3, 'C'),
(13, 11, 'C'),
(14, 20, 'C'),
(15, 25, 'C'),
(16, 26, 'C'),
(17, 32, 'C'),
(18, 33, 'C'),
(19, 34, 'C'),
(20, 37, 'C'),
(21, 38, 'C'),
(22, 39, 'C'),
(23, 41, 'C'),
(24, 43, 'C'),
(25, 45, 'C'),
(26, 46, 'C'),
(27, 49, 'C'),
(28, 54, 'C'),
(29, 61, 'C'),
(30, 65, 'C'),
(31, 67, 'C'),
(32, 69, 'C'),
(33, 75, 'C'),
(34, 79, 'C'),
(35, 81, 'C'),
(36, 82, 'C'),
(37, 87, 'C'),
(38, 90, 'C'),
(39, 23, 'C'),
(40, 1, 'S'),
(41, 4, 'S'),
(42, 58, 'S'),
(43, 89, 'S'),
(44, 8, 'S'),
(45, 14, 'S'),
(46, 31, 'S'),
(47, 29, 'S'),
(48, 30, 'S'),
(49, 52, 'S'),
(50, 57, 'S'),
(51, 71, 'S'),
(52, 5, 'S'),
(53, 12, 'S'),
(54, 19, 'S'),
(55, 24, 'S'),
(56, 28, 'S'),
(57, 32, 'S'),
(58, 41, 'S'),
(59, 54, 'S'),
(60, 62, 'S'),
(61, 54, 'B'),
(62, 41, 'B'),
(63, 55, 'B'),
(64, 24, 'B'),
(65, 40, 'B'),
(66, 32, 'B'),
(67, 12, 'B'),
(68, 62, 'B'),
(69, 19, 'B'),
(70, 42, 'B'),
(71, 70, 'B'),
(72, 80, 'B'),
(73, 16, 'B'),
(74, 88, 'B'),
(75, 53, 'B'),
(76, 72, 'W'),
(77, 22, 'W'),
(78, 6, 'W'),
(79, 73, 'W'),
(80, 83, 'W'),
(81, 85, 'W'),
(82, 63, 'W'),
(83, 10, 'W'),
(84, 68, 'W'),
(85, 78, 'W'),
(86, 17, 'W'),
(87, 21, 'W'),
(88, 47, 'W'),
(89, 74, 'W'),
(90, 48, 'W'),
(91, 77, 'W'),
(92, 86, 'W'),
(93, 41, 'W'),
(94, 35, 'W'),
(95, 64, 'W'),
(96, 15, 'W'),
(97, 27, 'W'),
(98, 56, 'W'),
(99, 24, 'W'),
(100, 84, 'W'),
(101, 18, 'W'),
(102, 60, 'W'),
(103, 44, 'W');

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `categoryId` varchar(2) NOT NULL,
  `categoryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
('B', 'Bag'),
('C', 'Cloth'),
('S', 'Shoes'),
('W', 'Watch');

-- --------------------------------------------------------

--
-- 資料表結構 `categorydetail`
--

CREATE TABLE `categorydetail` (
  `categoryDetailId` int(11) NOT NULL,
  `categoryId` varchar(4) NOT NULL,
  `detailId` int(2) NOT NULL,
  `detailTitleId` int(2) NOT NULL,
  `categoryDetailDescription` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `categorydetail`
--

INSERT INTO `categorydetail` (`categoryDetailId`, `categoryId`, `detailId`, `detailTitleId`, `categoryDetailDescription`) VALUES
(1, 'B', 1, 1, '男包'),
(2, 'B', 1, 1, '女包'),
(3, 'B', 1, 1, '中性款'),
(4, 'B', 2, 2, '托特包'),
(5, 'B', 2, 2, '手拿包'),
(6, 'B', 2, 2, '肩背包'),
(7, 'B', 2, 2, '後背包'),
(8, 'B', 2, 2, '皮夾'),
(9, 'B', 2, 2, '卡夾'),
(10, 'B', 2, 2, '鑰匙包'),
(11, 'B', 3, 6, '米色'),
(12, 'B', 3, 6, '棕色'),
(13, 'B', 3, 6, '粉色'),
(14, 'B', 3, 6, '紅色'),
(15, 'B', 3, 6, '橘色'),
(16, 'B', 3, 6, '黃色'),
(17, 'B', 3, 6, '綠色'),
(18, 'B', 3, 6, '藍色'),
(19, 'B', 3, 6, '紫色'),
(20, 'B', 3, 6, '白色'),
(21, 'B', 3, 6, '黑色'),
(22, 'B', 3, 6, '灰色'),
(23, 'B', 3, 6, '透明'),
(24, 'B', 3, 6, '金色'),
(25, 'B', 3, 6, '銀色'),
(26, 'B', 3, 6, '多色'),
(27, 'C', 4, 1, '男裝'),
(28, 'C', 4, 1, '女裝'),
(29, 'C', 4, 1, '中性款'),
(30, 'C', 5, 3, 'XXS'),
(31, 'C', 5, 3, 'XS'),
(32, 'C', 5, 3, 'S'),
(33, 'C', 5, 3, 'M'),
(34, 'C', 5, 3, 'L'),
(35, 'C', 5, 3, 'XL'),
(36, 'C', 5, 3, 'XXL'),
(37, 'C', 5, 3, 'XXXL'),
(38, 'C', 6, 4, '2014春夏款'),
(39, 'C', 6, 4, '2014秋冬款'),
(40, 'C', 6, 4, '2015春夏款'),
(41, 'C', 6, 4, '2015秋冬款'),
(42, 'C', 6, 4, '2016春夏款'),
(43, 'C', 6, 4, '2016秋冬款'),
(44, 'C', 6, 4, '2017春夏款'),
(45, 'C', 6, 4, '2017秋冬款'),
(46, 'C', 6, 4, '2018春夏款'),
(47, 'C', 6, 4, '2018秋冬款'),
(48, 'C', 6, 4, '2019春夏款'),
(49, 'C', 6, 4, '2019秋冬款'),
(50, 'C', 6, 4, '2020春夏款'),
(51, 'C', 6, 4, '2020秋冬款'),
(52, 'C', 6, 4, '2021春夏款'),
(53, 'C', 6, 4, '2021秋冬款'),
(54, 'S', 7, 1, '男鞋'),
(55, 'S', 7, 1, '女鞋'),
(56, 'S', 7, 1, '中性款'),
(57, 'S', 8, 3, '1'),
(58, 'S', 8, 3, '1.5'),
(59, 'S', 8, 3, '2'),
(60, 'S', 8, 3, '2.5'),
(61, 'S', 8, 3, '3'),
(62, 'S', 8, 3, '3.5'),
(63, 'S', 8, 3, '4'),
(64, 'S', 8, 3, '4.5'),
(65, 'S', 8, 3, '5'),
(66, 'S', 8, 3, '5.5'),
(67, 'S', 8, 3, '6'),
(68, 'S', 8, 3, '6.5'),
(69, 'S', 8, 3, '7'),
(70, 'S', 8, 3, '7.5'),
(71, 'S', 8, 3, '8'),
(72, 'S', 8, 3, '8.5'),
(73, 'S', 8, 3, '9'),
(74, 'S', 8, 3, '9.5'),
(75, 'S', 8, 3, '10'),
(76, 'S', 8, 3, '10.5'),
(77, 'S', 8, 3, '11'),
(78, 'S', 8, 3, '11.5'),
(79, 'S', 8, 3, '12'),
(80, 'S', 8, 3, '12.5'),
(81, 'S', 8, 3, '13'),
(82, 'S', 8, 3, '13.5'),
(83, 'S', 8, 3, '14'),
(84, 'S', 8, 3, '14.5'),
(85, 'S', 8, 3, '15'),
(86, 'S', 8, 3, '16'),
(87, 'S', 8, 3, '17'),
(88, 'S', 8, 3, '18'),
(89, 'S', 9, 5, '<2001'),
(90, 'S', 9, 5, '2001'),
(91, 'S', 9, 5, '2002'),
(92, 'S', 9, 5, '2003'),
(93, 'S', 9, 5, '2004'),
(94, 'S', 9, 5, '2005'),
(95, 'S', 9, 5, '2006'),
(96, 'S', 9, 5, '2007'),
(97, 'S', 9, 5, '2008'),
(98, 'S', 9, 5, '2009'),
(99, 'S', 9, 5, '2010'),
(100, 'S', 9, 5, '2011'),
(101, 'S', 9, 5, '2012'),
(102, 'S', 9, 5, '2013'),
(103, 'S', 9, 5, '2014'),
(104, 'S', 9, 5, '2015'),
(105, 'S', 9, 5, '2016'),
(106, 'S', 9, 5, '2017'),
(107, 'S', 9, 5, '2018'),
(108, 'S', 9, 5, '2019'),
(109, 'S', 9, 5, '2020'),
(110, 'S', 9, 5, '2021'),
(111, 'W', 10, 1, '男錶'),
(112, 'W', 10, 1, '女錶'),
(113, 'W', 10, 1, '中性款'),
(114, 'W', 11, 2, 'Diver'),
(115, 'W', 11, 2, 'Dress'),
(116, 'W', 11, 2, 'Pilot'),
(117, 'W', 11, 2, 'Sport'),
(118, 'W', 11, 2, '其他');

-- --------------------------------------------------------

--
-- 資料表結構 `creditcard`
--

CREATE TABLE `creditcard` (
  `creditCardId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `bankId` int(3) NOT NULL,
  `creditCardNumber` varchar(16) NOT NULL,
  `creditCardDefault` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `detail`
--

CREATE TABLE `detail` (
  `detailId` int(2) NOT NULL,
  `detailDescription` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `detail`
--

INSERT INTO `detail` (`detailId`, `detailDescription`) VALUES
(1, 'bagSexId'),
(2, 'bagTypeId'),
(3, 'bagColorId'),
(4, 'clothSexId'),
(5, 'clothSizeId'),
(6, 'clothSeasonId'),
(7, 'shoesSexId'),
(8, 'shoesSizeId'),
(9, 'shoesYearId'),
(10, 'watchSexId'),
(11, 'watchTypeId');

-- --------------------------------------------------------

--
-- 資料表結構 `detailtitle`
--

CREATE TABLE `detailtitle` (
  `detailTitleId` int(2) NOT NULL,
  `detailTitleDescription` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `detailtitle`
--

INSERT INTO `detailtitle` (`detailTitleId`, `detailTitleDescription`) VALUES
(1, 'Genders'),
(2, 'Types'),
(3, 'Sizes'),
(4, 'Seasons'),
(5, 'Years'),
(6, 'Colors');

-- --------------------------------------------------------

--
-- 資料表結構 `level`
--

CREATE TABLE `level` (
  `levelId` int(2) NOT NULL,
  `levelDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `level`
--

INSERT INTO `level` (`levelId`, `levelDescription`) VALUES
(1, '鐵鎚會員'),
(2, '銅鎚會員'),
(3, '銀鎚會員'),
(4, '金鎚會員'),
(5, '鑽鎚會員');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `memberId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registerDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `levelId` int(2) DEFAULT 1,
  `shopName` varchar(255) NOT NULL,
  `shopDescription` varchar(255) DEFAULT NULL,
  `shoplevelId` int(2) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`memberId`, `userId`, `firstName`, `lastName`, `nickname`, `gender`, `birthday`, `phone`, `email`, `password`, `registerDate`, `levelId`, `shopName`, `shopDescription`, `shoplevelId`) VALUES
(1, 'weiwei', '品瑋', '陳', '瑋瑋', '男', '1992-05-14', '0987051856', 'mfee12.chenazi@gmail.com', '12345', '2021-04-29 17:28:59', 1, 'weiwei', '瑋瑋的賣場', 1),
(2, 'meion_mourchy', '國銓', '陳', 'Len', '男', '1992-11-12', '0988036147', 'mfee12.chenazi@gmail.com', '12345', '2021-04-29 17:35:42', 1, 'meion_mourchy', 'Len的賣場', 1),
(3, 'joutzu', '柔慈', '陳', 'Jou', '女', '1993-06-07', '0906238588', 'mfee12.chenazi@gmail.com', '12345', '2021-04-29 17:40:02', 1, 'joutzu', 'Jou的賣場', 2),
(4, 'nazi', '宜甄', '夏', 'XiaXia', '女', '1995-01-21', '0902155898', 'mfee12.chenazi@gmail.com', '12345', '2021-04-29 17:43:57', 3, 'nazi', 'XiaXia的賣場', 3),
(5, 'hi_weiyy', '維婷', '陳', 'weiyyyyy', '女', '1995-10-24', '0919491444', 'mfee12.chenazi@gmail.com', '12345', '2021-04-29 17:48:16', 4, 'hi_weiyy', 'weiyyyyy的賣場', 3);

-- --------------------------------------------------------

--
-- 資料表結構 `newcategorydetail`
--

CREATE TABLE `newcategorydetail` (
  `newcategoryDetailId` int(11) NOT NULL,
  `categoryId` varchar(4) NOT NULL,
  `detailId` int(11) NOT NULL,
  `description` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `newcategorydetail`
--

INSERT INTO `newcategorydetail` (`newcategoryDetailId`, `categoryId`, `detailId`, `description`) VALUES
(1, 'B', 1, '男包'),
(2, 'B', 1, '女包'),
(3, 'B', 1, '中性款'),
(4, 'B', 2, '托特包'),
(5, 'B', 2, '手拿包'),
(6, 'B', 2, '肩背包'),
(7, 'B', 2, '後背包'),
(8, 'B', 2, '皮夾'),
(9, 'B', 2, '卡夾'),
(10, 'B', 2, '鑰匙包'),
(11, 'B', 3, '米色'),
(12, 'B', 3, '棕色'),
(13, 'B', 3, '粉色'),
(14, 'B', 3, '紅色'),
(15, 'B', 3, '橘色'),
(16, 'B', 3, '黃色'),
(17, 'B', 3, '綠色'),
(18, 'B', 3, '藍色'),
(19, 'B', 3, '紫色'),
(20, 'B', 3, '白色'),
(21, 'B', 3, '黑色'),
(22, 'B', 3, '灰色'),
(23, 'B', 3, '透明'),
(24, 'B', 3, '金色'),
(25, 'B', 3, '銀色'),
(26, 'B', 3, '多色'),
(27, 'C', 4, '男裝'),
(28, 'C', 4, '女裝'),
(29, 'C', 4, '中性款'),
(30, 'C', 5, 'XXS'),
(31, 'C', 5, 'XS'),
(32, 'C', 5, 'S'),
(33, 'C', 5, 'M'),
(34, 'C', 5, 'L'),
(35, 'C', 5, 'XL'),
(36, 'C', 5, 'XXL'),
(37, 'C', 5, 'XXXL'),
(38, 'C', 6, '2014春夏款'),
(39, 'C', 6, '2014秋冬款'),
(40, 'C', 6, '2015春夏款'),
(41, 'C', 6, '2015秋冬款'),
(42, 'C', 6, '2016春夏款'),
(43, 'C', 6, '2016秋冬款'),
(44, 'C', 6, '2017春夏款'),
(45, 'C', 6, '2017秋冬款'),
(46, 'C', 6, '2018春夏款'),
(47, 'C', 6, '2018秋冬款'),
(48, 'C', 6, '2019春夏款'),
(49, 'C', 6, '2019秋冬款'),
(50, 'C', 6, '2020春夏款'),
(51, 'C', 6, '2020秋冬款'),
(52, 'C', 6, '2021春夏款'),
(53, 'C', 6, '2021秋冬款'),
(54, 'S', 7, '男鞋'),
(55, 'S', 7, '女鞋'),
(56, 'S', 7, '中性款'),
(57, 'S', 8, '1'),
(58, 'S', 8, '1.5'),
(59, 'S', 8, '2'),
(60, 'S', 8, '2.5'),
(61, 'S', 8, '3'),
(62, 'S', 8, '3.5'),
(63, 'S', 8, '4'),
(64, 'S', 8, '4.5'),
(65, 'S', 8, '5'),
(66, 'S', 8, '5.5'),
(67, 'S', 8, '6'),
(68, 'S', 8, '6.5'),
(69, 'S', 8, '7'),
(70, 'S', 8, '7.5'),
(71, 'S', 8, '8'),
(72, 'S', 8, '8.5'),
(73, 'S', 8, '9'),
(74, 'S', 8, '9.5'),
(75, 'S', 8, '10'),
(76, 'S', 8, '10.5'),
(77, 'S', 8, '11'),
(78, 'S', 8, '11.5'),
(79, 'S', 8, '12'),
(80, 'S', 8, '12.5'),
(81, 'S', 8, '13'),
(82, 'S', 8, '13.5'),
(83, 'S', 8, '14'),
(84, 'S', 8, '14.5'),
(85, 'S', 8, '15'),
(86, 'S', 8, '16'),
(87, 'S', 8, '17'),
(88, 'S', 8, '18'),
(89, 'S', 9, '<2001'),
(90, 'S', 9, '2001'),
(91, 'S', 9, '2002'),
(92, 'S', 9, '2003'),
(93, 'S', 9, '2004'),
(94, 'S', 9, '2005'),
(95, 'S', 9, '2006'),
(96, 'S', 9, '2007'),
(97, 'S', 9, '2008'),
(98, 'S', 9, '2009'),
(99, 'S', 9, '2010'),
(100, 'S', 9, '2011'),
(101, 'S', 9, '2012'),
(102, 'S', 9, '2013'),
(103, 'S', 9, '2014'),
(104, 'S', 9, '2015'),
(105, 'S', 9, '2016'),
(106, 'S', 9, '2017'),
(107, 'S', 9, '2018'),
(108, 'S', 9, '2019'),
(109, 'S', 9, '2020'),
(110, 'S', 9, '2021'),
(111, 'W', 10, '男錶'),
(112, 'W', 10, '女錶'),
(113, 'W', 10, '中性款'),
(114, 'W', 11, 'Diver'),
(115, 'W', 11, 'Dress'),
(116, 'W', 11, 'Pilot'),
(117, 'W', 11, 'Sport'),
(118, 'W', 11, '其他');

-- --------------------------------------------------------

--
-- 資料表結構 `order`
--

CREATE TABLE `order` (
  `orderId` int(11) NOT NULL,
  `buyerId` int(11) NOT NULL,
  `shopId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL,
  `orderTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `orderstatus`
--

CREATE TABLE `orderstatus` (
  `orderStatusId` varchar(4) NOT NULL,
  `orderStatusBuyer` varchar(20) NOT NULL,
  `orderStatusSeller` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `orderstatus`
--

INSERT INTO `orderstatus` (`orderStatusId`, `orderStatusBuyer`, `orderStatusSeller`) VALUES
('1', '訂單成立', '待出貨'),
('2', '運送中', '運送中'),
('3', '已到貨', '待買家取貨'),
('4', '取件完畢', '買家取貨完成'),
('5', '完成訂單', '待撥款'),
('6', '完成訂單', '撥款完畢'),
('7', '退貨中', '退貨商品運送中'),
('8', '退貨完畢', '已確認退貨商品'),
('9', '退款完畢', '完成訂單');

-- --------------------------------------------------------

--
-- 資料表結構 `orderstatusdetail`
--

CREATE TABLE `orderstatusdetail` (
  `orderStatusDetailId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `orderStatusId` varchar(4) DEFAULT NULL,
  `orderStatusDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `shopId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `brandId` int(11) NOT NULL,
  `categoryId` varchar(4) NOT NULL,
  `bagSexId` int(11) DEFAULT NULL,
  `bagTypeId` int(11) DEFAULT NULL,
  `bagColorId` int(11) DEFAULT NULL,
  `clothSexId` int(11) DEFAULT NULL,
  `clothSizeId` int(11) DEFAULT NULL,
  `clothSeasonId` int(11) DEFAULT NULL,
  `shoesSexId` int(11) DEFAULT NULL,
  `shoesSizeId` int(11) DEFAULT NULL,
  `shoesYearId` int(11) DEFAULT NULL,
  `watchSexId` int(11) DEFAULT NULL,
  `watchTypeId` int(11) DEFAULT NULL,
  `productConditionId` int(2) NOT NULL,
  `startPrice` int(11) DEFAULT 0,
  `perPrice` int(11) NOT NULL,
  `directPrice` int(11) DEFAULT NULL,
  `nowPrice` int(11) DEFAULT NULL,
  `endTime` timestamp NULL DEFAULT NULL,
  `productDescription` varchar(255) NOT NULL,
  `productStatusId` int(2) NOT NULL,
  `orderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`productId`, `shopId`, `productName`, `brandId`, `categoryId`, `bagSexId`, `bagTypeId`, `bagColorId`, `clothSexId`, `clothSizeId`, `clothSeasonId`, `shoesSexId`, `shoesSizeId`, `shoesYearId`, `watchSexId`, `watchTypeId`, `productConditionId`, `startPrice`, `perPrice`, `directPrice`, `nowPrice`, `endTime`, `productDescription`, `productStatusId`, `orderId`) VALUES
(1, 1, 'Jordan 4 Retro University Blue', 58, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 79, 110, NULL, NULL, 1, 5000, 500, 20000, NULL, '2021-05-31 16:00:00', 'Air Jordan 4是由傳奇設計師Tinker Hatfield設計，UNIVERSITY BLUE鞋面以藍色的短絨面料為基底，並且在鞋身各處加上灰色搭配潑墨造型，鞋身其他元素則以黑色呈現，鞋舌縫上的Jumpman標籤與內裡都選用淺灰色', 1, NULL),
(2, 1, 'adidas Yeezy Boost 350 V2 Black Red', 1, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 76, 106, NULL, NULL, 2, 5000, 500, 18000, NULL, '2021-06-29 18:00:00', '儘由饒舌流行指標歌手KANYE WEST與adidas聯名的YEEZY 系列，自2015 年第一代YEEZY BOOST 350 誕生以來，不斷的推出新款與新配色，進入球鞋市場YEEZY系列 絕對是含金量超高的鞋款。', 1, NULL),
(3, 1, 'Chanel Low Top Trainer Navy Velvet', 24, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 74, 109, NULL, NULL, 1, 10000, 1000, 40000, NULL, '2021-04-30 18:58:38', 'Chanel Low Top Trainer Navy Velvet', 1, NULL),
(4, 5, 'Louis Vuitton x Supreme Christopher Backpack Epi PM Red', 54, 'B', 1, 7, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 200000, 10000, 600000, NULL, '2021-07-15 07:59:59', 'The Louis Vuitton x Supreme Christopher backpack in red is a structured bag dripping in style. It comes with adjustable leather shoulder straps, a leather top handle, flap opening, press stud and drawstring closure as well as several pockets inside.', 1, NULL),
(5, 5, 'Hermes Birkin Epsom 30 Bleu Agate', 42, 'B', 2, 6, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 250000, 5000, 400000, NULL, '2021-06-08 07:59:59', '愛馬仕柏金包Epsom皮30公分', 1, NULL),
(6, 5, 'MCM x BAPE Shark Zip Wallet Visetos Mini Cognac in Coated Canvas with 24k Gold Plated', 55, 'B', 2, 6, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 20000, 1000, NULL, NULL, '2021-06-08 08:00:00', '聯名設計採用了 MCM 經典的 VISETOS MONOGRAM 印花，搭配 BAPE的迷彩及鯊魚元素，貫徹的帶出 MCM 及 BAPE雙方的特色', 1, NULL),
(7, 2, 'Rolex Explorer II 216570 - 42mm in Stainless Steel', 72, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 113, 115, 1, 200000, 5000, 300000, NULL, '2021-05-30 14:25:39', '勞力士的Explorer II系列被稱為「探險家二號」，最早是為登山人士、經常到處冒險的極地、森林或洞穴探險家設計的錶款。 品牌於1971年推出首款Explorer II至今，四十幾年來系列已發展到第四代，代代相傳、代代經典。', 1, NULL),
(8, 4, 'adidas Yeezy Foam RNNR Ararat', 1, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 56, 75, 109, NULL, NULL, 2, 0, 500, 20000, NULL, '2021-06-08 08:00:00', '設計細節：白色，鏤空/雕花設計，重組部拉鍊，穿套式。請注意，這款商品採用無性別風格，符合男裝標準尺碼', 1, NULL),
(9, 2, 'Casio G-Shock x Dragonball Z GA-110JDB-1A4 - 51mm in Resin', 22, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 111, 117, 1, 5000, 100, 15000, NULL, '2021-05-21 13:32:57', 'GA-110JDB以GA-110為藍本，55mm大錶徑與3D立體錶盤彰顯存在感，以主角孫悟空道服的橘色貫穿錶款設計，錶帶與錶殼以黑橘對比兩色印刷著悟空變身超級賽亞人的各階段，錶盤細節處的整點時刻、指針與轉盤則採用金色設計，九點鐘位置的錶盤顯示四星龍珠球的圖案，而這也是與悟空關係最密切的一顆龍珠，三點鐘的位置印有「Z」字圖樣。', 1, NULL),
(10, 2, 'Casio G-Shock GM-110RB-2A - 49mm in Stainless Steel', 22, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 113, 117, 1, 5000, 150, 15000, NULL, '2021-05-25 22:19:22', 'GM-110RB採用彩虹IP處理錶圈與多彩錶盤設計，金屬材質散發高端質感。全系列以細膩的金屬零件堆疊出層次感豐富的錶盤，金屬指針與轉盤傳達出重工業風的粗曠感。48.8mm的大錶徑設計，除了搶眼的外觀外，份量感也十足，除了必備的耐衝擊構造、抗磁與防水200米外，還有世界時間、1/100秒碼錶、倒數計時、5組每日鬧鈴與全自動LED照明…等多元豐富機能。', 1, NULL),
(11, 4, 'Travis Scott x McDonald\'s Crew T-Shirt Red', 7, 'C', NULL, NULL, NULL, 27, 34, 51, NULL, NULL, NULL, NULL, NULL, 1, 0, 100, 3000, NULL, NULL, '身兼現代說唱界巨星以及歐美潮流界領頭羊的 Travis Scott 推出最新聯名啦！Travis Scott 在業界被喻有「周邊王」一稱，因為 Travis 無論是在發布新專輯，新單曲，甚至是根本沒有發行新歌的時候都會不斷更新自家 Cactus Jack 商城，並且次次新貨的反響都非常之好。這次的聯名對象是眾所皆知的速食業大佬 McDonalds', 1, NULL),
(12, 4, 'Travis Scott x McDonalds Fry II T-Shirt Brown', 7, 'C', NULL, NULL, NULL, 27, 34, 51, NULL, NULL, NULL, NULL, NULL, 2, 0, 100, 3000, NULL, NULL, '身兼現代說唱界巨星以及歐美潮流界領頭羊的 Travis Scott 推出最新聯名啦！Travis Scott 在業界被喻有「周邊王」一稱，因為 Travis 無論是在發布新專輯，新單曲，甚至是根本沒有發行新歌的時候都會不斷更新自家 Cactus Jack 商城，並且次次新貨的反響都非常之好。這次的聯名對象是眾所皆知的速食業大佬 McDonalds', 1, NULL),
(13, 4, 'OFF-WHITE x Jordan Hoodie White', 62, 'C', NULL, NULL, NULL, 27, 35, 51, NULL, NULL, NULL, NULL, NULL, 2, 3000, 300, 10000, NULL, NULL, '用白色與沙色建構衣上紋路設計，並採用「University Red」的深淺配色效果打造 Jumpman、ARROWS 和 Wings 三大主要品牌 Logo，並將 OFF-WHITE 字樣融入並在背後彰顯其聯名身份。而 T-Shirt 設計則是延續其「Hoop Heroes」的主題意境，並選用知名插畫大師 Philip Burke 的繪畫圖像作呈現。', 1, NULL),
(14, 4, 'Kith Madison Jacket Torpedo', 51, 'C', NULL, NULL, NULL, 27, 33, 52, NULL, NULL, NULL, NULL, NULL, 2, 2000, 200, 10000, NULL, '2021-05-27 14:41:57', 'Mesh-lined, Colorblocked, Zip front closure and pockets, Taping at seams and zippers, Large printed Kith classic logo, Bungee adjustors at hood, hem, and interior side seams, Madison fit', 1, NULL),
(15, 1, 'Jordan 13 Retro Gym Red Flint Grey', 58, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 75, 110, NULL, NULL, 1, 1000, 100, 5700, NULL, '2021-07-08 16:00:00', '', 1, NULL),
(16, 1, 'Jordan 1 Retro High White University Blue Black', 58, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 76, 110, NULL, NULL, 1, 1000, 100, 5100, NULL, '2021-06-18 16:00:00', '', 1, NULL),
(17, 1, 'Jordan 1 Retro High Rust Pink', 58, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 77, 106, NULL, NULL, 1, 1000, 100, 4800, NULL, '2021-05-31 16:00:00', '', 1, NULL),
(18, 1, 'Jordan 4 Retro Union Guava Ice', 58, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 78, 109, NULL, NULL, 1, 1000, 100, 7500, NULL, '2021-06-01 16:00:00', '', 1, NULL),
(19, 1, 'Louis Vuitton Don Kanye Red', 54, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 66, 98, NULL, NULL, 2, 10000, 1000, 150000, NULL, '2021-06-11 16:00:00', '', 1, NULL),
(20, 1, 'Nike Air Trainer SC High White Varsity Red Black', 58, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 79, 98, NULL, NULL, 2, 1000, 100, 9000, NULL, '2021-06-07 16:00:00', '', 1, NULL),
(21, 1, 'Nike SB Blazer Elite Sub Pop', 58, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 80, 98, NULL, NULL, 1, 1000, 100, 12000, NULL, '2021-06-18 16:00:00', '', 1, NULL),
(22, 1, 'New Balance 327 Moonbeam Classic Burgundy (W)', 57, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 67, 99, NULL, NULL, 2, 1000, 100, 4500, NULL, '2021-07-18 16:00:00', '', 1, NULL),
(23, 2, 'Reebok Club C Cardi B Sahara (W)', 91, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 68, 100, NULL, NULL, 2, 1000, 100, 4500, NULL, '2021-06-04 16:00:00', '', 1, NULL),
(24, 2, 'Converse CPX70 Zebra (W)', 29, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 69, 109, NULL, NULL, 1, 0, 0, 2100, NULL, '2021-05-31 16:00:00', '', 1, NULL),
(25, 2, 'Puma Avid Trainer Rihanna Fenty Vanilla Ice (W)', 71, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 70, 100, NULL, NULL, 1, 0, 0, 1500, NULL, '2021-06-22 16:00:00', '', 1, NULL),
(26, 2, 'Puma RS-X Toys White', 71, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 81, 101, NULL, NULL, 2, 0, 0, 3000, NULL, '2021-06-09 16:00:00', '', 1, NULL),
(27, 2, 'Puma RS-X Tetris', 71, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 82, 108, NULL, NULL, 2, 1000, 100, 3600, NULL, '2021-07-08 16:00:00', '', 1, NULL),
(28, 2, 'New Balance 550 Aime Leon Dore White Navy Red', 57, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 56, 73, 109, NULL, NULL, 1, 1000, 100, 6000, NULL, '2021-06-20 16:00:00', '', 1, NULL),
(29, 2, 'Reebok Club C Cardi B Black Red (W)', 91, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 71, 110, NULL, NULL, 1, 1000, 100, 3000, NULL, '2021-06-17 16:00:00', '', 1, NULL),
(30, 2, 'Converse Chuck Taylor All-Star 70s Hi Comme des Garcons PLAY Black', 29, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 56, 74, 108, NULL, NULL, 2, 1000, 100, 3900, NULL, '2021-06-19 16:00:00', '', 1, NULL),
(31, 2, 'Converse Gianno Golf Le Fleur Parfait Pink', 29, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 56, 75, 109, NULL, NULL, 2, 1000, 100, 4200, NULL, '2021-06-19 16:00:00', '', 1, NULL),
(32, 2, 'New Balance 1300 Aime Leon Dore Pink', 57, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 55, 70, 110, NULL, NULL, 1, 1000, 100, 4500, NULL, '2021-06-20 16:00:00', '', 1, NULL),
(33, 2, 'Reebok Kamikaze II Candy Land', 91, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 83, 108, NULL, NULL, 1, 1000, 100, 4500, NULL, '2021-06-22 16:00:00', '', 1, NULL),
(34, 3, 'Reebok Zig Kinetica II Brain Dead Paper Lemon Glow', 91, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 77, 109, NULL, NULL, 1, 1000, 100, 4800, NULL, '2021-06-08 16:00:00', '', 1, NULL),
(35, 3, 'Reebok Question Mid Nice Kicks Bubba Chuck', 91, 'S', NULL, NULL, NULL, NULL, NULL, NULL, 54, 78, 110, NULL, NULL, 1, 1000, 100, 5100, NULL, '2021-07-08 16:00:00', '', 1, NULL),
(36, 3, 'Rolex Oyster-Perpetual 124300 - 41mm in Stainless Steel', 72, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 111, 114, 1, 100000, 10000, 300000, NULL, '2021-06-18 16:00:00', '', 1, NULL),
(37, 3, 'Rolex Yacht-Master II 116681 - 44mm in Steel/Rose Gold', 72, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 113, 114, 2, 100000, 10000, 300000, NULL, '2021-05-31 16:00:00', '', 1, NULL),
(38, 3, 'Rolex Daytona 116505 - 40mm in Rose Gold', 72, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 112, 115, 2, 100000, 10000, 300000, NULL, '2021-06-01 16:00:00', '', 1, NULL),
(39, 3, 'Omega Speedmaster Speedy Tuesday', 63, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 112, 115, 1, 100000, 10000, 300000, NULL, '2021-06-11 16:00:00', '', 1, NULL),
(40, 3, 'Omega Seamaster Diver', 63, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 111, 116, 2, 5000, 500, 45000, NULL, '2021-06-07 16:00:00', '', 1, NULL),
(41, 3, 'Omega Speedmaster Dark Side of the Moon', 63, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 111, 116, 2, 5000, 500, 75000, NULL, '2021-06-18 16:00:00', '', 1, NULL),
(42, 4, 'Seiko Essentials SNE036 - 37mm in Stainless Steel', 73, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 111, 115, 1, 0, 0, 3600, NULL, '2021-07-18 16:00:00', '', 1, NULL),
(43, 4, 'Seiko Essentials SSC141 - 43mm in Stainless Steel', 73, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 111, 114, 1, 0, 0, 3000, NULL, '2021-06-04 16:00:00', '', 1, NULL),
(44, 4, 'Seiko Essentials SNE102 - 37mm in Stainless Steel', 73, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 112, 115, 2, 0, 0, 1800, NULL, '2021-05-31 16:00:00', '', 1, NULL),
(45, 4, 'Seiko Prospex PADI Special Edition SRPA21 - 45mm', 73, 'W', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 113, 114, 2, 0, 0, 3600, NULL, '2021-06-22 16:00:00', '', 1, NULL),
(47, 4, 'Gucci GG Marmont Shoulder Matelasse Mini Black', 41, 'B', 2, 6, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 5000, 500, 36000, NULL, '2021-07-08 16:00:00', '', 1, NULL),
(48, 5, 'Gucci Drawstring Backpack Monogram GG Beige/Brown', 41, 'B', 3, 7, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 5000, 500, 24000, NULL, '2021-06-20 16:00:00', '', 1, NULL),
(49, 5, 'Gucci New York Yankees Patch Wallet GG Beige/Brick Red in Canvas', 41, 'B', 3, 8, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000, 100, 10500, NULL, '2021-06-17 16:00:00', '', 1, NULL),
(50, 5, 'Gucci Signature Card Case Metal GG Black in Leather with Silver-tone', 41, 'B', 3, 9, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1000, 100, 7500, NULL, '2021-06-19 16:00:00', '', 1, NULL),
(51, 5, 'Longchamp Le Pliage Neo Top Handle Bag M Black', 53, 'B', 2, 4, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 3600, NULL, '2021-06-19 16:00:00', '', 1, NULL),
(52, 5, 'Longchamp Le Pliage Club Shoulder Bag S Red', 53, 'B', 2, 4, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 1800, NULL, '2021-06-20 16:00:00', '', 1, NULL),
(53, 5, 'Balenciaga Everyday Multi Card Black in Calfskin Leather', 12, 'B', 1, 9, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 5000, 500, 45000, NULL, '2021-06-22 16:00:00', '', 1, NULL),
(54, 1, 'Balenciaga Everyday Tote M Black in Calfskin Leather', 12, 'B', 2, 4, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 5100, NULL, '2021-07-03 16:00:00', '', 1, NULL),
(55, 1, 'Telfar Shopping Bag Small Pool Blue in Vegan Leather', 80, 'B', 2, 4, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 0, 0, 6000, NULL, '2021-07-17 16:00:00', '', 1, NULL),
(56, 1, 'Gucci GG Marmont Camera Bag Matelasse Mini Dusty Pink', 41, 'B', 2, 6, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 2000, 200, 30000, NULL, '2021-06-08 16:00:00', '', 1, NULL),
(57, 1, 'Louis Vuitton Soft Trunk Monogram Brown in Coated Canvas', 54, 'B', 1, 6, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 3000, 300, 60000, NULL, '2021-06-16 16:00:00', '', 1, NULL),
(58, 1, 'Gucci Vintage Backpack Canvas Beige in Canvas with Gold-tone', 41, 'B', 1, 7, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000, 100, 15000, NULL, '2021-06-08 16:00:00', '', 1, NULL),
(59, 2, 'Louis Vuitton Crafty Pochette Toilette', 54, 'B', 1, 8, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1000, 100, 18000, NULL, '2021-07-10 16:00:00', '', 1, NULL),
(60, 2, 'Louis Vuitton Slender Wallet Damier Graphite Blue in Coated Canvas', 54, 'B', 1, 8, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1000, 100, 15000, NULL, '2021-06-08 16:00:00', '', 1, NULL),
(61, 2, 'OFF-WHITE Degrade Cropped Denim Jacket Bleach/Fuchsia', 62, 'C', NULL, NULL, NULL, 28, 30, 44, NULL, NULL, NULL, NULL, NULL, 2, 0, 0, 5400, NULL, '2021-07-14 16:00:00', '', 1, NULL),
(62, 2, 'Levis x Stranger Things Women El Aztec Shirt Yellow', 92, 'C', NULL, NULL, NULL, 27, 31, 45, NULL, NULL, NULL, NULL, NULL, 2, 0, 0, 1500, NULL, '2021-07-10 16:00:00', '', 1, NULL),
(63, 2, 'OFF-WHITE Quote Backpack Camo in Canvas with Gunmetal', 62, 'B', 2, 7, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1000, 100, 12000, NULL, '2021-07-14 16:00:00', '', 1, NULL),
(64, 2, 'BAPE A Bathing Ape Check by Bathing Tee Black/Beige', 13, 'C', NULL, NULL, NULL, 29, 32, 46, NULL, NULL, NULL, NULL, NULL, 1, 1000, 100, 30000, NULL, '2021-07-03 16:00:00', '', 1, NULL),
(65, 3, 'BAPE Shark Tee (SS20) Black', 13, 'C', NULL, NULL, NULL, 29, 33, 47, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 3000, NULL, '2021-07-17 16:00:00', '', 1, NULL),
(66, 3, 'Supreme Cross Box Logo Hooded Sweatshirt Black', 76, 'C', NULL, NULL, NULL, 29, 34, 48, NULL, NULL, NULL, NULL, NULL, 2, 1000, 100, 13500, NULL, '2021-06-08 16:00:00', '', 1, NULL),
(67, 3, 'Supreme Patches Denim Baseball Jersey Natural', 76, 'C', NULL, NULL, NULL, 28, 35, 49, NULL, NULL, NULL, NULL, NULL, 2, 1000, 100, 15000, NULL, '2021-06-16 16:00:00', '', 1, NULL),
(68, 3, 'Nike x Drake NOCTA Hoodie Yellow', 58, 'C', NULL, NULL, NULL, 27, 36, 50, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 3600, NULL, '2021-06-08 16:00:00', '', 1, NULL),
(69, 3, 'Travis Scott x CPFM 4 CJ Script Hoodie Black', 7, 'C', NULL, NULL, NULL, 27, 37, 51, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 3000, NULL, '2021-07-14 16:00:00', '', 1, NULL),
(70, 3, 'Fear Of God Essentials Applique Pullover Hoodie Heather', 36, 'C', NULL, NULL, NULL, 28, 33, 52, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 4200, NULL, '2021-07-10 16:00:00', '', 1, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `productcondition`
--

CREATE TABLE `productcondition` (
  `productConditionId` int(2) NOT NULL,
  `productConditionDescription` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `productcondition`
--

INSERT INTO `productcondition` (`productConditionId`, `productConditionDescription`) VALUES
(1, '全新'),
(2, '二手');

-- --------------------------------------------------------

--
-- 資料表結構 `productstatus`
--

CREATE TABLE `productstatus` (
  `productStatusId` int(2) NOT NULL,
  `productStatusDescription` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `productstatus`
--

INSERT INTO `productstatus` (`productStatusId`, `productStatusDescription`) VALUES
(1, '上架'),
(2, '下架'),
(3, '刪除'),
(4, '競標中'),
(5, '結標'),
(6, '售出');

-- --------------------------------------------------------

--
-- 資料表結構 `shoplevel`
--

CREATE TABLE `shoplevel` (
  `shopLevelId` int(2) NOT NULL,
  `shopLevelDescription` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `shoplevel`
--

INSERT INTO `shoplevel` (`shopLevelId`, `shopLevelDescription`) VALUES
(1, ''),
(2, '優良賣家'),
(3, '酷斃賣家');

-- --------------------------------------------------------

--
-- 資料表結構 `wishproduct`
--

CREATE TABLE `wishproduct` (
  `wishProductId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `wishproduct`
--

INSERT INTO `wishproduct` (`wishProductId`, `memberId`, `productId`) VALUES
(4, 1, 2),
(10, 2, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `wishshop`
--

CREATE TABLE `wishshop` (
  `wishShopId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `shopId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `zipcode`
--

CREATE TABLE `zipcode` (
  `zipcodeId` int(3) NOT NULL,
  `city` varchar(15) NOT NULL,
  `district` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `zipcode`
--

INSERT INTO `zipcode` (`zipcodeId`, `city`, `district`) VALUES
(100, '台北市', '中正區'),
(103, '台北市', '大同區'),
(104, '台北市', '中山區'),
(105, '台北市', '松山區'),
(106, '台北市', '大安區'),
(108, '台北市', '萬華區'),
(110, '台北市', '信義區'),
(111, '台北市', '士林區'),
(112, '台北市', '北投區'),
(114, '台北市', '內湖區'),
(115, '台北市', '南港區'),
(116, '台北市', '文山區'),
(200, '基隆市', '仁愛區'),
(201, '基隆市', '信義區'),
(202, '基隆市', '中正區'),
(203, '基隆市', '中山區'),
(204, '基隆市', '安樂區'),
(205, '基隆市', '暖暖區'),
(206, '基隆市', '七堵區'),
(207, '新北市', '萬里區'),
(208, '新北市', '金山區'),
(209, '連江縣', '南竿鄉'),
(210, '連江縣', '北竿鄉'),
(211, '連江縣', '莒光鄉'),
(212, '連江縣', '東引鄉'),
(220, '新北市', '板橋區'),
(221, '新北市', '汐止區'),
(222, '新北市', '深坑區'),
(223, '新北市', '石碇區'),
(224, '新北市', '瑞芳區'),
(226, '新北市', '平溪區'),
(227, '新北市', '雙溪區'),
(228, '新北市', '貢寮區'),
(231, '新北市', '新店區'),
(232, '新北市', '坪林區'),
(233, '新北市', '烏來區'),
(234, '新北市', '永和區'),
(235, '新北市', '中和區'),
(236, '新北市', '土城區'),
(237, '新北市', '三峽區'),
(238, '新北市', '樹林區'),
(239, '新北市', '鶯歌區'),
(241, '新北市', '三重區'),
(242, '新北市', '新莊區'),
(243, '新北市', '泰山區'),
(244, '新北市', '林口區'),
(247, '新北市', '蘆洲區'),
(248, '新北市', '五股區'),
(249, '新北市', '八里區'),
(251, '新北市', '淡水區'),
(252, '新北市', '三芝區'),
(253, '新北市', '石門區'),
(260, '宜蘭縣', '宜蘭市'),
(261, '宜蘭縣', '頭城鎮'),
(262, '宜蘭縣', '礁溪鄉'),
(263, '宜蘭縣', '壯圍鄉'),
(264, '宜蘭縣', '員山鄉'),
(265, '宜蘭縣', '羅東鎮'),
(266, '宜蘭縣', '三星鄉'),
(267, '宜蘭縣', '大同鄉'),
(268, '宜蘭縣', '五結鄉'),
(269, '宜蘭縣', '冬山鄉'),
(270, '宜蘭縣', '蘇澳鎮'),
(272, '宜蘭縣', '南澳鄉'),
(290, '宜蘭縣', '釣魚台列嶼'),
(300, '新竹市', ''),
(302, '新竹縣', '竹北市'),
(303, '新竹縣', '湖口鄉'),
(304, '新竹縣', '新豐鄉'),
(305, '新竹縣', '新埔鎮'),
(306, '新竹縣', '關西鎮'),
(307, '新竹縣', '芎林鄉'),
(308, '新竹縣', '寶山鄉'),
(310, '新竹縣', '竹東鎮'),
(311, '新竹縣', '五峰鄉'),
(312, '新竹縣', '橫山鄉'),
(313, '新竹縣', '尖石鄉'),
(314, '新竹縣', '北埔鄉'),
(315, '新竹縣', '峨眉鄉'),
(320, '桃園市', '中壢區'),
(324, '桃園市', '平鎮區'),
(325, '桃園市', '龍潭區'),
(326, '桃園市', '楊梅區'),
(327, '桃園市', '新屋區'),
(328, '桃園市', '觀音區'),
(330, '桃園市', '桃園區'),
(333, '桃園市', '龜山區'),
(334, '桃園市', '八德區'),
(335, '桃園市', '大溪區'),
(336, '桃園市', '復興區'),
(337, '桃園市', '大園區'),
(338, '桃園市', '蘆竹區'),
(350, '苗栗縣', '竹南鎮'),
(351, '苗栗縣', '頭份鎮'),
(352, '苗栗縣', '三灣鄉'),
(353, '苗栗縣', '南庄鄉'),
(354, '苗栗縣', '獅潭鄉'),
(356, '苗栗縣', '後龍鎮'),
(357, '苗栗縣', '通霄鎮'),
(358, '苗栗縣', '苑裡鎮'),
(360, '苗栗縣', '苗栗市'),
(361, '苗栗縣', '造橋鄉'),
(362, '苗栗縣', '頭屋鄉'),
(363, '苗栗縣', '公館鄉'),
(364, '苗栗縣', '大湖鄉'),
(365, '苗栗縣', '泰安鄉'),
(366, '苗栗縣', '銅鑼鄉'),
(367, '苗栗縣', '三義鄉'),
(368, '苗栗縣', '西湖鄉'),
(369, '苗栗縣', '卓蘭鎮'),
(400, '台中市', '中區'),
(401, '台中市', '東區'),
(402, '台中市', '南區'),
(403, '台中市', '西區'),
(404, '台中市', '北區'),
(406, '台中市', '北屯區'),
(407, '台中市', '西屯區'),
(408, '台中市', '南屯區'),
(411, '台中市', '太平區'),
(412, '台中市', '大里區'),
(413, '台中市', '霧峰區'),
(414, '台中市', '烏日區'),
(420, '台中市', '豐原區'),
(421, '台中市', '后里區'),
(422, '台中市', '石岡區'),
(423, '台中市', '東勢區'),
(424, '台中市', '和平區'),
(426, '台中市', '新社區'),
(427, '台中市', '潭子區'),
(428, '台中市', '大雅區'),
(429, '台中市', '神岡區'),
(432, '台中市', '大肚區'),
(433, '台中市', '沙鹿區'),
(434, '台中市', '龍井區'),
(435, '台中市', '梧棲區'),
(436, '台中市', '清水區'),
(437, '台中市', '大甲區'),
(438, '台中市', '外埔區'),
(439, '台中市', '大安區'),
(500, '彰化縣', '彰化市'),
(502, '彰化縣', '芬園鄉'),
(503, '彰化縣', '花壇鄉'),
(504, '彰化縣', '秀水鄉'),
(505, '彰化縣', '鹿港鎮'),
(506, '彰化縣', '福興鄉'),
(507, '彰化縣', '線西鄉'),
(508, '彰化縣', '和美鎮'),
(509, '彰化縣', '伸港鄉'),
(510, '彰化縣', '員林鎮'),
(511, '彰化縣', '社頭鄉'),
(512, '彰化縣', '永靖鄉'),
(513, '彰化縣', '埔心鄉'),
(514, '彰化縣', '溪湖鎮'),
(515, '彰化縣', '大村鄉'),
(516, '彰化縣', '埔鹽鄉'),
(520, '彰化縣', '田中鎮'),
(521, '彰化縣', '北斗鎮'),
(522, '彰化縣', '田尾鄉'),
(523, '彰化縣', '埤頭鄉'),
(524, '彰化縣', '溪州鄉'),
(525, '彰化縣', '竹塘鄉'),
(526, '彰化縣', '二林鎮'),
(527, '彰化縣', '大城鄉'),
(528, '彰化縣', '芳苑鄉'),
(530, '彰化縣', '二水鄉'),
(540, '南投縣', '南投市'),
(541, '南投縣', '中寮鄉'),
(542, '南投縣', '草屯鎮'),
(544, '南投縣', '國姓鄉'),
(545, '南投縣', '埔里鎮'),
(546, '南投縣', '仁愛鄉'),
(551, '南投縣', '名間鄉'),
(552, '南投縣', '集集鎮'),
(553, '南投縣', '水里鄉'),
(555, '南投縣', '魚池鄉'),
(556, '南投縣', '信義鄉'),
(557, '南投縣', '竹山鎮'),
(558, '南投縣', '鹿谷鄉'),
(600, '嘉義市', ''),
(602, '嘉義縣', '番路鄉'),
(603, '嘉義縣', '梅山鄉'),
(604, '嘉義縣', '竹崎鄉'),
(605, '嘉義縣', '阿里山鄉'),
(606, '嘉義縣', '中埔鄉'),
(607, '嘉義縣', '大埔鄉'),
(608, '嘉義縣', '水上鄉'),
(611, '嘉義縣', '鹿草鄉'),
(612, '嘉義縣', '太保市'),
(613, '嘉義縣', '朴子市'),
(614, '嘉義縣', '東石鄉'),
(615, '嘉義縣', '六腳鄉'),
(616, '嘉義縣', '新港鄉'),
(621, '嘉義縣', '民雄鄉'),
(622, '嘉義縣', '大林鎮'),
(623, '嘉義縣', '溪口鄉'),
(624, '嘉義縣', '義竹鄉'),
(625, '嘉義縣', '布袋鎮'),
(630, '雲林縣', '斗南鎮'),
(631, '雲林縣', '大埤鄉'),
(632, '雲林縣', '虎尾鎮'),
(633, '雲林縣', '土庫鎮'),
(634, '雲林縣', '褒忠鄉'),
(635, '雲林縣', '東勢鄉'),
(636, '雲林縣', '臺西鄉'),
(637, '雲林縣', '崙背鄉'),
(638, '雲林縣', '麥寮鄉'),
(640, '雲林縣', '斗六市'),
(643, '雲林縣', '林內鄉'),
(646, '雲林縣', '古坑鄉'),
(647, '雲林縣', '莿桐鄉'),
(648, '雲林縣', '西螺鎮'),
(649, '雲林縣', '二崙鄉'),
(651, '雲林縣', '北港鎮'),
(652, '雲林縣', '水林鄉'),
(653, '雲林縣', '口湖鄉'),
(654, '雲林縣', '四湖鄉'),
(655, '雲林縣', '元長鄉'),
(700, '台南市', '中西區'),
(701, '台南市', '東區'),
(702, '台南市', '南區'),
(704, '台南市', '北區'),
(708, '台南市', '安平區'),
(709, '台南市', '安南區'),
(710, '台南市', '永康區'),
(711, '台南市', '歸仁區'),
(712, '台南市', '新化區'),
(713, '台南市', '左鎮區'),
(714, '台南市', '玉井區'),
(715, '台南市', '楠西區'),
(716, '台南市', '南化區'),
(717, '台南市', '仁德區'),
(718, '台南市', '關廟區'),
(719, '台南市', '龍崎區'),
(720, '台南市', '官田區'),
(721, '台南市', '麻豆區'),
(722, '台南市', '佳里區'),
(723, '台南市', '西港區'),
(724, '台南市', '七股區'),
(725, '台南市', '將軍區'),
(726, '台南市', '學甲區'),
(727, '台南市', '北門區'),
(730, '台南市', '新營區'),
(731, '台南市', '後壁區'),
(732, '台南市', '白河區'),
(733, '台南市', '東山區'),
(734, '台南市', '六甲區'),
(735, '台南市', '下營區'),
(736, '台南市', '柳營區'),
(737, '台南市', '鹽水區'),
(741, '台南市', '善化區'),
(742, '台南市', '大內區'),
(743, '台南市', '山上區'),
(744, '台南市', '新市區'),
(745, '台南市', '安定區'),
(800, '高雄市', '新興區'),
(801, '高雄市', '前金區'),
(802, '高雄市', '苓雅區'),
(803, '高雄市', '鹽埕區'),
(804, '高雄市', '鼓山區'),
(805, '高雄市', '旗津區'),
(806, '高雄市', '前鎮區'),
(807, '高雄市', '三民區'),
(811, '高雄市', '楠梓區'),
(812, '高雄市', '小港區'),
(813, '高雄市', '左營區'),
(814, '高雄市', '仁武區'),
(815, '高雄市', '大社區'),
(817, '南海諸島', '東沙'),
(819, '南海諸島', '南沙'),
(820, '高雄市', '岡山區'),
(821, '高雄市', '路竹區'),
(822, '高雄市', '阿蓮區'),
(823, '高雄市', '田寮區'),
(824, '高雄市', '燕巢區'),
(825, '高雄市', '橋頭區'),
(826, '高雄市', '梓官區'),
(827, '高雄市', '彌陀區'),
(828, '高雄市', '永安區'),
(829, '高雄市', '湖內區'),
(830, '高雄市', '鳳山區'),
(831, '高雄市', '大寮區'),
(832, '高雄市', '林園區'),
(833, '高雄市', '鳥松區'),
(840, '高雄市', '大樹區'),
(842, '高雄市', '旗山區'),
(843, '高雄市', '美濃區'),
(844, '高雄市', '六龜區'),
(845, '高雄市', '內門區'),
(846, '高雄市', '杉林區'),
(847, '高雄市', '甲仙區'),
(848, '高雄市', '桃源區'),
(849, '高雄市', '那瑪夏區'),
(851, '高雄市', '茂林區'),
(852, '高雄市', '茄萣區'),
(880, '澎湖縣', '馬公市'),
(881, '澎湖縣', '西嶼鄉'),
(882, '澎湖縣', '望安鄉'),
(883, '澎湖縣', '七美鄉'),
(884, '澎湖縣', '白沙鄉'),
(885, '澎湖縣', '湖西鄉'),
(890, '金門縣', '金沙鎮'),
(891, '金門縣', '金湖鎮'),
(892, '金門縣', '金寧鄉'),
(893, '金門縣', '金城鎮'),
(894, '金門縣', '烈嶼鄉'),
(896, '金門縣', '烏坵鄉'),
(900, '屏東縣', '屏東市'),
(901, '屏東縣', '三地門鄉'),
(902, '屏東縣', '霧臺鄉'),
(903, '屏東縣', '瑪家鄉'),
(904, '屏東縣', '九如鄉'),
(905, '屏東縣', '里港鄉'),
(906, '屏東縣', '高樹鄉'),
(907, '屏東縣', '鹽埔鄉'),
(908, '屏東縣', '長治鄉'),
(909, '屏東縣', '麟洛鄉'),
(911, '屏東縣', '竹田鄉'),
(912, '屏東縣', '內埔鄉'),
(913, '屏東縣', '萬丹鄉'),
(920, '屏東縣', '潮州鎮'),
(921, '屏東縣', '泰武鄉'),
(922, '屏東縣', '來義鄉'),
(923, '屏東縣', '萬巒鄉'),
(924, '屏東縣', '崁頂鄉'),
(925, '屏東縣', '新埤鄉'),
(926, '屏東縣', '南州鄉'),
(927, '屏東縣', '林邊鄉'),
(928, '屏東縣', '東港鄉'),
(929, '屏東縣', '琉球鄉'),
(931, '屏東縣', '佳冬鄉'),
(932, '屏東縣', '新園鄉'),
(940, '屏東縣', '枋寮鄉'),
(941, '屏東縣', '枋山鄉'),
(942, '屏東縣', '春日鄉'),
(943, '屏東縣', '獅子鄉'),
(944, '屏東縣', '車城鄉'),
(945, '屏東縣', '牡丹鄉'),
(946, '屏東縣', '恆春鄉'),
(947, '屏東縣', '滿州鄉'),
(950, '台東縣', '臺東市'),
(951, '台東縣', '綠島鄉'),
(952, '台東縣', '蘭嶼鄉'),
(953, '台東縣', '延平鄉'),
(954, '台東縣', '卑南鄉'),
(955, '台東縣', '鹿野鄉'),
(956, '台東縣', '關山鎮'),
(957, '台東縣', '海端鄉'),
(958, '台東縣', '池上鄉'),
(959, '台東縣', '東河鄉'),
(961, '台東縣', '成功鎮'),
(962, '台東縣', '長濱鄉'),
(963, '台東縣', '太麻里鄉'),
(964, '台東縣', '金峰鄉'),
(965, '台東縣', '大武鄉'),
(966, '台東縣', '達仁鄉'),
(970, '花蓮縣', '花蓮市'),
(971, '花蓮縣', '新城鄉'),
(972, '花蓮縣', '秀林鄉'),
(973, '花蓮縣', '吉安鄉'),
(974, '花蓮縣', '壽豐鄉'),
(975, '花蓮縣', '鳳林鎮'),
(976, '花蓮縣', '光復鄉'),
(977, '花蓮縣', '豐濱鄉'),
(978, '花蓮縣', '瑞穗鄉'),
(979, '花蓮縣', '萬榮鄉'),
(981, '花蓮縣', '玉里鎮'),
(982, '花蓮縣', '卓溪鄉'),
(983, '花蓮縣', '富里鄉');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressId`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `zipcodeId` (`zipcodeId`);

--
-- 資料表索引 `auction`
--
ALTER TABLE `auction`
  ADD PRIMARY KEY (`auctionId`);

--
-- 資料表索引 `auctionorder`
--
ALTER TABLE `auctionorder`
  ADD PRIMARY KEY (`auctionOrderId`),
  ADD KEY `auctionProductId` (`auctionProductId`),
  ADD KEY `memberId` (`memberId`);

--
-- 資料表索引 `auctionproduct`
--
ALTER TABLE `auctionproduct`
  ADD PRIMARY KEY (`auctionProductId`),
  ADD KEY `auctionId` (`auctionId`),
  ADD KEY `auctionProductStatusId` (`auctionProductStatusId`);

--
-- 資料表索引 `auctionproductstatus`
--
ALTER TABLE `auctionproductstatus`
  ADD PRIMARY KEY (`auctionProductStatusId`);

--
-- 資料表索引 `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`bankId`);

--
-- 資料表索引 `bankaccount`
--
ALTER TABLE `bankaccount`
  ADD PRIMARY KEY (`bankAccountId`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `bankId` (`bankId`);

--
-- 資料表索引 `biddinghistory`
--
ALTER TABLE `biddinghistory`
  ADD PRIMARY KEY (`biddingHistoryId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `memberId` (`memberId`);

--
-- 資料表索引 `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`brandId`);

--
-- 資料表索引 `brandcat`
--
ALTER TABLE `brandcat`
  ADD PRIMARY KEY (`brandCatId`),
  ADD KEY `brandId` (`brandId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- 資料表索引 `categorydetail`
--
ALTER TABLE `categorydetail`
  ADD PRIMARY KEY (`categoryDetailId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `detailId` (`detailId`),
  ADD KEY `detailTitleId` (`detailTitleId`);

--
-- 資料表索引 `creditcard`
--
ALTER TABLE `creditcard`
  ADD PRIMARY KEY (`creditCardId`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `bankId` (`bankId`);

--
-- 資料表索引 `detail`
--
ALTER TABLE `detail`
  ADD PRIMARY KEY (`detailId`);

--
-- 資料表索引 `detailtitle`
--
ALTER TABLE `detailtitle`
  ADD PRIMARY KEY (`detailTitleId`);

--
-- 資料表索引 `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`levelId`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`memberId`),
  ADD KEY `levelId` (`levelId`),
  ADD KEY `shoplevelId` (`shoplevelId`);

--
-- 資料表索引 `newcategorydetail`
--
ALTER TABLE `newcategorydetail`
  ADD PRIMARY KEY (`newcategoryDetailId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `detailId` (`detailId`);

--
-- 資料表索引 `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `buyerId` (`buyerId`),
  ADD KEY `shopId` (`shopId`),
  ADD KEY `addressId` (`addressId`);

--
-- 資料表索引 `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD PRIMARY KEY (`orderStatusId`);

--
-- 資料表索引 `orderstatusdetail`
--
ALTER TABLE `orderstatusdetail`
  ADD PRIMARY KEY (`orderStatusDetailId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `orderStatusId` (`orderStatusId`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `shopId` (`shopId`),
  ADD KEY `brandId` (`brandId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `bagSexId` (`bagSexId`),
  ADD KEY `bagTypeId` (`bagTypeId`),
  ADD KEY `bagColorId` (`bagColorId`),
  ADD KEY `clothSexId` (`clothSexId`),
  ADD KEY `clothSizeId` (`clothSizeId`),
  ADD KEY `clothSeasonId` (`clothSeasonId`),
  ADD KEY `shoesSexId` (`shoesSexId`),
  ADD KEY `shoesSizeId` (`shoesSizeId`),
  ADD KEY `shoesYearId` (`shoesYearId`),
  ADD KEY `watchSexId` (`watchSexId`),
  ADD KEY `watchTypeId` (`watchTypeId`),
  ADD KEY `productConditionId` (`productConditionId`),
  ADD KEY `productStatusId` (`productStatusId`),
  ADD KEY `orderId` (`orderId`);

--
-- 資料表索引 `productcondition`
--
ALTER TABLE `productcondition`
  ADD PRIMARY KEY (`productConditionId`);

--
-- 資料表索引 `productstatus`
--
ALTER TABLE `productstatus`
  ADD PRIMARY KEY (`productStatusId`);

--
-- 資料表索引 `shoplevel`
--
ALTER TABLE `shoplevel`
  ADD PRIMARY KEY (`shopLevelId`);

--
-- 資料表索引 `wishproduct`
--
ALTER TABLE `wishproduct`
  ADD PRIMARY KEY (`wishProductId`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `productId` (`productId`);

--
-- 資料表索引 `wishshop`
--
ALTER TABLE `wishshop`
  ADD PRIMARY KEY (`wishShopId`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `shopId` (`shopId`);

--
-- 資料表索引 `zipcode`
--
ALTER TABLE `zipcode`
  ADD PRIMARY KEY (`zipcodeId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `address`
--
ALTER TABLE `address`
  MODIFY `addressId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `auction`
--
ALTER TABLE `auction`
  MODIFY `auctionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `auctionorder`
--
ALTER TABLE `auctionorder`
  MODIFY `auctionOrderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `auctionproduct`
--
ALTER TABLE `auctionproduct`
  MODIFY `auctionProductId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bank`
--
ALTER TABLE `bank`
  MODIFY `bankId` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bankaccount`
--
ALTER TABLE `bankaccount`
  MODIFY `bankAccountId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `biddinghistory`
--
ALTER TABLE `biddinghistory`
  MODIFY `biddingHistoryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `brand`
--
ALTER TABLE `brand`
  MODIFY `brandId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `brandcat`
--
ALTER TABLE `brandcat`
  MODIFY `brandCatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `categorydetail`
--
ALTER TABLE `categorydetail`
  MODIFY `categoryDetailId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `creditcard`
--
ALTER TABLE `creditcard`
  MODIFY `creditCardId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `memberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `newcategorydetail`
--
ALTER TABLE `newcategorydetail`
  MODIFY `newcategoryDetailId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order`
--
ALTER TABLE `order`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orderstatusdetail`
--
ALTER TABLE `orderstatusdetail`
  MODIFY `orderStatusDetailId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `wishproduct`
--
ALTER TABLE `wishproduct`
  MODIFY `wishProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `wishshop`
--
ALTER TABLE `wishshop`
  MODIFY `wishShopId` int(11) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `address_ibfk_2` FOREIGN KEY (`zipcodeId`) REFERENCES `zipcode` (`zipcodeId`);

--
-- 資料表的限制式 `auctionorder`
--
ALTER TABLE `auctionorder`
  ADD CONSTRAINT `auctionorder_ibfk_1` FOREIGN KEY (`auctionProductId`) REFERENCES `auctionproduct` (`auctionProductId`),
  ADD CONSTRAINT `auctionorder_ibfk_2` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- 資料表的限制式 `auctionproduct`
--
ALTER TABLE `auctionproduct`
  ADD CONSTRAINT `auctionproduct_ibfk_1` FOREIGN KEY (`auctionId`) REFERENCES `auction` (`auctionId`),
  ADD CONSTRAINT `auctionproduct_ibfk_2` FOREIGN KEY (`auctionProductStatusId`) REFERENCES `auctionproductstatus` (`auctionProductStatusId`);

--
-- 資料表的限制式 `bankaccount`
--
ALTER TABLE `bankaccount`
  ADD CONSTRAINT `bankaccount_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `bankaccount_ibfk_2` FOREIGN KEY (`bankId`) REFERENCES `bank` (`bankId`);

--
-- 資料表的限制式 `biddinghistory`
--
ALTER TABLE `biddinghistory`
  ADD CONSTRAINT `biddinghistory_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `biddinghistory_ibfk_2` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- 資料表的限制式 `brandcat`
--
ALTER TABLE `brandcat`
  ADD CONSTRAINT `brandcat_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brand` (`brandId`),
  ADD CONSTRAINT `brandcat_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

--
-- 資料表的限制式 `categorydetail`
--
ALTER TABLE `categorydetail`
  ADD CONSTRAINT `categorydetail_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`),
  ADD CONSTRAINT `categorydetail_ibfk_2` FOREIGN KEY (`detailId`) REFERENCES `detail` (`detailId`),
  ADD CONSTRAINT `categorydetail_ibfk_3` FOREIGN KEY (`detailTitleId`) REFERENCES `detailtitle` (`detailTitleId`);

--
-- 資料表的限制式 `creditcard`
--
ALTER TABLE `creditcard`
  ADD CONSTRAINT `creditcard_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `creditcard_ibfk_2` FOREIGN KEY (`bankId`) REFERENCES `bank` (`bankId`);

--
-- 資料表的限制式 `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`levelId`) REFERENCES `level` (`levelId`),
  ADD CONSTRAINT `member_ibfk_2` FOREIGN KEY (`shoplevelId`) REFERENCES `shoplevel` (`shopLevelId`);

--
-- 資料表的限制式 `newcategorydetail`
--
ALTER TABLE `newcategorydetail`
  ADD CONSTRAINT `newcategorydetail_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`),
  ADD CONSTRAINT `newcategorydetail_ibfk_2` FOREIGN KEY (`detailId`) REFERENCES `categorydetail` (`categoryDetailId`);

--
-- 資料表的限制式 `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`buyerId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`shopId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`addressId`) REFERENCES `address` (`addressId`);

--
-- 資料表的限制式 `orderstatusdetail`
--
ALTER TABLE `orderstatusdetail`
  ADD CONSTRAINT `orderstatusdetail_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`),
  ADD CONSTRAINT `orderstatusdetail_ibfk_2` FOREIGN KEY (`orderStatusId`) REFERENCES `orderstatus` (`orderStatusId`);

--
-- 資料表的限制式 `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `product_ibfk_10` FOREIGN KEY (`shoesSexId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_11` FOREIGN KEY (`shoesSizeId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_12` FOREIGN KEY (`shoesYearId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_13` FOREIGN KEY (`watchSexId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_14` FOREIGN KEY (`watchTypeId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_15` FOREIGN KEY (`productConditionId`) REFERENCES `productcondition` (`productConditionId`),
  ADD CONSTRAINT `product_ibfk_16` FOREIGN KEY (`productStatusId`) REFERENCES `productstatus` (`productStatusId`),
  ADD CONSTRAINT `product_ibfk_17` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brand` (`brandId`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`),
  ADD CONSTRAINT `product_ibfk_4` FOREIGN KEY (`bagSexId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_5` FOREIGN KEY (`bagTypeId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_6` FOREIGN KEY (`bagColorId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_7` FOREIGN KEY (`clothSexId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_8` FOREIGN KEY (`clothSizeId`) REFERENCES `categorydetail` (`categoryDetailId`),
  ADD CONSTRAINT `product_ibfk_9` FOREIGN KEY (`clothSeasonId`) REFERENCES `categorydetail` (`categoryDetailId`);

--
-- 資料表的限制式 `wishproduct`
--
ALTER TABLE `wishproduct`
  ADD CONSTRAINT `wishproduct_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `wishproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- 資料表的限制式 `wishshop`
--
ALTER TABLE `wishshop`
  ADD CONSTRAINT `wishshop_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `wishshop_ibfk_2` FOREIGN KEY (`shopId`) REFERENCES `member` (`memberId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
