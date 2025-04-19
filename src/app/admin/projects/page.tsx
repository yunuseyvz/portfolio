import { getProjects } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProjectList from "@/components/admin/project-list";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>New Project</Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}