"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { redirect } from "next/navigation"



function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="currentColor"
      />
    </svg>
  )
}

export function LoginPage() {
    const handleLogin = async (e:React.SubmitEvent<HTMLElement>) =>{
        e.preventDefault()

        const formData = new FormData(e.target)
        
        const user = Object.fromEntries(formData.entries()) as {email: string, password: string}

        const {data, error} = await authClient.signIn.email({
            ...user,
        })

        if(data){
            toast.add({
                type: 'success',
                title: 'Login Successfully.'
            })
            redirect('/')
        }

        console.log(user)
        if(error){
            toast.add({
                type: 'error',
                title: 'Login failed. Please try again!'
            })

        }
    }

  return (
    <div className="grid min-h-svh place-items-center bg-background px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
             
              <Field>
                <Button variant="outline" type="submit" className="h-10 w-full cursor-pointer bg-white text-ink hover:bg-white/90 dark:border-input dark:bg-input/30 dark:text-foreground">
                  <GoogleIcon className="size-4" />
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" placeholder="password" required />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="h-10 w-full bg-white cursor-pointer text-ink ring-1 ring-foreground/10 hover:bg-white/90 dark:bg-white dark:text-ink"
                >
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="registration">Registration</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;
