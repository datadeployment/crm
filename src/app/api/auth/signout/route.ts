
import { apiResponseSuccess, catchBlockHandler } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
// import { signOut } from 'next-auth/react';

export async function GET(request: NextRequest, response: NextRequest) {
    try {
        // await signOut({ callbackUrl: '/' });
        // // response.end();
        const res_data = apiResponseSuccess({ status_code: 200, message: "Logout successful" })
        const res = NextResponse.json(res_data, { status: res_data.status_code })
        res.cookies.set("token", "",
            {
                httpOnly: true, expires: new Date(0)
            }
        );
        return res;
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}