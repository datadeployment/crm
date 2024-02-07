import { query } from "@/db/query";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';
import { bankdata, create_bank_category_table, create_bank_table } from "../constant";

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
                const bank_table_create = await query({
                    query: create_bank_table
                })

                if (bank_table_create.status_code === 200) {
                    const mainArr = []
                    for (const bankItem of bankdata) {
                        const { category_name, bank_list } = bankItem
                        for (const bankobj of bank_list) {
                            const { bank_name, contact_us_link } = bankobj
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
                                            const category_id = insert_bank_category_data.data.insertId
                                            const insert_bank_data: any = await query({
                                                query: `INSERT INTO Bank (bank_category_id, name, contact_us_link, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                                values: [
                                                    category_id,
                                                    bank_name,
                                                    contact_us_link ? contact_us_link : null,
                                                    id,
                                                    id,
                                                    createdAt,
                                                    updatedAt
                                                ]
                                            });
                                            if (insert_bank_data.status_code === 200) {
                                                const res_json = apiResponseSuccess({ status_code: 200, message: "Bank data inserted!", data: { ...bankobj } })
                                                mainArr.push(res_json)
                                            } else {
                                                mainArr.push({ ...insert_bank_data, data: { ...bankobj } })
                                            }
                                        } else {
                                            mainArr.push({ ...insert_bank_category_data, data: { ...bankItem } })
                                        }
                                    } else {
                                        const category_id = getBankCategory.data[0].id
                                        const getBank = await query({
                                            query: `SELECT * FROM Bank WHERE bank_category_id = ? AND name = ?`,
                                            values: [category_id, bank_name],
                                        });
                                        if (getBank.status_code === 200) {
                                            if (getBank.data.length > 0) {
                                                const bank_id = getBank.data[0].id
                                                const update_bank_data: any = await query({
                                                    query: `UPDATE Bank SET contact_us_link = ?, updatedBy = ?, updatedAt = ? WHERE ID = ?`,
                                                    values: [
                                                        contact_us_link ? contact_us_link : null,
                                                        id,
                                                        updatedAt,
                                                        bank_id
                                                    ]
                                                });
                                                if (update_bank_data.status_code === 200) {
                                                    const res_json = apiResponseSuccess({ status_code: 200, message: "Bank data updated!", data: { ...bankobj } })
                                                    mainArr.push(res_json)
                                                } else {
                                                    mainArr.push({ ...update_bank_data, data: { ...bankobj } })
                                                }
                                            } else {
                                                const insert_bank_data: any = await query({
                                                    query: `INSERT INTO Bank (bank_category_id, name, contact_us_link, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                                    values: [
                                                        category_id,
                                                        bank_name,
                                                        contact_us_link ? contact_us_link : null,
                                                        id,
                                                        id,
                                                        createdAt,
                                                        updatedAt
                                                    ]
                                                });
                                                if (insert_bank_data.status_code === 200) {
                                                    const res_json = apiResponseSuccess({ status_code: 200, message: "Bank data inserted!", data: { ...bankobj } })
                                                    mainArr.push(res_json)
                                                } else {
                                                    mainArr.push({ ...insert_bank_data, data: { ...bankobj } })
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    mainArr.push({ ...getBankCategory, data: { ...bankItem } })
                                }
                            } else {
                                const insert_bank_data: any = await query({
                                    query: `INSERT INTO Bank (bank_category_id, name, contact_us_link, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                                    values: [
                                        null,
                                        bank_name,
                                        contact_us_link ? contact_us_link : null,
                                        id,
                                        id,
                                        createdAt,
                                        updatedAt
                                    ]
                                });
                                if (insert_bank_data.status_code === 200) {
                                    const res_json = apiResponseSuccess({ status_code: 200, message: "Bank data inserted!", data: { ...bankobj } })
                                    mainArr.push(res_json)
                                } else {
                                    mainArr.push({ ...insert_bank_data, data: { ...bankobj } })
                                }
                            }
                        }
                    }

                    if (mainArr.length > 0) {
                        const status200 = mainArr.filter(io => io.status_code === 200).length
                        const statusOther = mainArr.filter(io => io.status_code !== 200).length
                        if (statusOther === 0) {
                            const res_json = apiResponseSuccess({ status_code: 200, message: "Bank default data saved!" })
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

// export async function GET(request: NextRequest) {
//     try {

//         const res_data: any = await getDataFromToken(request);
//         if (res_data.status_code === 200) {
//             const rawParams = request.url.split('?')[1];
//             const params: any = qs.parse(rawParams);
//             const { id, currentPage, perPage, sort, keyName, filterKeyName, filterKeyValue, search } = params

//             const { email } = res_data.data.user_data

//             let get_user_res: any = null
//             if (id) {
//                 get_user_res = await query({
//                     query: `SELECT * FROM Bank WHERE id = ? `,
//                     values: [id],
//                 });
//             } else if (Number(currentPage) && Number(perPage)) {

//                 const { limit, offset } = getPaginationParams({ currentPage, perPage })

//                 let whereClauseQuery = ""
//                 if (filterKeyName === "createdAt" || filterKeyName === "updatedAt") {
//                     whereClauseQuery = `WHERE DATE(FROM_UNIXTIME(${filterKeyName})) = ?`
//                 } else if (filterKeyName) {
//                     whereClauseQuery = `WHERE ${filterKeyName} = ?`
//                 }

//                 let sortQuery = ""
//                 if (keyName && sort) {
//                     sortQuery = `ORDER BY ${keyName} ${sort}`
//                 }

//                 let searchQuery = ""
//                 const searchVal: any = repeatString({ str: search, times: 1, prefix: "%", suffix: "%" })
//                 if (search) {
//                     searchQuery = `${whereClauseQuery ? "OR" : "WHERE"} name LIKE ?`;
//                 }


//                 let newValueArr: any = []
//                 if (whereClauseQuery) {
//                     newValueArr.push(filterKeyValue)
//                 }
//                 if (searchQuery) {
//                     newValueArr.push(...searchVal)
//                 }
//                 newValueArr.push(limit)
//                 newValueArr.push(offset)


//                 const p1 = `SELECT 
//                 Bank.*,
//                 id as value,
//                 name AS label
//                 FROM Bank ${whereClauseQuery} ${searchQuery} ${sortQuery} LIMIT ? OFFSET ?`

//                 const p2 = p1.replaceAll("undefined", "")
//                 const queryStr = p2.replaceAll("  ", " ").replaceAll("  ", " ")

//                 get_user_res = await query({
//                     query: queryStr,
//                     values: newValueArr
//                 });

//                 const get_user_count: any = await query({
//                     query: `SELECT COUNT(*) as count FROM Bank`,
//                     values: [],
//                 });
//                 if (get_user_count.status_code === 200) {
//                     get_user_res['totalCount'] = get_user_count.data[0].count
//                 } else {
//                     return NextResponse.json(get_user_count, { status: get_user_count.status_code })
//                 }
//             } else {
//                 const res_json = apiResponseFailed({ status_code: 200, message: "Something went wrong" })
//                 return NextResponse.json(res_json, { status: res_json.status_code })
//             }
//             if (get_user_res) {

//                 if (get_user_res.status_code === 200) {
//                     get_user_res.message = "Data fetch successfully!"
//                     return NextResponse.json(get_user_res, { status: get_user_res.status_code })
//                 } else {
//                     return NextResponse.json(get_user_res, { status: get_user_res.status_code })
//                 }
//             } else {
//                 const res_json = apiResponseFailed({ status_code: 500, message: "Data not exist!" })
//                 return NextResponse.json(res_json, { status: res_json.status_code })
//             }
//         } else {
//             return NextResponse.json(res_data, { status: res_data.status_code })
//         }
//     } catch (error: any) {
//         const res_json = catchBlockHandler(error)
//         return NextResponse.json(res_json, { status: res_json.status_code })
//     }
// }

// export async function DELETE(request: any) {
//     try {
//         let payload: any = await request.json()
//         const res_data: any = await getDataFromToken(request);
//         if (res_data.status_code === 200) {
//             const { id } = res_data.data.user_data
//             const { bank_id } = payload

//             if (Array.isArray(bank_id) === true) {
//                 const deleteUser: any = await query({
//                     query: `DELETE FROM Bank WHERE id IN (${bank_id.join(",")})`
//                 });

//                 if (deleteUser.status_code === 200) {
//                     delete deleteUser.data
//                     const res_data = {
//                         ...deleteUser,
//                         message: "Bank deleted successfully!"
//                     }
//                     return NextResponse.json(res_data, { status: res_data.status_code })
//                 } else {
//                     return NextResponse.json(deleteUser, { status: deleteUser.status_code })
//                 }
//             } else {
//                 const deleteUser: any = await query({
//                     query: `DELETE FROM Bank WHERE id = ?`,
//                     values: [bank_id],
//                 });
//                 if (deleteUser.status_code === 200) {
//                     delete deleteUser.data
//                     const res_data = {
//                         ...deleteUser,
//                         message: "Bank deleted successfully!"
//                     }
//                     return NextResponse.json(res_data, { status: res_data.status_code })
//                 } else {
//                     return NextResponse.json(deleteUser, { status: deleteUser.status_code })
//                 }
//             }

//         } else {
//             return NextResponse.json(res_data, { status: res_data.status_code })
//         }
//     } catch (error: any) {
//         const res_json = catchBlockHandler(error)
//         return NextResponse.json(res_json, { status: res_json.status_code })
//     }
// }

// export async function PUT(request: NextRequest) {
//     try {
//         let payload: any = await request.json()
//         const res_data: any = await getDataFromToken(request);
//         if (res_data.status_code === 200) {
//             const { bank_id, bank_category_id, name } = payload
//             const { createdAt, updatedAt } = getDate()
//             const { id } = res_data.data.user_data

//             const BankData: any = await query({
//                 query: `SELECT * FROM Bank WHERE id = ? `,
//                 values: [bank_id],
//             })

//             if (BankData.status_code === 200 && BankData.data.length > 0) {
//                 const getCategoryData = BankData.data[0]
//                 const wholeJson = bank_category_id ? { ...getCategoryData, name, bank_category_id } : { ...getCategoryData, name }

//                 delete wholeJson.id
//                 delete wholeJson.updatedAt
//                 delete wholeJson.updatedBy

//                 const keysData = Object.keys(wholeJson)
//                 const valuesData = Object.values(wholeJson)
//                 const queryStr: any = []
//                 keysData.map(item => {
//                     queryStr.push(`${item} = ?`);
//                 })

//                 const user_OrgData: any = await query({
//                     query: `UPDATE Bank SET ${queryStr.join(", ")}, updatedAt = ?, updatedBy = ? WHERE id = ?`,
//                     values: [
//                         ...valuesData,
//                         updatedAt,
//                         id,
//                         bank_id
//                     ]
//                 });

//                 if (user_OrgData.status_code === 200) {
//                     delete user_OrgData.data
//                     user_OrgData.message = "Data updated successfully!"
//                     return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
//                 } else {
//                     return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
//                 }
//             } else {
//                 return NextResponse.json(BankData, { status: BankData.status_code })
//             }
//         } else {
//             return NextResponse.json(res_data, { status: res_data.status_code })
//         }
//     } catch (error: any) {
//         const res_json = catchBlockHandler(error)
//         return NextResponse.json(res_json, { status: res_json.status_code })
//     }
// }