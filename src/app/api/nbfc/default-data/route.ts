import { query } from "@/db/query";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, removeWhiteSpace, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';
import { create_nbfc_table, nbfcData } from "../constant";

export async function POST(request: NextRequest) {
    try {

        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const { createdAt, updatedAt } = getDate()
            const { id } = res_data.data.user_data
            const bank_table_create = await query({
                query: create_nbfc_table
            })
            if (bank_table_create.status_code === 200) {

                const mainArr = []
                for (const nbfcItem of nbfcData) {
                    const { nbfc_name, email, website, customer_care_number, postal_address_nbfc } = nbfcItem

                    if (nbfc_name) {

                        const getBankCategory = await query({
                            query: `SELECT * FROM Nbfc WHERE name = ? `,
                            values: [removeWhiteSpace(nbfc_name)],
                        });

                        if (getBankCategory.status_code === 200) {
                            if (getBankCategory.data.length === 0) {
                                const insert_bank_data: any = await query({
                                    query: `INSERT INTO Nbfc (name, email, website, phone, address, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                    values: [
                                        removeWhiteSpace(nbfc_name),
                                        email ? removeWhiteSpace(email) : null,
                                        website ? removeWhiteSpace(website) : null,
                                        customer_care_number ? removeWhiteSpace(customer_care_number.toString()) : null,
                                        postal_address_nbfc ? removeWhiteSpace(postal_address_nbfc) : null,
                                        id,
                                        id,
                                        createdAt,
                                        updatedAt
                                    ]
                                });
                                if (insert_bank_data.status_code === 200) {
                                    const res_json = apiResponseSuccess({ status_code: 200, message: "Nbfc data inserted!", data: { nbfc_name } })
                                    mainArr.push(res_json)

                                } else {
                                    mainArr.push({ ...insert_bank_data, data: { nbfc_name } })
                                }
                            } else {
                                const nbfc_id = getBankCategory.data[0].id
                                const user_OrgData: any = await query({
                                    query: `UPDATE Nbfc SET email = ?, website = ?, phone = ?, address = ?, updatedAt = ?, updatedBy = ? WHERE id = ?`,
                                    values: [
                                        email ? removeWhiteSpace(email) : null,
                                        website ? removeWhiteSpace(website) : null,
                                        customer_care_number ? removeWhiteSpace(customer_care_number.toString()) : null,
                                        postal_address_nbfc ? removeWhiteSpace(postal_address_nbfc) : null,
                                        updatedAt,
                                        id,
                                        nbfc_id
                                    ]
                                });
                                if (user_OrgData.status_code === 200) {
                                    const res_json = apiResponseSuccess({ status_code: 200, message: "Nbfc data updated!", data: { nbfc_name } })
                                    mainArr.push(res_json)

                                } else {
                                    mainArr.push({ ...user_OrgData, data: { nbfc_name } })
                                }
                            }
                        } else {
                            mainArr.push({ ...getBankCategory, data: { nbfc_name } })
                        }
                    }
                }

                if (mainArr.length > 0) {
                    const status200 = mainArr.filter(io => io.status_code === 200).length
                    const statusOther = mainArr.filter(io => io.status_code !== 200).length
                    if (statusOther === 0) {
                        const res_json = apiResponseSuccess({ status_code: 200, message: "Nbfc default data saved!" })
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
                return NextResponse.json(bank_table_create, { status: bank_table_create.status_code })
            }
        } else {
            return NextResponse.json(res_data, { status: res_data.status_code })
        }

    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}
