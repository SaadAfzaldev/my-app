import { resend } from "../lib/resend";
import  VerificationEmail  from "@/app/emails/VerificationEmail";

import {ApiResponse} from "@/app/src/types/ApiResponse";

export async function verificationEmailSender(email: string, otp: string,username:string) :Promise<ApiResponse> {

    try {
         await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Verification Email",
            react: VerificationEmail({username, otp}),
          });
        return {
            success : true,
            message : "Email Sent Successfully",
        }
    }
    catch (e) {
        console.log("Error Sending Email", e);
        return {
            success : false,
            message : "Error Sending Email",
        }
    }
}


