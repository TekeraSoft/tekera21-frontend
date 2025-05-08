"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, MailCheck } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const token = searchParams.get("token")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // If there's a token in the URL, verify the email
    if (token) {
      const verifyEmail = async () => {
        setIsVerifying(true)
        try {
          // Simulate API call to verify email
          await new Promise((resolve) => setTimeout(resolve, 1500))
          setIsVerified(true)
        } catch (error) {
          console.error("Error verifying email:", error)
        } finally {
          setIsVerifying(false)
        }
      }

      verifyEmail()
    }
  }, [token])

  if (isVerifying) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6 px-4 py-12 text-center">
          <MailCheck className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold">Verifying your email</h1>
          <p className="text-gray-500 dark:text-gray-400">Please wait while we verify your email address...</p>
        </div>
      </div>
    )
  }

  if (isVerified) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-6 px-4 py-12 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="text-3xl font-bold">Email Verified!</h1>
          <p className="text-gray-500 dark:text-gray-400">Your email has been successfully verified.</p>
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950/50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your account is now active and you can log in.</AlertDescription>
          </Alert>
          <Button
            className="w-full"
            onClick={() => {
              router.push("/login")
            }}
          >
            Go to login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6 px-4 py-12 text-center">
        <MailCheck className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We&apos;ve sent a verification email to <strong>{email}</strong>. Please check your inbox and click the link
          to verify your email address.
        </p>
        <div className="space-y-4 pt-4">
          <p className="text-sm text-gray-500">
            Didn&apos;t receive the email? Check your spam folder or click below to resend.
          </p>
          <Button variant="outline" className="w-full" onClick={() => alert("Verification email resent!")}>
            Resend verification email
          </Button>
          <div className="pt-2 text-center text-sm">
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
