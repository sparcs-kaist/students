CREATE TABLE `budget_proposal_expense` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_proposal_expense_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_proposal_expense_document_review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_proposal_expense_revision_id` int NOT NULL,
	`student_id` int NOT NULL,
	`document_review_status_enum` int NOT NULL,
	`detail` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_proposal_expense_document_review_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_proposal_expense_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_proposal_expense_id` int NOT NULL,
	`budget_domain_enum` int,
	`budget_division_expense_enum` int,
	`budget_class_expense_enum` int,
	`name` varchar(30) NOT NULL,
	`amount` int,
	`detail` text,
	`code` int NOT NULL,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_proposal_expense_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_proposal_income` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_proposal_income_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_proposal_income_document_review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_proposal_income_revision_id` int NOT NULL,
	`student_id` int NOT NULL,
	`document_review_status_enum` int NOT NULL,
	`detail` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_proposal_income_document_review_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_proposal_income_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_proposal_income_id` int NOT NULL,
	`budget_domain_enum` int NOT NULL,
	`budget_division_income_enum` int NOT NULL,
	`name` varchar(30) NOT NULL,
	`amount` int NOT NULL,
	`detail` text NOT NULL,
	`code` int NOT NULL,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_proposal_income_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_report_expense` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_report_expense_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_report_expense_document_review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_report_expense_revision_id` int NOT NULL,
	`student_id` int NOT NULL,
	`document_review_status_enum` int NOT NULL,
	`detail` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_report_expense_document_review_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_report_expense_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_report_expense_id` int NOT NULL,
	`budget_domain_enum` int,
	`budget_division_expense_enum` int,
	`budget_class_expense_enum` int,
	`name` varchar(30) NOT NULL,
	`amount` int,
	`detail` text,
	`code` int NOT NULL,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_report_expense_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_report_income` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_report_income_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_report_income_document_review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_report_income_revision_id` int NOT NULL,
	`student_id` int NOT NULL,
	`document_review_status_enum` int NOT NULL,
	`detail` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_report_income_document_review_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_report_income_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`budget_report_income_id` int NOT NULL,
	`budget_domain_enum` int NOT NULL,
	`budget_division_income_enum` int NOT NULL,
	`name` varchar(30) NOT NULL,
	`amount` int NOT NULL,
	`detail` text NOT NULL,
	`code` int NOT NULL,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `budget_report_income_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `file` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`extension` varchar(30) NOT NULL,
	`size` int NOT NULL,
	`user_id` int NOT NULL,
	`signed_at` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `file_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `agenda` (
	`id` int AUTO_INCREMENT NOT NULL,
	`meeting_id` int NOT NULL,
	`agenda_type_enum` int NOT NULL,
	`name` varchar(30) NOT NULL,
	`detail` text,
	`agenda_status_enum` int NOT NULL,
	`submitted_at` datetime,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `agenda_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meeting` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(30) NOT NULL,
	`meeting_type_enum` int NOT NULL,
	`detail` text,
	`semester_id` int NOT NULL,
	`start_term` datetime,
	`end_term` datetime,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `meeting_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notice` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `notice_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`start_term` datetime NOT NULL,
	`end_term` datetime,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `staff_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uapresident` (
	`id` int AUTO_INCREMENT NOT NULL,
	`student_id` int NOT NULL,
	`start_term` datetime NOT NULL,
	`end_term` datetime,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `uapresident_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Petition` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`detail` text NOT NULL,
	`start_term` datetime NOT NULL,
	`end_term` datetime,
	`petition_status_enum_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `Petition_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `PetitionAgree` (
	`id` int AUTO_INCREMENT NOT NULL,
	`petition_id` int NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `PetitionAgree_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `PetitionAnswer` (
	`id` int AUTO_INCREMENT NOT NULL,
	`petition_id` int NOT NULL,
	`user_id` int NOT NULL,
	`team_id` int NOT NULL,
	`posted` boolean NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `PetitionAnswer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `execution_proposal` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operating_committee_id` int NOT NULL,
	`note` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `execution_proposal_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `execution_proposal_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`execution_proposal_id` int NOT NULL,
	`team_id` int NOT NULL,
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `execution_proposal_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operation_proposal` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `operation_proposal_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operation_proposal_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operation_proposal_id` int NOT NULL,
	`organization_diagram_id` int NOT NULL,
	`note` text,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `operation_proposal_revision_id` PRIMARY KEY(`id`),
	CONSTRAINT `operation_proposal_revision_organization_diagram_id_unique` UNIQUE(`organization_diagram_id`)
);
--> statement-breakpoint
CREATE TABLE `project_proposal` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `project_proposal_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_proposal_document_review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_proposal_revision_id` int NOT NULL,
	`student_id` int NOT NULL,
	`document_review_status_enum_id` int NOT NULL,
	`detail` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `project_proposal_document_review_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_proposal_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_proposal_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`method` text,
	`prepare_start_term` timestamp,
	`prepare_end_term` timestamp,
	`start_term` timestamp,
	`end_term` timestamp,
	`team_id` int,
	`manager_id` int,
	`purpose` text,
	`target` text,
	`detail` text,
	`note` text,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	`code` int NOT NULL,
	CONSTRAINT `project_proposal_revision_id` PRIMARY KEY(`id`),
	CONSTRAINT `project_proposal_revision_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `project_proposal_timeline` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` int NOT NULL,
	`start_term` timestamp NOT NULL,
	`end_term` timestamp NOT NULL,
	`detail` text NOT NULL,
	`note` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `project_proposal_timeline_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operating_committee_report_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operation_report_revision_id` int NOT NULL,
	`operating_committee_id` int NOT NULL,
	`note` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `operating_committee_report_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operation_report` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `operation_report_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operation_report_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operation_report_id` int NOT NULL,
	`organization_diagram_id` int NOT NULL,
	`note` text,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `operation_report_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_report` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization_id` int NOT NULL,
	`semester_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `project_report_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_report_document_review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_report_revision_id` int NOT NULL,
	`student_id` int NOT NULL,
	`document_review_status_enum` int NOT NULL,
	`detail` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `project_report_document_review_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_report_revision` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_report_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`method` text,
	`prepare_start_term` timestamp,
	`prepare_end_term` timestamp,
	`start_term` timestamp,
	`end_term` timestamp,
	`team_id` int,
	`manager_id` int,
	`purpose` text,
	`target` text,
	`detail` text,
	`note` text,
	`submitted_at` timestamp,
	`cog_agenda_id` int,
	`gsrc_agenda_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `project_report_revision_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_report_timeline` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_report_revision_id` int NOT NULL,
	`start_term` timestamp NOT NULL,
	`end_term` timestamp NOT NULL,
	`detail` text NOT NULL,
	`note` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `project_report_timeline_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_operation_report` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operation_report_revision_id` int NOT NULL,
	`team_id` int NOT NULL,
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `team_operation_report_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auth_activated_refresh_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`expires_at` datetime NOT NULL,
	`refresh_token` text NOT NULL,
	CONSTRAINT `auth_activated_refresh_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `department` (
	`id` int NOT NULL,
	`name` varchar(60) NOT NULL,
	`name_en` varchar(100),
	CONSTRAINT `department_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `half_year`;--> statement-breakpoint
ALTER TABLE `operating_committee` DROP FOREIGN KEY `operating_committee_organization_id_fk`;
--> statement-breakpoint
ALTER TABLE `operating_committee_member` DROP FOREIGN KEY `operating_committee_member_operating_committee_id_fk`;
--> statement-breakpoint
ALTER TABLE `operating_committee_member` DROP FOREIGN KEY `operating_committee_member_student_id_fk`;
--> statement-breakpoint
ALTER TABLE `organization_manager` DROP FOREIGN KEY `organization_manager_organization_id_fk`;
--> statement-breakpoint
ALTER TABLE `organization_manager` DROP FOREIGN KEY `organization_manager_student_id_fk`;
--> statement-breakpoint
ALTER TABLE `organization_member` DROP FOREIGN KEY `organization_member_organization_id_fk`;
--> statement-breakpoint
ALTER TABLE `organization_member` DROP FOREIGN KEY `organization_member_student_id_fk`;
--> statement-breakpoint
ALTER TABLE `organization_president` DROP FOREIGN KEY `organization_president_organization_id_fk`;
--> statement-breakpoint
ALTER TABLE `organization_president` DROP FOREIGN KEY `organization_president_student_id_fk`;
--> statement-breakpoint
ALTER TABLE `team` DROP FOREIGN KEY `team_organization_id_fk`;
--> statement-breakpoint
ALTER TABLE `team_leader` DROP FOREIGN KEY `team_leader_team_id_fk`;
--> statement-breakpoint
ALTER TABLE `team_leader` DROP FOREIGN KEY `team_leader_student_id_fk`;
--> statement-breakpoint
ALTER TABLE `team_member` DROP FOREIGN KEY `team_member_team_id_fk`;
--> statement-breakpoint
ALTER TABLE `team_member` DROP FOREIGN KEY `team_member_student_id_fk`;
--> statement-breakpoint
ALTER TABLE `operating_committee` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `operating_committee` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `operating_committee_member` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `operating_committee_member` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `operating_committee_member` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `organization` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `organization` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `organization_manager` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `organization_manager` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `organization_manager` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `organization_member` MODIFY COLUMN `start_term` datetime;--> statement-breakpoint
ALTER TABLE `organization_member` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `organization_member` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `organization_president` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `organization_president` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `organization_president` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `team` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `team` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `team` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `team_leader` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `team_leader` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `team_leader` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `team_member` MODIFY COLUMN `start_term` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `team_member` MODIFY COLUMN `end_term` datetime;--> statement-breakpoint
ALTER TABLE `team_member` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `semester` MODIFY COLUMN `start_term` date NOT NULL;--> statement-breakpoint
ALTER TABLE `semester` MODIFY COLUMN `end_term` date NOT NULL;--> statement-breakpoint
ALTER TABLE `semester` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `student` MODIFY COLUMN `student_number` int;--> statement-breakpoint
ALTER TABLE `student` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `student` ADD CONSTRAINT `student_student_number_unique` UNIQUE(`student_number`);--> statement-breakpoint
ALTER TABLE `operating_committee` ADD `committee_type_enum` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `student` ADD `department_id` int;--> statement-breakpoint
ALTER TABLE `user` ADD `uid` varchar(30);--> statement-breakpoint
ALTER TABLE `user` ADD `sid` varchar(30);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_uid_unique` UNIQUE(`uid`);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_sid_unique` UNIQUE(`sid`);--> statement-breakpoint
CREATE INDEX `expires_at_idx` ON `auth_activated_refresh_tokens` (`expires_at`);--> statement-breakpoint
ALTER TABLE `operating_committee` ADD CONSTRAINT `op_com_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operating_committee_member` ADD CONSTRAINT `op_com_mem_com_id_fk` FOREIGN KEY (`operating_committee_id`) REFERENCES `operating_committee`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operating_committee_member` ADD CONSTRAINT `op_com_mem_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_manager` ADD CONSTRAINT `org_mgr_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_manager` ADD CONSTRAINT `org_mgr_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_member` ADD CONSTRAINT `org_mem_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_member` ADD CONSTRAINT `org_mem_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_president` ADD CONSTRAINT `org_pres_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `organization_president` ADD CONSTRAINT `org_pres_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team` ADD CONSTRAINT `team_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_leader` ADD CONSTRAINT `team_ldr_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_leader` ADD CONSTRAINT `team_ldr_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_member` ADD CONSTRAINT `team_mem_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_member` ADD CONSTRAINT `team_mem_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `student` ADD CONSTRAINT `student_department_id_fk` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_expense` ADD CONSTRAINT `bud_prop_exp_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_expense` ADD CONSTRAINT `bud_prop_exp_sem_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_expense_document_review` ADD CONSTRAINT `bud_prop_exp_doc_review_bud_prop_exp_rev_id_fk` FOREIGN KEY (`budget_proposal_expense_revision_id`) REFERENCES `budget_proposal_expense`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_expense_document_review` ADD CONSTRAINT `bud_prop_exp_doc_review_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_expense_revision` ADD CONSTRAINT `bud_prop_exp_rev_bud_prop_exp_id_fk` FOREIGN KEY (`budget_proposal_expense_id`) REFERENCES `budget_proposal_expense`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_expense_revision` ADD CONSTRAINT `bud_prop_exp_rev_cog_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_expense_revision` ADD CONSTRAINT `bud_prop_exp_rev_gsrc_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_income` ADD CONSTRAINT `bud_prop_inc_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_income` ADD CONSTRAINT `bud_prop_inc_sem_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_income_document_review` ADD CONSTRAINT `bud_prop_inc_rev_bud_prop_inc_id_fk` FOREIGN KEY (`budget_proposal_income_revision_id`) REFERENCES `budget_proposal_income_revision`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_income_document_review` ADD CONSTRAINT `bud_prop_inc_rev_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_income_revision` ADD CONSTRAINT `bud_prop_inc_rev_bud_prop_id_fk` FOREIGN KEY (`budget_proposal_income_id`) REFERENCES `budget_proposal_income`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_income_revision` ADD CONSTRAINT `bud_prop_inc_rev_cog_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_proposal_income_revision` ADD CONSTRAINT `bud_prop_inc_rev_gsrc_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_expense` ADD CONSTRAINT `bud_rep_exp_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_expense` ADD CONSTRAINT `bud_rep_exp_sem_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_expense_document_review` ADD CONSTRAINT `bud_rep_exp_doc_review_bud_rep_exp_rev_id_fk` FOREIGN KEY (`budget_report_expense_revision_id`) REFERENCES `budget_report_expense`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_expense_document_review` ADD CONSTRAINT `bud_rep_exp_doc_review_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_expense_revision` ADD CONSTRAINT `bud_rep_exp_rev_bud_rep_exp_id_fk` FOREIGN KEY (`budget_report_expense_id`) REFERENCES `budget_report_expense`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_expense_revision` ADD CONSTRAINT `bud_rep_exp_rev_cog_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_expense_revision` ADD CONSTRAINT `bud_rep_exp_rev_gsrc_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_income` ADD CONSTRAINT `bud_rep_inc_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_income` ADD CONSTRAINT `bud_rep_inc_sem_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_income_document_review` ADD CONSTRAINT `bud_rep_inc_doc_review_bud_rep_inc_rev_id_fk` FOREIGN KEY (`budget_report_income_revision_id`) REFERENCES `budget_report_income_revision`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_income_document_review` ADD CONSTRAINT `bud_rep_inc_doc_review_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_income_revision` ADD CONSTRAINT `bud_rep_inc_rev_bud_rep_id_fk` FOREIGN KEY (`budget_report_income_id`) REFERENCES `budget_report_income`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_income_revision` ADD CONSTRAINT `bud_rep_inc_rev_cog_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_report_income_revision` ADD CONSTRAINT `bud_rep_inc_rev_gsrc_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `file` ADD CONSTRAINT `file_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_meeting_id_fk` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `meeting` ADD CONSTRAINT `meeting_semester_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `staff` ADD CONSTRAINT `staff_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `uapresident` ADD CONSTRAINT `uapresident_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `execution_proposal` ADD CONSTRAINT `exec_prop_op_com_id_fk` FOREIGN KEY (`operating_committee_id`) REFERENCES `operating_committee`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `execution_proposal_revision` ADD CONSTRAINT `exec_prop_rev_exec_prop_id_fk` FOREIGN KEY (`execution_proposal_id`) REFERENCES `execution_proposal`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `execution_proposal_revision` ADD CONSTRAINT `exec_prop_rev_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_proposal` ADD CONSTRAINT `op_prop_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_proposal` ADD CONSTRAINT `op_prop_sem_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_proposal_revision` ADD CONSTRAINT `op_prop_rev_op_prop_id_fk` FOREIGN KEY (`operation_proposal_id`) REFERENCES `operation_proposal`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_proposal_revision` ADD CONSTRAINT `op_prop_rev_file_id_fk` FOREIGN KEY (`organization_diagram_id`) REFERENCES `file`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_proposal_revision` ADD CONSTRAINT `op_prop_rev_cog_age_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_proposal_revision` ADD CONSTRAINT `op_prop_rev_gsrc_age_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal` ADD CONSTRAINT `proj_pro_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal` ADD CONSTRAINT `proj_pro_sem_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_document_review` ADD CONSTRAINT `proj_prop_doc_review_proj_prop_rev_id_fk` FOREIGN KEY (`project_proposal_revision_id`) REFERENCES `project_proposal_revision`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_document_review` ADD CONSTRAINT `proj_prop_doc_review_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_revision` ADD CONSTRAINT `proj_prop_rev_proj_prop_id_fk` FOREIGN KEY (`project_proposal_id`) REFERENCES `project_proposal`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_revision` ADD CONSTRAINT `proj_prop_rev_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_revision` ADD CONSTRAINT `proj_prop_rev_student_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_revision` ADD CONSTRAINT `proj_prop_rev_cog_age_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_revision` ADD CONSTRAINT `proj_prop_rev_gsrc_age_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_proposal_timeline` ADD CONSTRAINT `proj_prop_time_proj_prop_rev_code_fk` FOREIGN KEY (`code`) REFERENCES `project_proposal_revision`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operating_committee_report_revision` ADD CONSTRAINT `operating_committee_report_operation_report_revision_id_fk` FOREIGN KEY (`operation_report_revision_id`) REFERENCES `operation_report_revision`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operating_committee_report_revision` ADD CONSTRAINT `operating_committee_report_ope_com_id_fk` FOREIGN KEY (`operating_committee_id`) REFERENCES `operating_committee`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_report` ADD CONSTRAINT `operation_report_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_report` ADD CONSTRAINT `operation_report_semester_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_report_revision` ADD CONSTRAINT `operation_report_revision_operation_report_id_fk` FOREIGN KEY (`operation_report_id`) REFERENCES `operation_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_report_revision` ADD CONSTRAINT `operation_report_revision_organization_diagram_id_fk` FOREIGN KEY (`organization_diagram_id`) REFERENCES `file`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_report_revision` ADD CONSTRAINT `operation_report_revision_cog_agenda_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `operation_report_revision` ADD CONSTRAINT `operation_report_revision_gsrc_agenda_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report` ADD CONSTRAINT `project_report_organization_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report` ADD CONSTRAINT `project_report_semester_id_fk` FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_document_review` ADD CONSTRAINT `proj_rep_doc_review_proj_rep_rev_id_fk` FOREIGN KEY (`project_report_revision_id`) REFERENCES `project_report_revision`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_document_review` ADD CONSTRAINT `proj_rep_doc_review_student_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_revision` ADD CONSTRAINT `project_report_revision_project_report_id_fk` FOREIGN KEY (`project_report_id`) REFERENCES `project_report`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_revision` ADD CONSTRAINT `project_report_revision_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_revision` ADD CONSTRAINT `project_report_revision_manager_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_revision` ADD CONSTRAINT `project_report_revision_cog_agenda_id_fk` FOREIGN KEY (`cog_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_revision` ADD CONSTRAINT `project_report_revision_gsrc_agenda_id_fk` FOREIGN KEY (`gsrc_agenda_id`) REFERENCES `agenda`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_report_timeline` ADD CONSTRAINT `project_report_timeline_revision_id_fk` FOREIGN KEY (`project_report_revision_id`) REFERENCES `project_report_revision`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_operation_report` ADD CONSTRAINT `team_operation_report_operation_report_revision_id_fk` FOREIGN KEY (`operation_report_revision_id`) REFERENCES `operation_report_revision`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_operation_report` ADD CONSTRAINT `team_operation_report_team_id_fk` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `auth_activated_refresh_tokens` ADD CONSTRAINT `auth_activated_refresh_tokens_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;