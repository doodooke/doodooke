-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `avater_id` int(11) NOT NULL DEFAULT '0',
  `nickname` text,
  `password` text,
  `phone` text COMMENT '手机号',
  `email` text,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='管理员列表';

INSERT INTO `admin` (`id`, `avater_id`, `nickname`, `password`, `phone`, `email`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1,	0,	'admin',	'21232f297a57a5a743894a0e4a801fc3',	'17638188752',	'admin@admin.com',	1,	'2016-04-06 02:34:31',	'2018-08-13 07:32:00',	NULL);

SET NAMES utf8mb4;

CREATE TABLE `admin_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL DEFAULT '0' COMMENT '超管',
  `ip` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ip',
  `info` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '信息',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='超管登录日志';


-- 2018-10-23 02:05:46
