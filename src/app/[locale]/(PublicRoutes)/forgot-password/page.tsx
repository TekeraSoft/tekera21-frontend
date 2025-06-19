import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </p>
          </div>
          <ForgotPasswordForm />
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
            </span>
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-gray-100 dark:bg-gray-800 lg:block lg:w-1/2">
        <div className="flex h-full items-center justify-center">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="Forgot Password"
            className="h-auto max-w-full rounded-lg object-cover"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
