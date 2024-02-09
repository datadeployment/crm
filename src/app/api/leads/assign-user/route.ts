import { query } from "@/db/query";
import { apiResponseFailed, apiResponseSuccess, catchBlockHandler, getDataFromToken } from "@/utils/utils";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        let payload: any = await request.json()

        if (payload && Object.keys(payload).length > 0) {
            const res_data: any = await getDataFromToken(request);
            if (res_data.status_code === 200) {
                const { userId, leadId } = payload
                if (userId && leadId) {
                    const updateLeadtRes: any = await query({
                        query: `UPDATE Leads SET assignUser = ? WHERE id = ?`,
                        values: [
                            userId,
                            leadId
                        ]
                    });
                    if (updateLeadtRes.status_code === 200) {
                        const res_json = apiResponseSuccess({ status_code: 200, message: "User is assigned successfully!" })
                        return NextResponse.json(res_json, { status: res_json.status_code })
                    } else {
                        return NextResponse.json(updateLeadtRes, { status: updateLeadtRes.status_code })
                    }
                } else {
                    const res_json = apiResponseFailed({ status_code: 400, message: "Please send `userId` and `leadId` keys!" })
                    return NextResponse.json(res_json, { status: res_json.status_code })
                }
            } else {
                return NextResponse.json(res_data, { status: res_data.status_code })
            }
        } else {
            const res_json = apiResponseFailed({ status_code: 400, message: "Please send a valid JSON object" })
            return NextResponse.json(res_json, { status: res_json.status_code })
        }

    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return NextResponse.json(res_json, { status: res_json.status_code })
    }
}
