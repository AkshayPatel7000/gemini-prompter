import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';
import type { Account } from 'next-auth';

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

// Build Google OAuth URL with offline access and consent prompt
const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  }).toString();

// Helper function to refresh expired Google access tokens
async function refreshGoogleAccessToken(token: {
  refreshToken?: string;
  accessToken?: string;
  accessTokenExpires?: number;
  [key: string]: unknown;
}) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken as string,
    });

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + (data.expires_in ?? 3600) * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken, // Google may return new refresh token
      error: undefined,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: GOOGLE_AUTHORIZATION_URL, // Force offline access + consent
    }),
  ],
  session: { strategy: 'jwt' as const }, // Required for storing tokens in JWT
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      user?: User;
    }) {
      // Initial sign-in: save Google tokens to JWT
      if (account && user) {
        token.userId = user.id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // Available on first consent
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;
        return token;
      }

      // If access token is still valid, return existing token
      if (
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number)
      ) {
        return token;
      }

      // Token expired: refresh it
      if (token.refreshToken) {
        return await refreshGoogleAccessToken(token);
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Expose user ID and Google tokens to session
      if (session?.user) {
        session.user.id = token.userId as string;
        (session as unknown as Record<string, unknown>).googleAccessToken =
          token.accessToken;
        (session as unknown as Record<string, unknown>).googleRefreshToken =
          token.refreshToken;
        (
          session as unknown as Record<string, unknown>
        ).googleAccessTokenExpires = token.accessTokenExpires;
        (session as unknown as Record<string, unknown>).error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
