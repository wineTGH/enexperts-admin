import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/lib/server/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        host: process.env.DB_HOST || "",
        port: Number(process.env.DB_PORT) || 0,
        user: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "",
    },
})