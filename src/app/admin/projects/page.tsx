import { getProjects } from "@/lib/db";
import AdminProjectsClient from "@/components/admin/projects-client";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return <AdminProjectsClient initialProjects={projects} />;
}