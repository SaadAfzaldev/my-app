import dbConnect from "@/app/src/lib/dbConnect";
import UserModel from "@/app/src/models";
import bcrypt from "bcryptjs";
import { verificationEmailSender } from "../../../app/src/helpers/verificationEmailSender";



export default async function POST(req:Request,) {
   
    await dbConnect();

    try {

        const { username, password, email } = await req.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({ 
            username: username,
            isVerified: true,
         });

         if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists",
                },
                {
                    status: 400,
                }
            );
         }

         const verifyCode = Math.floor(Math.random() * 100000).toString();

         const existingUserByEmail = await UserModel.findOne({email})

         if(existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                        success: false,
                        message: "User already exists with this email",
                    },
                    {
                        status: 400,
                    }
                );
                
            }
            
            else {

                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() +3600000);
                await  existingUserByEmail.save();
            }
            

         }

         const hashedPassword = await bcrypt.hash(password, 10);
         const expiryDate = new Date();
         expiryDate.setHours(expiryDate.getHours() + 1);

         const user = await UserModel.create({

            username,
            password: hashedPassword,
            email,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessages: true,
            messages: [],
        })

        const emailResponse = await verificationEmailSender(email, verifyCode, username);

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                    error: emailResponse.message,
                },
                {
                    status: 500,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User Registered Successfully Please Verify Your Email",
            
            },
            {
                status: 200,
            }
        );

    }
    catch (error) {
        
        console.error("Error registering user", error);

        return Response.json(
        {
            success: false,
            message: "Error registering user",
            error: error,
        },
        {
            status: 500,
        });
    }
}

