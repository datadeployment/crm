import bcrypt from 'bcryptjs';

import { query } from "@/db/query";
// import sendMail from "@/services/email/EmailService";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, generateJwtToken, getEncryptUri, hashData } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const payload = await request.json()
        const { email, password, user_role } = payload
        if (email && password) {

            const getUserRoleData: any = await query({
                query: `SELECT * FROM UserRole WHERE name = ?`,
                values: [user_role]
            });

            if (getUserRoleData.status_code === 200) {
                const roleData = getUserRoleData.data
                if (roleData && Array.isArray(roleData) && roleData.length > 0) {
                    const roleId = roleData[0].id

                    // let queryStr = ""

                    // if (user_role === "client") {
                    //     queryStr = "SELECT * FROM Leads WHERE email = ?"
                    // } else {
                    // queryStr = "SELECT * FROM User WHERE email = ? AND user_role = ?"
                    // }
                    const user_data_res: any = await query({
                        query: `SELECT * FROM User WHERE email = ? AND user_role = ?`,
                        values: [email, roleId]
                    });

                    if (user_data_res.status_code === 200 && user_data_res.data.length > 0) {
                        const user_data = user_data_res.data[0]
                        if (password) {
                            const validPassword = await bcrypt.compare(password, user_data.password)
                            if (!validPassword) {
                                const res_json = apiResponseFailed({ status_code: 400, message: "Invallid credentials!" })
                                return NextResponse.json(res_json, { status: res_json.status_code })
                            } else {
                                delete user_data.password

                                const token = await generateJwtToken(user_data)
                                const res_json = apiResponseSuccess({ status_code: 200, message: "You have successfully signed in!!", data: user_data })

                                const response = NextResponse.json(res_json, { status: res_json.status_code });
                                const sevenDaysInSeconds = 7 * 24 * 60 * 60; // 7 days in seconds

                                response.cookies.set("token", token, {
                                    httpOnly: true,
                                    maxAge: sevenDaysInSeconds,
                                })
                                return response
                            }
                        } else {
                            const res_json = apiResponseFailed({ status_code: 400, message: "Send valid data!" })
                            return NextResponse.json(res_json, { status: res_json.status_code })
                        }
                    } else {
                        const res_json = apiResponseFailed({ status_code: 400, message: "Record not exist" })
                        return NextResponse.json(res_json, { status: res_json.status_code })
                    }

                } else {
                    const res_json = apiResponseFailed({ status_code: 400, message: "User role isn't exist!" })
                    return NextResponse.json(res_json, { status: res_json.status_code })
                }
            } else {
                return NextResponse.json(getUserRoleData, { status: getUserRoleData.status_code })
            }
        } else {
            const res_json = apiResponseFailed({ status_code: 400, message: "Send valid data!" })
            return NextResponse.json(res_json, { status: res_json.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}