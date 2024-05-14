import type { mediaTable, sessionsTable, usersTable } from "./schema";

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Session = typeof sessionsTable.$inferSelect;
export type NewSession = typeof sessionsTable.$inferInsert;

export type Media = typeof mediaTable.$inferSelect;
export type NewMedia = typeof mediaTable.$inferInsert;
