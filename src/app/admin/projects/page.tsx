import { getProjects } from "@/lib/db";
import AdminProjectsClient from "@/components/admin-section/projects-client";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return <AdminProjectsClient initialProjects={projects} />;
}