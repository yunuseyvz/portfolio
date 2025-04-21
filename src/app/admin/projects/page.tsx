import { getProjects } from "@/lib/db";
import AdminProjectsClient from "@/components/sections/admin/projects-client";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return <AdminProjectsClient initialProjects={projects} />;
}