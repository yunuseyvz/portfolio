import ProjectForm from '../../../../components/sections/admin/project-form';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create New Project</h1>
        <Link href="/admin/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
      
      <div className="rounded-md border p-6">
        <ProjectForm />
      </div>
    </div>
  );
}