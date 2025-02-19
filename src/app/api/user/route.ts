import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // Fetches all users from the database
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  const newUser = await prisma.user.create({
    data: { username, email, password },
  });
  return NextResponse.json(newUser, { status: 201 });
}
