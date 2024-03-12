import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from "$env/static/private";

const client = new Client({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

await client.connect();
export const db = drizzle(client);