import { signIn } from "@/auth";
import { loginSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginActions = async (values: z.infer<typeof loginSchema>) => {
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
        return {succes: true}
    } catch (error) {
        if(error instanceof AuthError) { 
            return {error: error.cause?.err?.message}
        }
        return {error: "Error 505"};
    }
}