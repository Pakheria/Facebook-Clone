// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // Use bcryptjs for compatibility
import jwt from 'jsonwebtoken';

const predefinedUser = {
  username: 'Admin',
  passwordHash: bcrypt.hashSync('123456', 10),
};

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === predefinedUser.username && bcrypt.compareSync(password, predefinedUser.passwordHash)) {
      return NextResponse.json({ token: 'someToken' }); // Ensure token or relevant data is sent
    } else {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
