import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import Configs from '@/configs/server';
import checkRequired from '@/utils/sever/check-required';
import crypto from 'crypto';
import { sendEmail } from '@/utils/sever/node-mailer';

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

    // Check if user exists but is not verified
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && !existingUser.isVerified) {
      // Generate a new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Update the user with new verification token
      await prisma.user.update({
        where: { email },
        data: { verificationToken },
      });

      // Resend verification email
      const verificationLink = `${Configs.baseUrl}/api/user/validate?token=${verificationToken}`;
      try {
        await sendEmail(email, 'Verify Your Email', verificationLink);
        return NextResponse.json(
          { message: 'Verification email resent. Please check your email.' },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
          {
            error: 'Failed to send verification email',
            details: error,
          },
          { status: 500 }
        );
      }
    }

    const requiredFields = checkRequired(
      ['firstName', 'username', 'email', 'password'],
      {
        firstName,
        username,
        email,
        password,
      }
    );

    if (requiredFields) {
      return NextResponse.json(requiredFields, { status: 400 });
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

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create the user
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        isVerified: false,
        verificationToken,
      },
    });

    // Send a verification email
    const verificationLink = `${Configs.baseUrl}/api/user/validate?token=${verificationToken}`;
    try {
      await sendEmail(email, 'Verify Your Email', verificationLink);
    } catch (error) {
      // if the email is not sent, delete the user
      await prisma.user.delete({
        where: { email },
      });
      return NextResponse.json(
        {
          error: 'Failed to send verification email',
          details: error,
        },
        { status: 500 }
      );
    }

    // Respond with the created user (omit sensitive data like password)
    return NextResponse.json(
      { message: 'User created. Check your email for verification.' },
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
