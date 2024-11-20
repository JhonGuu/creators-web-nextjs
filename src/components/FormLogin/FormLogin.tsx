"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import {loginSchema} from "@/lib/zod"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginActions } from "@/actions/auth-actions"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
const FormLogin = () => {

	const [error,setError] = useState<string | null>(null);
	const [isPending,startTransition] = useTransition();
	const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email:"",
          password:""
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
		setError(null);
		startTransition(async () => {
			const response = await loginActions(values); 
			if(response.error) {
				setError(response.error);
			}else { 
				router.push("/admin");
			}
		
		})
    }

    
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="E	mail" {...field} type="email" />
								</FormControl>
								<FormDescription>
									This is your public display email.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Password" {...field} type="password" />
								</FormControl>
								<FormDescription>
									This is your public display email.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{
						error && <FormMessage>{error}</FormMessage>
					}
					<Button type="submit" disabled={isPending}>Submit</Button>
				</form>
			</Form>
		)
}
export default FormLogin