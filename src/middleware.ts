import {NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default }  from 'next-auth/middleware'


 
export async  function middleware(request: NextRequest) {


    const token = await getToken({ req: request })
    const url = request.nextUrl;

    if (
        
        token && url.pathname.startsWith("/sign-in") ||
        token && url.pathname.startsWith("/sign-up") ||
        token && url.pathname.startsWith("/verify") ||
        token && url.pathname.startsWith("/") 
        

    ) {

        return NextResponse.redirect(new URL('/dashboard', request.url))
          
    }


  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/sign-up',
    '/sign-in',
    '/',
    '/dashboard',
    '/verify/:path*',
  ],

}