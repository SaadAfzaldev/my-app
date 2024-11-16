import { z } from 'zod';

export const userNameValidation = z.string()
    .min(3,"Username must be at least 3 characters long")
    .max(20,"Username must be less than 20 characters long")
    .regex(/^[a-zA-Z0-9]+$/,"Username can only contain letters and numbers")  
    

export const SignUpSchema = z.object({
    username: userNameValidation,
    password: z.string().min(6,"Password must be at least 6 characters long").max(20,"Password must be less than 20 characters long"),
    email: z.string().email("Please enter a valid email")
    
})