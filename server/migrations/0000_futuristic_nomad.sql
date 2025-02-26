CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`datetime` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_datetime_unique` ON `users_table` (`datetime`);