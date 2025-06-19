import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account <br />
              <br />
              <span className="font-bold text-gray-600">Super Admin</span>: ken
              <br />
              <span className="font-bold text-gray-600">Seller</span>: jane
              <br />
              <span className="font-bold text-gray-600">Standard User</span>:
              john
              <br />
              <br />
              <span className="font-bold text-gray-600">password</span>: enter
              anything
            </p>
          </div>
          <LoginForm locale={locale} />
          <div className="mt-4 text-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              href="/signup"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-gray-100 dark:bg-gray-800 lg:block lg:w-1/2">
        <div className="flex h-full items-center justify-center">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="Login"
            className="h-auto max-w-full rounded-lg object-cover"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
