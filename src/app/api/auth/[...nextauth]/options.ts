import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { username: credentials.username },
                { email: credentials.username },
              ],
            },
          });

          if (!user || !user?.password) {
            throw new Error('Invalid credentials');
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (passwordsMatch) return user;
          return null;
        } catch (error: any) {
          throw new Error(error as string);
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.status = user.status;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profilePicture = user.profilePicture;
        token.bio = user.bio;
        token.lastLogin = user.lastLogin;
        token.rememberToken = user.rememberToken;
        token.deletedAt = user.deletedAt;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.profilePicture = token.profilePicture;
        session.user.bio = token.bio;
        session.user.lastLogin = token.lastLogin;
        session.user.rememberToken = token.rememberToken;
        session.user.deletedAt = token.deletedAt;
      }
      return session;
    },
  },
};
