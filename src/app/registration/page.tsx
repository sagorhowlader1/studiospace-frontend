"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
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

export function RegistrationPage() {
    const handleRegistration = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as { name: string, image: string, email: string, password: string }

        const { data, error } = await authClient.signUp.email({
            ...user,
        })

        console.log(user)
        if (data) {
            toast.add({
                type: 'success',
                title: 'Registration Successfully.'
            })
            redirect('/')
        }

        if (error) {
            toast.add({
                type: 'error',
                title: 'Something went wrong, Please try again!'
            })
        }
    }



    const handleGoogleRegistration = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });

        
    }

    return (
        <div className="grid min-h-svh place-items-center bg-background px-4 py-10">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create Account</CardTitle>

                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegistration}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="name">PhotoURL</FieldLabel>
                                <Input
                                    id="image"
                                    type="url"
                                    name="image"
                                    placeholder="Image"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>

                                <FieldLabel htmlFor="password">Password</FieldLabel>


                                <Input id="password" type="password" name="password" placeholder="password" required />
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    className="h-10 w-full bg-white cursor-pointer text-ink ring-1 ring-foreground/10 hover:bg-white/90 dark:bg-white dark:text-ink"
                                >
                                    Registration
                                </Button>


                                <div className="py-4">
                                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                        Or continue with
                                    </FieldSeparator>
                                </div>
                                <Field className="pb-6">
                                    <Button onClick={handleGoogleRegistration} className="h-10 w-full cursor-pointer bg-white text-ink hover:bg-white/90 dark:border-input dark:bg-input/30 dark:text-foreground">
                                        <GoogleIcon className="size-4" />
                                        Login with Google
                                    </Button>
                                </Field>


                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="login">Login</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegistrationPage
