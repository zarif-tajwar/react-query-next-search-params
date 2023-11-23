CREATE TABLE `orders` (
	`order_id` integer PRIMARY KEY NOT NULL,
	`order_time_stamp_ms` integer,
	`total_bill` real,
	`delivery_time` integer,
	`order_status` text,
	`full_name` text
);
