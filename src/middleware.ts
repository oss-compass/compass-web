// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log('process.env.API_URL:', process.env.API_URL);
  return NextResponse.rewrite(
    new URL(`${process.env.API_URL}/api/graphql`, request.url)
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/graphql',
};
