import UserModel from "@/src/models/index";
import dbConnect from "@/src/lib/dbConnect";
import { Message } from "../../../models/index"


export async function POST (request : Request) {

    await dbConnect()


    const {username, content} = await request.json()

    try {

        const user = await UserModel.findOne({username})
        if(!user) {
            return Response.json({
                success : false ,
                message : "User not found"
            },
            {
                status : 404
            })
        }
        
        if(!user.isAcceptingMessages) {
            return Response.json({
                success : false ,
                message : "User not accepting messages"
            },
            {
                status : 400
            })
        }

        const newMessage = {content, createdAt : new Date()}

        user.messages.push(newMessage as Message)

        await user.save()

        return Response.json({
            success : true ,
            message : "Message sent successfully"  

        },
        {
            status : 200
        })
    }

    catch(error : any ) {



        console.log(error)

        return Response.json({
            success : false , 
            message : "Error sending message"

        },{
            status : 200
        })
        
    }



}




