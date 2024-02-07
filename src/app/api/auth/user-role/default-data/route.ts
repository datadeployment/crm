import { query } from "@/db/query";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';
import { create_user_role_table_query, userRoles } from "../constant";

export async function POST(request: NextRequest) {
    try {
        const { createdAt, updatedAt } = getDate()
        const res_db_create = await query({
            database_name: "",
            query: `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`
        })

        if (res_db_create.status_code === 200) {
            const bank_category_table_create = await query({
                query: create_user_role_table_query
            })
            if (bank_category_table_create.status_code === 200) {
                const mainArr = []
                for (const roleItem of userRoles) {
                    const { name } = roleItem
                    if (name) {
                        const getBankCategory = await query({
                            query: `SELECT * FROM UserRole WHERE name = ? `,
                            values: [name],
                        });

                        if (getBankCategory.status_code === 200) {
                            if (getBankCategory.data.length === 0) {
                                const insert_bank_category_data: any = await query({
                                    query: `INSERT INTO UserRole (name, createdAt, updatedAt) VALUES (?, ?, ?)`,
                                    values: [
                                        name,
                                        createdAt,
                                        updatedAt
                                    ]
                                });
                                if (insert_bank_category_data.status_code === 200) {
                                    const res_json = apiResponseSuccess({ status_code: 200, message: "Role data inserted!", data: { name } })
                                    mainArr.push(res_json)

                                } else {
                                    mainArr.push({ ...insert_bank_category_data, data: { name } })
                                }
                            } else {
                                const res_json = apiResponseSuccess({ status_code: 200, message: "Role data already exist!", data: { name } })
                                mainArr.push(res_json)
                            }
                        } else {
                            mainArr.push({ ...getBankCategory, data: { name } })
                        }
                    }
                }

                if (mainArr.length > 0) {
                    const status200 = mainArr.filter(io => io.status_code === 200).length
                    const statusOther = mainArr.filter(io => io.status_code !== 200).length
                    if (statusOther === 0) {
                        const res_json = apiResponseSuccess({ status_code: 200, message: "Role's default data saved!" })
                        return NextResponse.json(res_json, { status: res_json.status_code })
                    } else {
                        const res_json = apiResponseSuccess({ status_code: 207, message: `Please review response json! We saved ${status200} records but ${statusOther} records didn't save.`, data: mainArr })
                        return NextResponse.json(res_json, { status: res_json.status_code })
                    }
                } else {
                    const res_json = apiResponseFailed({ status_code: 400, message: "Something went wrong", data: mainArr })
                    return NextResponse.json(res_json, { status: res_json.status_code })
                }
            } else {
                return NextResponse.json(bank_category_table_create, { status: bank_category_table_create.status_code })
            }
        } else {
            return NextResponse.json(res_db_create, { status: res_db_create.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}
