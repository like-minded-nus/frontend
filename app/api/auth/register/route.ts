import { NextResponse } from 'next/server';

const REGISTER_API_URL = 'http://localhost:8080/api/v1/user/register';

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
