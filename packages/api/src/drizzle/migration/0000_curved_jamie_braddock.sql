CREATE TABLE `operating_committee` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`name_eng` varchar(255) NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `operating_committee_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operating_committee_member` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operating_committee_id` int NOT NULL,
	`student_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`legal_basis` varchar(255) NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `operating_committee_member_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organization` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`name_eng` varchar(255) NOT NULL,
	`organization_type_enum` int NOT NULL,
	`founding_year` int NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`organization_state_enum` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `organization_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organization_manager` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`student_id` int NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `organization_manager_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organization_member` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`student_id` int NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `organization_member_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organization_president` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`organization_president_type_enum` int NOT NULL,
	`title` varchar(100) NOT NULL,
	`student_id` int NOT NULL,
	`phone_number` varchar(20) NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `organization_president_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `team_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_leader` (
	`id` int AUTO_INCREMENT NOT NULL,
	`team_id` int NOT NULL,
	`student_id` int NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `team_leader_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_member` (
	`id` int AUTO_INCREMENT NOT NULL,
	`team_id` int NOT NULL,
	`student_id` int NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `team_member_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `half_year` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`year` int NOT NULL,
	`half_year_enum` int NOT NULL,
	`regular_semester_id` int NOT NULL,
	`seasonal_semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `half_year_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `semester` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`year` int NOT NULL,
	`semester_enum` int NOT NULL,
	`start_term` varchar(20) NOT NULL,
	`end_term` varchar(20) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `semester_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_number` varchar(20) NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `student_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `operating_committee` ADD CONSTRAINT `operating_committee_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operating_committee_member` ADD CONSTRAINT `operating_committee_member_operating_committee_id_fk` FOREIGN KEY (`operating_committee_id`) REFERENCES `operating_committee`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operating_committee_member` ADD CONSTRAINT `operating_committee_member_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_manager` ADD CONSTRAINT `organization_manager_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_manager` ADD CONSTRAINT `organization_manager_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_member` ADD CONSTRAINT `organization_member_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_member` ADD CONSTRAINT `organization_member_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_president` ADD CONSTRAINT `organization_president_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_president` ADD CONSTRAINT `organization_president_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team` ADD CONSTRAINT `team_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_leader` ADD CONSTRAINT `team_leader_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_leader` ADD CONSTRAINT `team_leader_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_member` ADD CONSTRAINT `team_member_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_member` ADD CONSTRAINT `team_member_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `half_year` ADD CONSTRAINT `half_year_regular_semester_id_fk` FOREIGN KEY (`regular_semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `half_year` ADD CONSTRAINT `half_year_seasonal_semester_id_fk` FOREIGN KEY (`seasonal_semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `student` ADD CONSTRAINT `student_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;