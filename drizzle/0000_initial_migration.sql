DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('admin', 'teacher', 'student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens_pairs" (
	"id" serial PRIMARY KEY NOT NULL,
	"access_token" text NOT NULL,
	"refresh_token" text NOT NULL,
	"refresh_create_date" timestamp DEFAULT now() NOT NULL,
	"access_create_date" timestamp DEFAULT now() NOT NULL,
	"used" boolean DEFAULT false,
	CONSTRAINT "tokens_pairs_access_token_unique" UNIQUE("access_token"),
	CONSTRAINT "tokens_pairs_refresh_token_unique" UNIQUE("refresh_token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text,
	"roles" "roles",
	"password_hash" text NOT NULL,
	"tokens_pair_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_tokens_pair_id_tokens_pairs_id_fk" FOREIGN KEY ("tokens_pair_id") REFERENCES "tokens_pairs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
