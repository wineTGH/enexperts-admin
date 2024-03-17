CREATE TABLE IF NOT EXISTS "refresh_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"refresh_token" text NOT NULL,
	"creation_date" timestamp DEFAULT now() NOT NULL,
	"used" boolean DEFAULT false,
	"user_id" integer,
	CONSTRAINT "refresh_tokens_refresh_token_unique" UNIQUE("refresh_token")
);
--> statement-breakpoint
DROP TABLE "tokens_pairs";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
