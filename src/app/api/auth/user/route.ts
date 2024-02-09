import { query } from "@/db/query";
import { apiResponseFailed, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';

// export async function POST(request: NextRequest) {
//     try {
//         let payload: any = await request.json()

//         if (payload && Object.keys(payload).length > 0) {
//             const res_data: any = await getDataFromToken(request);
//             if (res_data.status_code === 200) {
//                 const { name } = payload
//                 const { createdAt, updatedAt } = getDate()
//                 const { id } = res_data.data.user_data

//                 if (bank_table_create.status_code === 200) {
//                     const insert_bank_data: any = await query({
//                         query: `INSERT INTO UserRole (name, createdAt, updatedAt) VALUES (?, ?, ?)`,
//                         values: [
//                             name,
//                             createdAt,
//                             updatedAt
//                         ]
//                     });

//                     if (insert_bank_data.status_code === 200) {
//                         delete insert_bank_data.data
//                         insert_bank_data.message = "User role saved successfully!"
//                         return NextResponse.json(insert_bank_data, { status: insert_bank_data.status_code })
//                     } else {
//                         return NextResponse.json(insert_bank_data, { status: insert_bank_data.status_code })
//                     }
//                 } else {
//                     return NextResponse.json(bank_table_create, { status: bank_table_create.status_code })
//                 }
//             } else {
//                 return NextResponse.json(res_data, { status: res_data.status_code })
//             }
//         } else {
//             const res_json = apiResponseFailed({ status_code: 500, message: "Please send a valid JSON object" })
//             return NextResponse.json(res_json, { status: res_json.status_code })
//         }

//     } catch (error: any) {
//         const res_json = catchBlockHandler(error)
//         return NextResponse.json(res_json, { status: res_json.status_code })
//     }
// }

export async function GET(request: NextRequest) {
    try {

        const res_data: any = await getDataFromToken(request);
        if (res_data.status_code === 200) {
            const rawParams = request.url.split('?')[1];
            const params: any = qs.parse(rawParams);
            const { user_role, currentPage, perPage, sort, keyName, filterKeyName, filterKeyValue, search } = params

            const { email } = res_data.data.user_data

            if (user_role) {
                const getUserRoleRes = await query({
                    query: `SELECT * FROM UserRole WHERE name = ? `,
                    values: [user_role],
                });
                if (getUserRoleRes.status_code === 200) {
                    const userRoleData = getUserRoleRes.data
                    if (userRoleData && Array.isArray(userRoleData) && userRoleData.length > 0) {
                        const roleId = userRoleData[0].id
                        const getUserDataRes = await query({
                            query: `SELECT
                            User.*,
                            id AS value,
                            name AS label
                            FROM User WHERE user_role = ? `,
                            values: [roleId],
                        });
                        if (getUserDataRes.status_code === 200) {
                            const userData = getUserDataRes.data
                            if (userData && Array.isArray(userData) && userData.length > 0) {
                                userData.map(userItem => {
                                    delete userItem.password
                                })
                            }
                        }
                        return NextResponse.json(getUserDataRes, { status: getUserDataRes.status_code })
                    } else {
                        const res_json = apiResponseFailed({ status_code: 500, message: "Data not exist!" })
                        return NextResponse.json(res_json, { status: res_json.status_code })
                    }
                } else {
                    return NextResponse.json(getUserRoleRes, { status: getUserRoleRes.status_code })
                }
            } else {
                const res_json = apiResponseFailed({ status_code: 500, message: "Please provide valid data!" })
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

// export async function DELETE(request: any) {
//     try {
//         let payload: any = await request.json()
//         const res_data: any = await getDataFromToken(request);
//         if (res_data.status_code === 200) {
//             const { id } = res_data.data.user_data
//             const { role_id } = payload

//             if (Array.isArray(role_id) === true) {
//                 const deleteUser: any = await query({
//                     query: `DELETE FROM UserRole WHERE id IN (${role_id.join(",")})`
//                 });

//                 if (deleteUser.status_code === 200) {
//                     delete deleteUser.data
//                     const res_data = {
//                         ...deleteUser,
//                         message: "User's role deleted successfully!"
//                     }
//                     return NextResponse.json(res_data, { status: res_data.status_code })
//                 } else {
//                     return NextResponse.json(deleteUser, { status: deleteUser.status_code })
//                 }
//             } else {
//                 const deleteUser: any = await query({
//                     query: `DELETE FROM UserRole WHERE id = ?`,
//                     values: [role_id],
//                 });
//                 if (deleteUser.status_code === 200) {
//                     delete deleteUser.data
//                     const res_data = {
//                         ...deleteUser,
//                         message: "User's role deleted successfully!"
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
//             const { role_id, name } = payload
//             const { createdAt, updatedAt } = getDate()
//             const { id } = res_data.data.user_data

//             const bankCategoryData: any = await query({
//                 query: `SELECT * FROM UserRole WHERE id = ? `,
//                 values: [role_id],
//             })

//             if (bankCategoryData.status_code === 200 && bankCategoryData.data.length > 0) {
//                 const getCategoryData = bankCategoryData.data[0]
//                 const wholeJson = { ...getCategoryData, name }

//                 delete wholeJson.id
//                 delete wholeJson.updatedAt

//                 const keysData = Object.keys(wholeJson)
//                 const valuesData = Object.values(wholeJson)
//                 const queryStr: any = []
//                 keysData.map(item => {
//                     queryStr.push(`${item} = ?`);
//                 })

//                 const user_OrgData: any = await query({
//                     query: `UPDATE UserRole SET ${queryStr.join(", ")}, updatedAt = ? WHERE id = ?`,
//                     values: [
//                         ...valuesData,
//                         updatedAt,
//                         role_id
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
//                 return NextResponse.json(bankCategoryData, { status: bankCategoryData.status_code })
//             }
//         } else {
//             return NextResponse.json(res_data, { status: res_data.status_code })
//         }
//     } catch (error: any) {
//         const res_json = catchBlockHandler(error)
//         return NextResponse.json(res_json, { status: res_json.status_code })
//     }
// }