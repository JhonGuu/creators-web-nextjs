
import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod";
import { prisma } from "./prisma";
 
// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
          authorize: async (credentials) => {
            const {data, success} = loginSchema.safeParse(credentials);
            if(!success) {
              throw new Error("Invalid credentials");
            }

            const user = await prisma.user.findUnique({
              where: {
                email: data.email,
                
              }
            })  

            if(!user) {
              throw new Error("User not found");
            }
          
            return  { 
              user
            }
          },
        }),
      ],
} satisfies NextAuthConfig