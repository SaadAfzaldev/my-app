import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../models/index";
import {z} from "zod";
import { userNameValidation } from "@/src/schemas/signUpSchema";


const usernameCheckSchema = z.object({
    username: userNameValidation,
})

export async function GET(req:Request,) {

   
    await dbConnect();
    

    try{


        const {searchParams} =  new URL(req.url);
        const queryParams = {
            username : searchParams.get('username')
        }

        const result = usernameCheckSchema.safeParse(queryParams);

        if(!result.success) {

            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success : false,
                message : "Invalid Query Params",
                
            },{
                status : 400
            })


        }

        const username = result.data.username;
        
        const verifiedUserExists = await UserModel.findOne({
            username,
            isVerified : true,
        })

        if(verifiedUserExists) {
            return Response.json({
                success : false,
                message : "Username is already taken",
                username : username
            },
            {
                status : 400
            })

        }

        return Response.json({
            success : true,
            message : "Username is available",
            username : username
        },{

            status : 200
        })


    }
    catch(error) {
        console.log("error checking user", error);
        Response.json({
            success : false,
            message : "Error checking username"
        })
    }
}
