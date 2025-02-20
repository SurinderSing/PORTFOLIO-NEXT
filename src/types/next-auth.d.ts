import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    bio: string;
    lastLogin: string;
    rememberToken: string;
    deletedAt: string;
  }
  export interface Session {
    user: User & DefaultSession['user'];
  }
  export interface JWT extends User {}
}
