import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isDevelopment = process.env.NODE_ENV === 'development';

export function middleware(request: NextRequest) {
  // for development
  if (isDevelopment) {
    return NextResponse.rewrite(new URL(`/api/development/proxy`, request.url));
  }

  // We use nginx proxy for production environments
  // this is for https://vercel.com preview environments (pull request preview)
  const { pathname, search } = request.nextUrl;
  return NextResponse.rewrite(new URL(pathname + search, process.env.API_URL));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/v2/:path*',
    '/api/graphql',
    '/api/beta/predict',
    '/api/v1/:path*',
    '/badge/:path*',
    '/files/:path*',
    '/users/:path*',
  ],
};
