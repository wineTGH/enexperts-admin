import jwt from "jsonwebtoken";
import type { User } from "./db/types";
import { REFRESH_TOKEN_SECRET } from "$env/static/private";
import { db } from "./db";
import { users, refreshTokens } from "./db/schema";
import { eq } from "drizzle-orm";
import { getUser } from "./users";

type RefreshTokenSchema = {
    username: string;
    userId: number;
}

type AccessTokenSchema = {
    username: string;
    role: "admin" | "teacher" | "student";
}

export async function createTokens(user: User) {
    const accessToken = jwt.sign({
            "username": user.username,
            "role": user.role
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign({
            "username": user.username,
            "userId": user.id
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: user.role === "admin" ? "1d" : "30d" },
    );

    await db.insert(refreshTokens).values({refreshToken: refreshToken, userId: user.id})
    
    return {accessToken: accessToken, refreshToken: refreshToken}
}

export async function isValidRefreshToken(refreshToken: string | undefined) {
    if (!refreshToken) { return null; }

    // Find user with the same refresh token
    const results = await db.select()
        .from(refreshTokens)
        .where(eq(refreshTokens.refreshToken, refreshToken))
        .fullJoin(users, eq(users.id, refreshTokens.userId))
    
    console.log(results);
    
    if (results.length <= 0) { return null; }
    const result = results[0];

    if (!result?.users || !result?.refresh_tokens || result.refresh_tokens.used) {
        return null;
    }

    const user = result.users;
    try {
        // @ts-ignore
        const decoded: RefreshTokenSchema = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        if (decoded.userId !== user.id || decoded.username !== user.username) { return null; }

    } catch {
        return null;
    }

    return user;
}

export async function isValidAccessToken(accessToken: string | undefined) {
    if (!accessToken) { return null }

    let user: User | null = null;
    try {
        // @ts-ignore
        const decoded: AccessTokenSchema = jwt.verify(accessToken, REFRESH_TOKEN_SECRET);
        user = await getUser(decoded.username);
    } catch {
        return null;
    }

    return user;
}

export async function updateTokens(refreshToken: string) {    
    const { user } = (await db.select({user: users})
        .from(refreshTokens)
        .where(eq(refreshTokens.refreshToken, refreshToken))
        .innerJoin(users, eq(users.id, refreshTokens.userId)))[0]
    
    await db.update(refreshTokens)
        .set({used: true})
        .where(eq(refreshTokens.refreshToken, refreshToken));

    return await createTokens(user);
}