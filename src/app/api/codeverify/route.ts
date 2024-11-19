import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../models/index";


export async function POST(req:Request,) {

    await dbConnect();
    try {
        const { code, username } = await req.json();

       const decodedUsername = decodeURIComponent(username);

       const user = await UserModel.findOne({ username: decodedUsername})

       if (!user) {
           return Response.json(
               {
                   success: false,
                   message: "Invalid code",
               },
               {
                   status: 400,
               }
           );
       }

       const isCodeValid = user.verifyCode === code;

       if (!isCodeValid) {
           return Response.json(
               {
                   success: false,
                   message: "Invalid code",
               },
               {
                   status: 400,
               }
           );
       }

       const isCodeExpired = user.verifyCodeExpiry > new Date();

       if (isCodeExpired) {
           return Response.json(
               {
                   success: false,
                   message: "Code expired",
               },
               {
                   status: 400,
               }
           );
       }

       user.isVerified = true;
       await user.save();

       return Response.json(
           {
               success: true,
               message: "Code verified successfully",
           },
           {
               status: 200,
           }
       );

    }
    catch (error) {
        
        console.error("Error verifying code", error);
        return Response.json(
            {
                success: false,
                message: "Error verifying code",
                error: error,
            },
            {
                status: 500,
            }
        );
    }
}