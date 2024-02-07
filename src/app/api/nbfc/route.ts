import { query } from "@/db/query";
import { apiResponseFailed, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';
import { create_nbfc_table } from "./constant";

export async function POST(request: NextRequest) {
    try {
        let payload: any = await request.json()

        if (payload && Object.keys(payload).length > 0) {
            const res_data: any = await getDataFromToken(request);
            if (res_data.status_code === 200) {
                const { name, email, website, phone, address } = payload
                const { createdAt, updatedAt } = getDate()
                const { id } = res_data.data.user_data

                const bank_table_create = await query({
                    query: create_nbfc_table
                })

                if (bank_table_create.status_code === 200) {
                    const insert_bank_data: any = await query({
                        query: `INSERT INTO Nbfc (name, email, website, phone, address, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        values: [
                            name,
                            email ? email : null,
                            website ? website : null,
                            phone ? phone : null,
                            address ? address : null,
                            id,
                            id,
                            createdAt,
                            updatedAt
                        ]
                    });

                    if (insert_bank_data.status_code === 200) {
                        delete insert_bank_data.data
                        insert_bank_data.message = "NBFC data saved successfully!"
                        return NextResponse.json(insert_bank_data, { status: insert_bank_data.status_code })
                    } else {
                        return NextResponse.json(insert_bank_data, { status: insert_bank_data.status_code })
                    }
                } else {
                    return NextResponse.json(bank_table_create, { status: bank_table_create.status_code })
                }
            } else {
                return NextResponse.json(res_data, { status: res_data.status_code })
            }
        } else {
            const res_json = apiResponseFailed({ status_code: 500, message: "Please send a valid JSON object" })
            return NextResponse.json(res_json, { status: res_json.status_code })
        }

    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}

export async function GET(request: NextRequest) {
    try {

        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const rawParams = request.url.split('?')[1];
            const params: any = qs.parse(rawParams);
            const { id, currentPage, perPage, sort, keyName, filterKeyName, filterKeyValue, search } = params

            const { email } = res_data.data.user_data

            let get_user_res: any = null
            if (id) {
                get_user_res = await query({
                    query: `SELECT * FROM Nbfc WHERE id = ?`,
                    values: [id],
                });
            } else if (Number(currentPage) && Number(perPage)) {

                const { limit, offset } = getPaginationParams({ currentPage, perPage })

                let whereClauseQuery = ""
                if (filterKeyName === "createdAt" || filterKeyName === "updatedAt") {
                    whereClauseQuery = `WHERE DATE(FROM_UNIXTIME(${filterKeyName})) = ?`
                } else if (filterKeyName) {
                    whereClauseQuery = `WHERE ${filterKeyName} = ?`
                }

                let sortQuery = ""
                if (keyName && sort) {
                    sortQuery = `ORDER BY ${keyName} ${sort}`
                }

                let searchQuery = ""
                const searchVal: any = repeatString({ str: search, times: 1, prefix: "%", suffix: "%" })
                if (search) {
                    searchQuery = `${whereClauseQuery ? "OR" : "WHERE"} name LIKE ?`;
                }


                let newValueArr: any = []
                if (whereClauseQuery) {
                    newValueArr.push(filterKeyValue)
                }
                if (searchQuery) {
                    newValueArr.push(...searchVal)
                }
                newValueArr.push(limit)
                newValueArr.push(offset)


                const p1 = `SELECT 
                Nbfc.*,
                id as value,
                name AS label
                FROM Nbfc ${whereClauseQuery} ${searchQuery} ${sortQuery} LIMIT ? OFFSET ?`

                const p2 = p1.replaceAll("undefined", "")
                const queryStr = p2.replaceAll("  ", " ").replaceAll("  ", " ")

                get_user_res = await query({
                    query: queryStr,
                    values: newValueArr
                });

                const get_user_count: any = await query({
                    query: `SELECT COUNT(*) as count FROM Nbfc`,
                    values: [],
                });
                if (get_user_count.status_code === 200) {
                    get_user_res['totalCount'] = get_user_count.data[0].count
                } else {
                    return NextResponse.json(get_user_count, { status: get_user_count.status_code })
                }
            } else {
                const res_json = apiResponseFailed({ status_code: 200, message: "Something went wrong" })
                return NextResponse.json(res_json, { status: res_json.status_code })
            }
            if (get_user_res) {

                if (get_user_res.status_code === 200) {
                    get_user_res.message = "Data fetch successfully!"
                    return NextResponse.json(get_user_res, { status: get_user_res.status_code })
                } else {
                    return NextResponse.json(get_user_res, { status: get_user_res.status_code })
                }
            } else {
                const res_json = apiResponseFailed({ status_code: 500, message: "Data not exist!" })
                return NextResponse.json(res_json, { status: res_json.status_code })
            }
        } else {
            return NextResponse.json(res_data, { status: res_data.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}

export async function DELETE(request: any) {
    try {
        let payload: any = await request.json()
        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const { id } = res_data.data.user_data
            const { nbfc_id } = payload

            if (Array.isArray(nbfc_id) === true) {
                const deleteUser: any = await query({
                    query: `DELETE FROM Nbfc WHERE id IN (${nbfc_id.join(",")})`
                });

                if (deleteUser.status_code === 200) {
                    delete deleteUser.data
                    const res_data = {
                        ...deleteUser,
                        message: "Nbfc data deleted successfully!"
                    }
                    return NextResponse.json(res_data, { status: res_data.status_code })
                } else {
                    return NextResponse.json(deleteUser, { status: deleteUser.status_code })
                }
            } else {
                const deleteUser: any = await query({
                    query: `DELETE FROM Nbfc WHERE id = ?`,
                    values: [nbfc_id],
                });
                if (deleteUser.status_code === 200) {
                    delete deleteUser.data
                    const res_data = {
                        ...deleteUser,
                        message: "Nbfc data deleted successfully!"
                    }
                    return NextResponse.json(res_data, { status: res_data.status_code })
                } else {
                    return NextResponse.json(deleteUser, { status: deleteUser.status_code })
                }
            }

        } else {
            return NextResponse.json(res_data, { status: res_data.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}

export async function PUT(request: NextRequest) {
    try {
        let payload: any = await request.json()
        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const { nbfc_id, name, email, website, phone, address } = payload
            const { createdAt, updatedAt } = getDate()
            const { id } = res_data.data.user_data

            const bankCategoryData: any = await query({
                query: `SELECT * FROM Nbfc WHERE id = ? `,
                values: [nbfc_id],
            })

            if (bankCategoryData.status_code === 200 && bankCategoryData.data.length > 0) {
                const getCategoryData = bankCategoryData.data[0]
                const wholeJson = {
                    ...getCategoryData,
                    name: name ? name : getCategoryData.name,
                    email: email ? email : getCategoryData.email,
                    website: website ? website : getCategoryData.website,
                    phone: phone ? phone : getCategoryData.phone,
                    address: address ? address : getCategoryData.address
                }

                delete wholeJson.id
                delete wholeJson.updatedAt
                delete wholeJson.updatedBy

                const keysData = Object.keys(wholeJson)
                const valuesData = Object.values(wholeJson)
                const queryStr: any = []
                keysData.map(item => {
                    queryStr.push(`${item} = ?`);
                })

                const user_OrgData: any = await query({
                    query: `UPDATE Nbfc SET ${queryStr.join(", ")}, updatedAt = ?, updatedBy = ? WHERE id = ?`,
                    values: [
                        ...valuesData,
                        updatedAt,
                        id,
                        nbfc_id
                    ]
                });

                if (user_OrgData.status_code === 200) {
                    delete user_OrgData.data
                    user_OrgData.message = "Data updated successfully!"
                    return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
                } else {
                    return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
                }
            } else {
                return NextResponse.json(bankCategoryData, { status: bankCategoryData.status_code })
            }
        } else {
            return NextResponse.json(res_data, { status: res_data.status_code })
        }
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}