import { query } from "@/db/query";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';
import { bankdata, create_bank_category_table, create_bank_table } from "../../constant";

export async function POST(request: NextRequest) {
    try {

        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const { createdAt, updatedAt } = getDate()
            const { id } = res_data.data.user_data

            const bank_category_table_create = await query({
                query: create_bank_category_table
            })
            if (bank_category_table_create.status_code === 200) {

                const mainArr = []
                for (const bankItem of bankdata) {
                    const { category_name, bank_list } = bankItem

                    if (category_name) {

                        const getBankCategory = await query({
                            query: `SELECT * FROM BankCategory WHERE name = ? `,
                            values: [category_name],
                        });

                        if (getBankCategory.status_code === 200) {
                            if (getBankCategory.data.length === 0) {
                                const insert_bank_category_data: any = await query({
                                    query: `INSERT INTO BankCategory (name, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
                                    values: [
                                        category_name,
                                        id,
                                        id,
                                        createdAt,
                                        updatedAt
                                    ]
                                });
                                if (insert_bank_category_data.status_code === 200) {
                                    const res_json = apiResponseSuccess({ status_code: 200, message: "Category data inserted!", data: { ...bankItem } })
                                    mainArr.push(res_json)

                                } else {
                                    mainArr.push({ ...insert_bank_category_data, data: { ...bankItem } })
                                }
                            } else {
                                const res_json = apiResponseSuccess({ status_code: 200, message: "Category data already exist!", data: { ...bankItem } })
                                mainArr.push(res_json)
                            }
                        } else {
                            mainArr.push({ ...getBankCategory, data: { ...bankItem } })
                        }
                    }
                }

                if (mainArr.length > 0) {
                    const status200 = mainArr.filter(io => io.status_code === 200).length
                    const statusOther = mainArr.filter(io => io.status_code !== 200).length
                    if (statusOther === 0) {
                        const res_json = apiResponseSuccess({ status_code: 200, message: "Bank category default data saved!" })
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
            return NextResponse.json(res_data, { status: res_data.status_code })
        }

    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}
