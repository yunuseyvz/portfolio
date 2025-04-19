'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const isEditing = !!project;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    dates: project?.dates || new Date().getFullYear().toString(),
    link: project?.link || '',
    github: project?.github || '',
    image: project?.image || '',
    imageLight: project?.imageLight || '',
    tags: project?.tags?.join(', ') || '',
    featured: project?.featured || false,
    active: project?.active || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      const projectData = {
        ...formData,
        tags,
      };

      const url = isEditing 
        ? `/api/projects/${project.id}` 
        : '/api/projects';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        router.push('/admin/projects');
        router.refresh();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="dates">Date/Year</Label>
            <Input
              id="dates"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="h-24"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="link">Project URL</Label>
            <Input
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              type="url"
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              type="url"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/project-image.png"
            />
          </div>

          <div>
            <Label htmlFor="imageLight">Light Mode Image URL (optional)</Label>
            <Input
              id="imageLight"
              name="imageLight"
              value={formData.imageLight}
              onChange={handleChange}
              placeholder="/project-image-light.png"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags/Technologies</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, TypeScript, Next.js (comma separated)"
          />
          <p className="mt-1.5 text-sm text-muted-foreground">
            Enter tags separated by commas
          </p>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="featured" 
              checked={formData.featured}
              onCheckedChange={(checked) => handleCheckboxChange('featured', !!checked)} 
            />
            <Label htmlFor="featured">Featured Project</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="active" 
              checked={formData.active}
              onCheckedChange={(checked) => handleCheckboxChange('active', !!checked)} 
            />
            <Label htmlFor="active">Active/Ongoing Project</Label>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push('/admin/projects')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}