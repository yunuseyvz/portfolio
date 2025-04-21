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
import { Edit2, Trash2, Eye } from 'lucide-react';
import BlurFade from '@/components/ui/blur-fade';
import { Badge } from '@/components/ui/badge';

/**
 * Props for the ProjectList component
 * @interface ProjectListProps
 */
interface ProjectListProps {
  /** Array of projects to display in the admin list */
  projects: Project[];
}

/** Animation delay for staggered fade-in effect */
const BLUR_FADE_DELAY = 0.03;

/**
 * ProjectList component
 * 
 * Admin component that displays a list of projects with edit and delete actions.
 * Handles client-side deletion with confirmation and optimistic UI updates.
 * 
 * @param {ProjectListProps} props - The component props
 * @returns {JSX.Element} The rendered admin project list
 */
export default function ProjectList({ projects: initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const router = useRouter();

  /**
   * Handles project deletion with confirmation
   * 
   * @param {number} id - The ID of the project to delete
   */
  const handleDelete = async (id: number) => {
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
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Project</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <div className="flex flex-col items-center gap-2">
                    <p>No projects found</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/projects/new">Add your first project</Link>
                    </Button>
                  </div>
                </BlurFade>
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-semibold">{project.title}</span>
                      {project.description && (
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {project.description}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        asChild
                      >
                        <Link href={`/admin/projects/${project.id}`}>
                          <span className="sr-only">Edit</span>
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                        disabled={isDeleting === project.id}
                        className={isDeleting === project.id ? 'animate-pulse' : ''}
                      >
                        <span className="sr-only">Delete</span>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}