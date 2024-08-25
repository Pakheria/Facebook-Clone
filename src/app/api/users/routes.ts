import { NextResponse } from 'next/server';
import { get_unique_users } from '@/lib/db'; // Import your function here

export async function GET() {
  try {
    const users = get_unique_users();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}
