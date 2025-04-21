import ProjectForm from '@/components/sections/admin/project-form';
import { getProject } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  // Get the project ID from the URL parameter
  const id = parseInt(params.id, 10);
  
  if (isNaN(id)) {
    notFound();
  }
  
  // Fetch the project data
  const project = await getProject(id);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}