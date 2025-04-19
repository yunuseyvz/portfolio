import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { DATA } from "@/data/resume";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.email !== DATA.contact.email) {
    redirect("/");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Logged in as {session.user.name}
            </p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="outline" size="sm" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="container px-4 py-6">
        <nav className="mb-6">
          <ul className="flex gap-4">
            <li>
              <a
                href="/admin"
                className="text-sm font-medium hover:text-primary"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/projects"
                className="text-sm font-medium hover:text-primary"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="/admin/settings"
                className="text-sm font-medium hover:text-primary"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}