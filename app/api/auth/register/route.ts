import { NextResponse } from 'next/server';

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? '';
const REGISTER_API_URL = `${endpoint}/user/register`;

export async function POST(request: Request) {
  try {
    const { username, email, password, confirmPassword } = await request.json();
    console.log({ username, email, password, confirmPassword });

    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (e) {
    console.log({ e });
  }
}
