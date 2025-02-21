import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import Configs from '@/configs/server';

export async function GET(): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany(); // Fetches all users from the database
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// Signup API Route::

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the request body
    const { username, email, password, firstName, lastName } =
      await request.json();

    // Input validation
    if (!username || !email || !password || !firstName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      Configs?.bcryptSaltRounds
    );
    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    // Respond with the created user (omit sensitive data like password)
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      const field = error.meta.target[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
