-- ========================================================
-- Database Schema for Brain Trainer (Montessori Basic Math)
-- Target: MySQL / MariaDB (XAMPP / phpMyAdmin 5.2.1)
-- Database Name: brain_trainer_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS `brain_trainer_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `brain_trainer_db`;

-- 1. Table: users
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'teacher', 'parent') NOT NULL DEFAULT 'student',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table: profiles
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL UNIQUE,
  `display_name` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `language` ENUM('id', 'en') NOT NULL DEFAULT 'id',
  `theme` ENUM('dark', 'light') NOT NULL DEFAULT 'dark',
  `grade_level` VARCHAR(20) DEFAULT 'SD Kelas 1-3',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_profile_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table: game_modules
CREATE TABLE IF NOT EXISTS `game_modules` (
  `id` VARCHAR(36) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `name_id` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `description_id` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `category` ENUM('concrete_montessori', 'mental_math', 'sandbox') NOT NULL DEFAULT 'concrete_montessori',
  `level` INT NOT NULL DEFAULT 1,
  `icon` VARCHAR(50) DEFAULT 'Shapes',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table: learning_records
CREATE TABLE IF NOT EXISTS `learning_records` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `module_id` VARCHAR(36) NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `accuracy` FLOAT NOT NULL DEFAULT 100.0,
  `streak` INT NOT NULL DEFAULT 1,
  `time_spent` INT NOT NULL DEFAULT 60, -- dalam detik
  `status` ENUM('completed', 'in_progress', 'failed') NOT NULL DEFAULT 'completed',
  `played_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_records_user` (`user_id`),
  INDEX `idx_records_module` (`module_id`),
  CONSTRAINT `fk_record_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_record_module` FOREIGN KEY (`module_id`) REFERENCES `game_modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Table: badges_achievement
CREATE TABLE IF NOT EXISTS `badges_achievement` (
  `id` VARCHAR(36) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `name_id` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `description_id` VARCHAR(255) NOT NULL,
  `description_en` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(50) NOT NULL,
  `reward_points` INT NOT NULL DEFAULT 100,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Table: user_badges (Many-to-Many User & Badges)
CREATE TABLE IF NOT EXISTS `user_badges` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `badge_id` VARCHAR(36) NOT NULL,
  `unlocked_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_badge` (`user_id`, `badge_id`),
  CONSTRAINT `fk_ub_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ub_badge` FOREIGN KEY (`badge_id`) REFERENCES `badges_achievement` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- SEED DATA: Modules, Badges, Demo Users & Learning Records
-- ========================================================

-- Insert Default Montessori Modules
INSERT INTO `game_modules` (`id`, `code`, `name_id`, `name_en`, `description_id`, `description_en`, `category`, `level`, `icon`) VALUES
('mod-1', 'number_rods', 'Batang Angka - Penjumlahan', 'Number Rods - Addition', 'Sensori konkret batang warna bergantian untuk memahami kuantitas 1-10 dan penjumlahan visual.', 'Sensory concrete colored alternating rods for understanding quantities 1-10 and visual addition.', 'concrete_montessori', 1, 'Ruler'),
('mod-2', 'golden_beads', 'Manik Emas - Nilai Tempat', 'Golden Beads - Place Value', 'Konsep nilai tempat: Satuan, Puluhan, Ratusan, dan Ribuan dengan manik emas interaktif.', 'Place value concept: Units, Tens, Hundreds, and Thousands with interactive golden beads.', 'concrete_montessori', 2, 'Coins'),
('mod-3', 'mental_math', 'Latihan Berhitung Mental', 'Mental Math Challenge', 'Pengembangan kelincahan berhitung cepat deduksi matematika tingkat 1 hingga 3.', 'Fast mental calculation agility development across levels 1 to 3.', 'mental_math', 3, 'Zap'),
('mod-4', 'sandbox_canvas', 'Sandbox Eksplorasi Bebas', 'Math Sandbox Canvas', 'Ruang eksplorasi bebas memanipulasi manik dan batang angka tanpa batasan waktu.', 'Freeform exploratory canvas to manipulate beads and number rods without time pressure.', 'sandbox', 1, 'Palette')
ON DUPLICATE KEY UPDATE `name_id` = VALUES(`name_id`);

-- Insert Default Badges
INSERT INTO `badges_achievement` (`id`, `code`, `name_id`, `name_en`, `description_id`, `description_en`, `icon`, `reward_points`) VALUES
('badge-1', 'first_step', 'Langkah Pertama', 'First Step', 'Menyelesaikan sesi latihan matematika pertama.', 'Completed the first math training session.', 'Sparkles', 50),
('badge-2', 'streak_master', 'Konsistensi 5 Hari', '5-Day Streak Master', 'Berlatih konsisten setiap hari selama 5 hari berturut-turut.', 'Trained consistently every day for 5 days.', 'Flame', 150),
('badge-3', 'accuracy_ace', 'Akurasi 100%', 'Accuracy Ace', 'Menyelesaikan satu modul penuh dengan akurasi 100%.', 'Completed an entire module with 100% accuracy.', 'Award', 200),
('badge-4', 'montessori_expert', 'Master Batang Angka', 'Number Rods Master', 'Menguasai seluruh level penjumlahan batang angka konkret.', 'Mastered all levels of concrete number rod additions.', 'Trophy', 300)
ON DUPLICATE KEY UPDATE `name_id` = VALUES(`name_id`);

-- Insert Demo Users (1 Teacher, 3 Students)
-- Password for all demo users is: password123 (hashed with bcrypt)
INSERT INTO `users` (`id`, `username`, `name`, `email`, `password_hash`, `role`) VALUES
('u-teacher-1', 'bu_guru_lina', 'Ibu Lina, S.Pd', 'lina.guru@braintrainer.id', '$2a$10$wT0E8u01zH0K3s0oZlFkAeB3fR0rO9X9N0d8A2vQ0XgX6o5Z8l1p2', 'teacher'),
('u-student-1', 'alvan_habibi', 'Alvan Habibi', 'alvan@braintrainer.id', '$2a$10$wT0E8u01zH0K3s0oZlFkAeB3fR0rO9X9N0d8A2vQ0XgX6o5Z8l1p2', 'student'),
('u-student-2', 'dani_rizki', 'Dani Rizki', 'dani@braintrainer.id', '$2a$10$wT0E8u01zH0K3s0oZlFkAeB3fR0rO9X9N0d8A2vQ0XgX6o5Z8l1p2', 'student'),
('u-student-3', 'azrul_ananda', 'Azrul Ananda', 'azrul@braintrainer.id', '$2a$10$wT0E8u01zH0K3s0oZlFkAeB3fR0rO9X9N0d8A2vQ0XgX6o5Z8l1p2', 'student')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Insert Profiles
INSERT INTO `profiles` (`id`, `user_id`, `display_name`, `language`, `theme`, `grade_level`) VALUES
('prof-1', 'u-teacher-1', 'Guru Lina (Wali Kelas)', 'id', 'dark', 'Guru SD'),
('prof-2', 'u-student-1', 'Alvan H. (Kelas 2B)', 'id', 'dark', 'SD Kelas 2'),
('prof-3', 'u-student-2', 'Dani R. (Kelas 2B)', 'id', 'dark', 'SD Kelas 2'),
('prof-4', 'u-student-3', 'Azrul A. (Kelas 2B)', 'en', 'dark', 'SD Kelas 2')
ON DUPLICATE KEY UPDATE `display_name` = VALUES(`display_name`);

-- Insert Sample Learning Records for Parent/Teacher Dashboard Tracker
INSERT INTO `learning_records` (`id`, `user_id`, `module_id`, `score`, `accuracy`, `streak`, `time_spent`, `status`, `played_at`) VALUES
('rec-1', 'u-student-1', 'mod-1', 480, 100.0, 5, 45, 'completed', '2026-10-14 08:30:00'),
('rec-2', 'u-student-1', 'mod-2', 520, 95.0, 5, 55, 'completed', '2026-10-14 09:15:00'),
('rec-3', 'u-student-2', 'mod-1', 410, 88.0, 3, 60, 'completed', '2026-10-13 10:20:00'),
('rec-4', 'u-student-2', 'mod-3', 350, 75.0, 3, 50, 'in_progress', '2026-10-14 11:00:00'),
('rec-5', 'u-student-3', 'mod-1', 490, 100.0, 7, 40, 'completed', '2026-10-14 07:45:00'),
('rec-6', 'u-student-3', 'mod-2', 460, 92.0, 7, 52, 'completed', '2026-10-14 08:10:00')
ON DUPLICATE KEY UPDATE `score` = VALUES(`score`);

-- Insert Unlocked Badges for Students
INSERT INTO `user_badges` (`id`, `user_id`, `badge_id`, `unlocked_at`) VALUES
('ub-1', 'u-student-1', 'badge-1', '2026-10-10 08:00:00'),
('ub-2', 'u-student-1', 'badge-3', '2026-10-14 08:30:00'),
('ub-3', 'u-student-3', 'badge-1', '2026-10-08 09:00:00'),
('ub-4', 'u-student-3', 'badge-2', '2026-10-14 08:00:00')
ON DUPLICATE KEY UPDATE `unlocked_at` = VALUES(`unlocked_at`);
