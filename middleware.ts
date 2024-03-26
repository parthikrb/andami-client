import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up'],
  afterAuth: async (auth, req) => {
    const { getToken } = auth;
    const token = await getToken();
    const response = NextResponse.next();

    const requestHeaders = new Headers(req.headers);
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
      response.cookies.set('token', token);
    } else {
      requestHeaders.delete('Authorization');
      response.cookies.delete('token');
    }
    return response;
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
