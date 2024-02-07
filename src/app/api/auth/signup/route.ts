
import { query } from "@/db/query";
import sendMail from "@/services/email/EmailService";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, getEncryptUri, hashData } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const payload = await request.json()
        const { user_role, name, email, phone, password } = payload
        if (user_role && name && email && password) {

            const create_user_table = await query({
                query: `CREATE TABLE IF NOT EXISTS User (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name varchar(100) not null,
                email varchar(100) unique,
                is_email_verified bool default 0,
                phone varchar(20),
                password varchar(200),
                dob varchar(20),
                gender varchar(10),
                address text,
                created_at varchar(20),
                updated_at varchar(20),
                user_role INT NOT NULL,
                FOREIGN KEY (user_role) REFERENCES UserRole(id) ON DELETE CASCADE
            )`
            })

            const hashedPwd = await hashData(password)

            if (create_user_table.status_code === 200) {

                const get_user_role = await query({
                    query: `SELECT * FROM UserRole WHERE name = ?`,
                    values: [user_role]
                })
                if (get_user_role.status_code === 200) {
                    if (get_user_role.data && Array.isArray(get_user_role.data) && get_user_role.data.length > 0) {
                        const { id } = get_user_role.data[0]
                        const insert_user_data = await query({
                            query: `INSERT INTO User (name, email, password, is_email_verified, phone, user_role) values (?, ?, ?, ?, ?, ?)`,
                            values: [name, email, hashedPwd, false, phone ? phone : null, id]
                        })
                        if (insert_user_data.status_code === 200) {
                            // const id = insert_user_data.data.insertId
                            // const subject = "Please verify email"
                            // const data = JSON.stringify({
                            //     id
                            // })
                            // const host = `${process.env.FRONTEND_URL}/verify-email/`
                            // const uri = getEncryptUri(data)
                            // const generatedLink = `${host}${uri}`

                            // const html = `<p> Click this link to verify your email. <a href="${generatedLink}">Click Here!</a> If the link didn't work, please copy this link and paste it into the browser's address bar, then press Enter. ${generatedLink} </p>`


                            // const emailres: any = await sendMail({ email, subject, html })

                            // if (emailres.status_code === 200) {
                            //     const res_json = apiResponseSuccess({ status_code: 200, message: "You have successfully signed up! However, I will sent mail to your email. please verify your email!" })
                            // } else {
                            //     const msg = "You have successfully signed up! However, I will send an email to the provided email ID, but encountered some errors. Now, before logging in, you need to verify your email in the 'Verify Your Email' section."
                            //     const res_json = ApiResponseFailed({ status_code: 400, message: msg })
                            //     return NextResponse.json(res_json, { status: res_json.status_code })
                            // }

                            const res_json = apiResponseSuccess({ status_code: 200, message: "You have successfully signed up!" })
                            return NextResponse.json(res_json, { status: res_json.status_code })
                        } else {
                            return NextResponse.json(insert_user_data, { status: insert_user_data.status_code })
                        }
                    } else {
                        const res_json = apiResponseFailed({ status_code: 400, message: "Please add user role first!" })
                        return NextResponse.json(res_json, { status: res_json.status_code })
                    }
                } else {
                    return NextResponse.json(get_user_role, { status: get_user_role.status_code })
                }
            } else {
                return NextResponse.json(create_user_table, { status: create_user_table.status_code })
            }

        } else {
            const res_json = apiResponseFailed({ status_code: 400, message: "Please provide atleast 'first_name', 'email' and 'password'" })
            return NextResponse.json(res_json, { status: res_json.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}