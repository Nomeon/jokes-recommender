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
import { login } from "@/app/login/actions";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
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
  confirmPassword: z.string().min(8).max(50),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'De wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
})

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registreren</CardTitle>
        <CardDescription>
          Creëer een account met e-mail of met een van de socials
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
                <FormLabel>Wachtwoord</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Wachtwoord" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Bevestig wachtwoord</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Bevestig wachtwoord" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid gap-4">
              <Button type="submit" className="w-full">
                Registreer
              </Button>
              <div className="flex justify-between items-center">
                <p>Registreer met: </p>
                <div className="flex gap-4">
                  <Button variant="outline">
                    <FaGoogle />
                  </Button>
                  <Button variant="outline">
                    <FaLinkedin />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Heb je al een account?{" "}
              <Link href="/login" className="underline">
                Inloggen
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
