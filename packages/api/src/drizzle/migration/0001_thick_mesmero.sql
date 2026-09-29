CREATE TABLE `organization_role` (
  `id` int AUTO_INCREMENT NOT NULL,
  `organization_id` int NOT NULL,
  `student_id` int NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `start_term` datetime NOT NULL,
  `end_term` datetime,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp,
  CONSTRAINT `organization_role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `organization_role` ADD CONSTRAINT `org_role_org_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `organization_role` ADD CONSTRAINT `org_role_stu_id_fk` FOREIGN KEY (`student_id`) REFERENCES `student`(`id`) ON DELETE no action ON UPDATE no action;
