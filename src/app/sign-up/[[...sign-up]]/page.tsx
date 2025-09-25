import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to start managing your invoices efficiently
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "bg-white shadow-none",
              },
            }}
            routing="path"
            path="/sign-up"
          />
        </div>
      </div>
    </div>
  );
}