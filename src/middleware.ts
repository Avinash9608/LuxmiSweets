
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/register');
  const isDashboardPage = pathname.startsWith('/admin/dashboard');

  // If trying to access a protected page without a token, redirect to login
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is logged in (has a token) and tries to access login/register, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/login', '/admin/register'],
};
