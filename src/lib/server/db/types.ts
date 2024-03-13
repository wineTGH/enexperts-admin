import { tokensPairs, users } from "./schema";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type TokensPairs = typeof tokensPairs.$inferSelect;
export type NewTokensPairs = typeof tokensPairs.$inferInsert;