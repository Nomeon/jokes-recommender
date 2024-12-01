'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login, loginWithGoogle, loginWithLinkedin } from "@/app/login/actions";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const formSchema = z.object({
  email: z.string().email({
    message: 'Dit is geen geldig e-mailadres',
  }),
  password: z.string().min(8, {
    message: 'Het wachtwoord moet minimaal 8 karakters lang zijn',
  }).max(50, {
    message: 'Het wachtwoord mag maximaal 50 karakters lang zijn',
  }),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex items-center">
                  <FormLabel>Wachtwoord</FormLabel>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Wachtwoord vergeten?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" placeholder="Wachtwoord" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid gap-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="flex justify-between items-center">
                <p>Login met: </p>
                <div className="flex gap-4">
                  <Button onClick={loginWithGoogle} variant="outline">
                    <FaGoogle />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Heb je nog geen account?{" "}
              <Link href="/registreren" className="underline">
                Registreren
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
