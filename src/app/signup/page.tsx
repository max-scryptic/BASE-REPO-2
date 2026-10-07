import { LoginForm } from "@/components/login-form";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata(routes.signup);

export default function SignupPage() {
  return (
    <main className="flex min-h-svh bg-muted px-4 py-6 sm:px-6 sm:py-8 md:p-10">
      <div className="mx-auto my-auto w-full max-w-md">
        <LoginForm mode="signup" />
      </div>
    </main>
  );
}
