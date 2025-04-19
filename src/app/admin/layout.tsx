import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DATA } from "@/data/resume";
import AdminLayoutClient from "@/components/admin/layout-client";

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
    <AdminLayoutClient session={session}>
      {children}
    </AdminLayoutClient>
  );
}