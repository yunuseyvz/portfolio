import { auth } from "@/auth";
import AdminDashboardClient from "@/components/sections/admin/dashboard-client";

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <AdminDashboardClient session={session} />
  );
}