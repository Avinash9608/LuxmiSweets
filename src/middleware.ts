
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // If trying to access admin dashboard without a token, redirect to login
  if (pathname.startsWith('/admin/dashboard') && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is logged in (has a token) and tries to access login/register, redirect to dashboard
  if ((pathname.startsWith('/admin/login') || pathname.startsWith('/admin/register')) && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/login', '/admin/register'],
};
