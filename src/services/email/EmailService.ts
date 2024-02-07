
import { apiResponseSuccess, catchBlockHandler } from "@/utils/utils";
import nodemailer from "nodemailer";
const fromEmail = "no-reply@bcd.com"
const password = "dgyh gdnc bacg hkhc"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // `true` for port 465, `false` for all other ports
    auth: {
        user: fromEmail,
        pass: password,
    },
});

export default async function sendMail({ email, subject, text, html }: { email: string, subject: string, text?: string, html?: string }) {
    try {
        // send mail with defined transport object
        const info: any = await transporter.sendMail({
            from: fromEmail, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });
        const { messageId, messageSize, messageTime } = info
        const res_json = apiResponseSuccess({ status_code: 200, message: "Email sent!", data: { messageId, messageSize, messageTime } })
        return res_json
    } catch (error: any) {
        const res_json = catchBlockHandler(error)
        return res_json
    }
}