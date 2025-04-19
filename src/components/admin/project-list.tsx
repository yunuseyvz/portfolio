'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Project } from '@/lib/db';
import { useRouter } from 'next/navigation';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects: initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setIsDeleting(id);
      
      try {
        const res = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          setProjects(projects.filter(project => project.id !== id));
          router.refresh();
        } else {
          alert('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('An error occurred while deleting the project');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
              No projects found. Add your first project!
            </TableCell>
          </TableRow>
        ) : (
          projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell className="max-w-[300px] truncate">{project.description}</TableCell>
              <TableCell>{project.featured ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {(project.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {(project.tags || []).length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                  disabled={isDeleting === project.id}
                >
                  {isDeleting === project.id ? 'Deleting...' : 'Delete'}
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}