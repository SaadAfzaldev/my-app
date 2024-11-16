import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User  from "../../../models/index";
import dbConnect from "../../../lib/dbConnect";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any, req) :Promise<any>{
                await dbConnect();
                try {
                    const user = await User.findOne({ 
                        
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier},
                        ]
                     });
                     if (!user) {
                        throw new Error("User not found with this email or username");
                    }

                    if (!user.isVerified) {
                        throw new Error("please verify your email");

                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);  

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid password");
                    }
                    else {
                        return user;
                    }

                }
                catch (error:any) {
                    throw new Error(error) 
                }
            }
           
        }),
       
    ],
    pages: {
        signIn: "sign-in",
        
    },
    session : {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt ({ token, user }) {
            
            if (user) {
                token.userId = user._id?.toString();
                token.username = user.username;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.isVerified = user.isVerified;
            }
            return token
        },
         async session ({session, token}) {
            
            if(token){
              session.user.id = token.id
              session.user.isAcceptingMessages = token.isAcceptingMessages
              session.user.username = token.username
              session.user.isVerified = token.isVerified
            }

            return session
            
         },
        
    }
}