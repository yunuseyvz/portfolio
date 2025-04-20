import ProjectForm from '@/components/admin-section/project-form';
import { getProject } from '@/lib/db';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage(props: EditProjectPageProps) {
  const params = await props.params;
  const { id } = params;
  const project = await getProject(id);

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Project: {project.title}</h1>
        <Link href="/admin/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
      
      <div className="rounded-md border p-6">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}