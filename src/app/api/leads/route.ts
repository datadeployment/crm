import { query } from "@/db/query";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, getDataFromToken, getDate, getPaginationParams, hashData, repeatString } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";
import qs from 'qs';
import { create_lead_accounts_table, create_leads_table } from "./constant";

export async function POST(request: NextRequest) {
    try {
        let payload: any = await request.json()

        if (payload && Object.keys(payload).length > 0) {
            const res_data: any = await getDataFromToken(request);
            if (res_data.status_code === 200) {
                const { name, email, phone, dob, gender, creditScore, rationCard, address, pan, passport, telephone, voterId, aadhaarNumber, drivingLicense, accountData, status } = payload
                if (name && email) {

                    const hashedPwd = await hashData(email)
                    const { createdAt, updatedAt } = getDate()
                    const { id } = res_data.data.user_data

                    const lead_table_create = await query({
                        query: create_leads_table
                    })

                    if (lead_table_create.status_code === 200) {
                        const insert_lead_data: any = await query({
                            query: `INSERT INTO Leads ( name, email, phone, dob, gender, creditScore, rationCard, address, pan, passport, telephone, voterId, aadhaarNumber, drivingLicense, password, status, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                            values: [
                                name,
                                email,
                                phone,
                                dob,
                                gender,
                                creditScore,
                                rationCard,
                                address,
                                pan,
                                passport,
                                telephone,
                                voterId,
                                aadhaarNumber,
                                drivingLicense,
                                hashedPwd,
                                status ? status : null,
                                id,
                                id,
                                createdAt,
                                updatedAt
                            ]
                        });

                        if (insert_lead_data.status_code === 200) {
                            if (accountData && Array.isArray(accountData) && accountData.length > 0) {
                                const leadId = insert_lead_data.data.insertId
                                const mainArr = []
                                for (const accountItem of accountData) {
                                    const { bankId, accountType, ownership, dateReported, accountStatus, dateOpened, sanctionAmount, currentBalance, amountOverdue } = accountItem

                                    const lead_account_table_create = await query({
                                        query: create_lead_accounts_table
                                    })

                                    if (lead_account_table_create.status_code === 200) {
                                        const insert_lead_account_data: any = await query({
                                            query: `INSERT INTO LeadAccounts (leadId, bankId, accountType, ownership, dateReported, accountStatus, dateOpened, sanctionAmount, currentBalance, amountOverdue, createdBy, updatedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                            values: [
                                                leadId,
                                                bankId,
                                                accountType,
                                                ownership,
                                                dateReported,
                                                accountStatus,
                                                dateOpened,
                                                sanctionAmount,
                                                currentBalance,
                                                amountOverdue,
                                                id,
                                                id,
                                                createdAt,
                                                updatedAt
                                            ]
                                        });
                                        if (insert_lead_account_data.status_code === 200) {
                                            const apires = apiResponseSuccess({ status_code: 200, message: "Lead account data saved successfully!", data: accountItem })
                                            mainArr.push(apires)
                                        } else {
                                            mainArr.push({ ...insert_lead_account_data, data: accountItem })
                                        }
                                    }
                                }

                                if (mainArr.length > 0) {
                                    const status200 = mainArr.filter(io => io.status_code === 200).length
                                    const statusOther = mainArr.filter(io => io.status_code !== 200).length
                                    if (statusOther === 0) {
                                        const res_json = apiResponseSuccess({ status_code: 200, message: "Lead's data saved successfully!" })
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
                                delete insert_lead_data.data
                                insert_lead_data.message = "Lead data saved successfully!"
                                return NextResponse.json(insert_lead_data, { status: insert_lead_data.status_code })
                            }
                        } else {
                            return NextResponse.json(insert_lead_data, { status: insert_lead_data.status_code })
                        }
                    } else {
                        return NextResponse.json(lead_table_create, { status: lead_table_create.status_code })
                    }
                } else {
                    const res_json = apiResponseFailed({ status_code: 500, message: "Please send `name` and `email` keys!" })
                    return NextResponse.json(res_json, { status: res_json.status_code })
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
                    query: `SELECT * FROM Leads WHERE id = ?`,
                    values: [id],
                });
                if (get_user_res.status_code === 200) {
                    if (get_user_res.data.length > 0) {
                        const leadAccountRes = await query({
                            query: `SELECT * FROM LeadAccounts WHERE leadId = ?`,
                            values: [id],
                        });
                        if (leadAccountRes.status_code === 200) {
                            if (leadAccountRes.data.length > 0) {
                                get_user_res.data[0]['accountData'] = leadAccountRes.data
                            }
                        }
                    }
                }
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
                Leads.*,
                id as value,
                name AS label
                FROM Leads ${whereClauseQuery} ${searchQuery} ${sortQuery} LIMIT ? OFFSET ?`

                const p2 = p1.replaceAll("undefined", "")
                const queryStr = p2.replaceAll("  ", " ").replaceAll("  ", " ")

                get_user_res = await query({
                    query: queryStr,
                    values: newValueArr
                });

                const get_user_count: any = await query({
                    query: `SELECT COUNT(*) as count FROM Leads`,
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
            // const { id } = res_data.data.user_data
            const { id } = payload

            if (Array.isArray(id) === true) {
                const deleteUser: any = await query({
                    query: `DELETE FROM Leads WHERE id IN (${id.join(",")})`
                });

                if (deleteUser.status_code === 200) {
                    delete deleteUser.data
                    const res_data = {
                        ...deleteUser,
                        message: "Leads data deleted successfully!"
                    }
                    return NextResponse.json(res_data, { status: res_data.status_code })
                } else {
                    return NextResponse.json(deleteUser, { status: deleteUser.status_code })
                }
            } else {
                const deleteUser: any = await query({
                    query: `DELETE FROM Leads WHERE id = ?`,
                    values: [id],
                });
                if (deleteUser.status_code === 200) {
                    delete deleteUser.data
                    const res_data = {
                        ...deleteUser,
                        message: "Leads data deleted successfully!"
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

//     export async function PUT(request: NextRequest) {
//         try {
//             let payload: any = await request.json()
//             const res_data: any = await getDataFromToken(request);
//             if (res_data.status_code === 200) {
//                 const { nbfc_id, name, email, website, phone, address } = payload
//                 const { createdAt, updatedAt } = getDate()
//                 const { id } = res_data.data.user_data

//                 const bankCategoryData: any = await query({
//                     query: `SELECT * FROM Nbfc WHERE id = ? `,
//                     values: [nbfc_id],
//                 })

//                 if (bankCategoryData.status_code === 200 && bankCategoryData.data.length > 0) {
//                     const getCategoryData = bankCategoryData.data[0]
//                     const wholeJson = {
//                         ...getCategoryData,
//                         name: name ? name : getCategoryData.name,
//                         email: email ? email : getCategoryData.email,
//                         website: website ? website : getCategoryData.website,
//                         phone: phone ? phone : getCategoryData.phone,
//                         address: address ? address : getCategoryData.address
//                     }

//                     delete wholeJson.id
//                     delete wholeJson.updatedAt
//                     delete wholeJson.updatedBy

//                     const keysData = Object.keys(wholeJson)
//                     const valuesData = Object.values(wholeJson)
//                     const queryStr: any = []
//                     keysData.map(item => {
//                         queryStr.push(`${item} = ?`);
//                     })

//                     const user_OrgData: any = await query({
//                         query: `UPDATE Nbfc SET ${queryStr.join(", ")}, updatedAt = ?, updatedBy = ? WHERE id = ?`,
//                         values: [
//                             ...valuesData,
//                             updatedAt,
//                             id,
//                             nbfc_id
//                         ]
//                     });

//                     if (user_OrgData.status_code === 200) {
//                         delete user_OrgData.data
//                         user_OrgData.message = "Data updated successfully!"
//                         return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
//                     } else {
//                         return NextResponse.json(user_OrgData, { status: user_OrgData.status_code })
//                     }
//                 } else {
//                     return NextResponse.json(bankCategoryData, { status: bankCategoryData.status_code })
//                 }
//             } else {
//                 return NextResponse.json(res_data, { status: res_data.status_code })
//             }
//         } catch (error: any) {
//             const res_json = catchBlockHandler(error)
//             return NextResponse.json(res_json, { status: res_json.status_code })
//         }
//     }

