import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/auth";
import BlurFade from "@/components/magicui/blur-fade";
import { Github } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  const error = searchParams.error;
  const errorMessage = error === "AccessDenied" 
    ? "You are not authorized to access this admin area. Only specific users can log in."
    : error 
    ? "An error occurred during sign in. Please try again." 
    : null;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <BlurFade className="mx-auto max-w-md space-y-6 p-4" delay={0.1}>
        <div className="space-y-2 text-center">
          <BlurFade delay={0.2}>
            <h1 className="text-3xl font-bold">Admin Login</h1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="text-gray-500 dark:text-gray-400">
              Login to access the admin area
            </p>
          </BlurFade>
        </div>
        
        {errorMessage && (
          <BlurFade delay={0.25}>
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {errorMessage}
            </div>
          </BlurFade>
        )}
        
        <BlurFade delay={0.4} className="space-y-4">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/admin" });
            }}
            className="space-y-4"
          >
            <Button type="submit" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </form>
        </BlurFade>
      </BlurFade>
    </div>
  );
}