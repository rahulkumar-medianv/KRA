import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const raw = req.cookies.get('auth')?.value;
  let user = null;
  if (raw) {
    try {
      user = JSON.parse(decodeURIComponent(raw));
    } catch (e) {
      user = null;
    }
  }

  // redirect authenticated users away from auth pages
  if (pathname.startsWith('/auth')) {
    if (user) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // protect dashboard and other private routes
  const protectedPaths = ['/dashboard', '/profile', '/cart'];
  if (protectedPaths.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/signIn';
      return NextResponse.redirect(url);
    }
    // additional role check for admin chat
    if (pathname.startsWith('/dashboard/admin-chat') && user.role !== 'admin') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', '/profile', '/cart'],
};
