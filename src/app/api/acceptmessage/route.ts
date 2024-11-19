import { getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models";
import { User } from "next-auth"



export async function POST(request: Request) {

  await dbConnect()

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User

  if(!session || !session.user) {

      return Response.json({
      
        success : false ,
        message : "Not Authenticated"

      },

      {
        status : 401
      })
    }

      const userId = user._id

      const {acceptingMessages } = await request.json()

    try {
          
        const updatedUser = await UserModel.findByIdAndUpdate(userId,

          {isAcceptingMessages : acceptingMessages},
          {new : true}

        )
        
        if(!updatedUser) {
        
            return Response.json({
            
              success : false ,
              message : "Failed to update user status to update Messages"
            
            },
            
            {
            
              status : 500
            })
          

        }

        return Response.json({
        
          success : true ,
          message : "Messages acceptance status updated successfully"
        
        },
        
        {
        
          status : 200
        })

      }
      catch (error) {

        console.log("Failed to update user status to update Messages")

        return Response.json({
          success : false ,
          message : "Failed to update user status to update Messages"
        },{

          status : 500
        })

      }

}



export async function GET(request: Request) {
  
  await dbConnect()

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User
  
  if(!session || session.user) {
    
    return Response.json({
    
      success : false ,
      message : "Not Authenticated"
    
    },
    
    {
      status : 401
    })
  }

  const userId = user._id
    
  try {
    const user = await UserModel.findById(userId)

    if(!user) {
      
      return Response.json({
        success : false ,
        message : "User not found"
      },
      {
        status : 404
      })
    }

    return Response.json({
      success : true ,
      message : "User found" ,
      isAcceptingMessages : user.isAcceptingMessages
    },
    {
      status : 200
    })

  }
  catch (error) {
    
    console.log("Failed to get user status to update Messages")
    
    return Response.json({
      success : false ,
      message : "Failed to get user status to update Messages"
    },{
      
      status : 500
    })
    
  }
}






