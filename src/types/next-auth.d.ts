import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id: string;
        isAcceptingMessages?: boolean;
        username?: string;
        isVerified?: boolean;
    
    }
    interface Session {
        user: {
            id?: string;
            isAcceptingMessages?: boolean;
            username?: string;
            isVerified?: boolean;

        }& DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        isAcceptingMessages?: boolean;
        username?: string;
        isVerified?: boolean;
    }
}