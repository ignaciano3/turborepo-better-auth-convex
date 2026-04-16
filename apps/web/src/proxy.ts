import { isAuthenticated } from '@repo/backend/lib/auth-server';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
    const hasToken = await isAuthenticated();
    
    if (!hasToken) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}
 
export const config = {
  matcher: '/dashboard',
}