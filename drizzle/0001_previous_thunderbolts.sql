ALTER TABLE "users" DROP CONSTRAINT "users_tokens_pair_id_tokens_pairs_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT 'student';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roles" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tokens_pairs" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens_pairs" ADD CONSTRAINT "tokens_pairs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "tokens_pair_id";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");