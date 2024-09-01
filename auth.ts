import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    id: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log({ user, account })

            // Allow Oauth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id || "");

            // Prevent sign in if email is not verified
            if (!existingUser?.emailVerified) return false;

            // 2FA Here
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) return false;

                // Delete two factor confirmation after successful sign in
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },
        async session({ token, session }) {
            // console.log({sessionToken: token})
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
})