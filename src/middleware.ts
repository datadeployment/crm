import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/signin" || path === "/signup" || path === "/forgot-password";
    const token = request.cookies.get("token")?.value || "";


    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/leads", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/signin", request.nextUrl));
    }
    if (path === "/" && token && !isPublicPath) {
        return NextResponse.redirect(new URL("/leads", request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/signin",
        "/signup",
        "/forgot-password",
        "/accounts/:path",
        "/leads/:path*"
    ],
};
