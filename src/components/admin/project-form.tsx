'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectLink } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus, Globe, Github, Video, Award, PartyPopper, ExternalLink, GamepadIcon, Figma, Book } from 'lucide-react';

interface ProjectFormProps {
  project?: Project;
}

const ICON_OPTIONS = [
  { value: 'globe', label: 'Globe', icon: <Globe className="h-5 w-5" /> },
  { value: 'github', label: 'GitHub', icon: <Github className="h-5 w-5" /> },
  { value: 'video', label: 'Video', icon: <Video className="h-5 w-5" /> },
  { value: 'award', label: 'Award', icon: <Award className="h-5 w-5" /> },
  { value: 'partyPopper', label: 'Party', icon: <PartyPopper className="h-5 w-5" /> },
  { value: 'externalLink', label: 'Link', icon: <ExternalLink className="h-5 w-5" /> },
  { value: 'gamepad', label: 'Gamepad', icon: <GamepadIcon className="h-5 w-5" /> },
  { value: 'figma', label: 'Figma', icon: <Figma className="h-5 w-5" /> },
  { value: 'book', label: 'Book', icon: <Book className="h-5 w-5" /> },
];

function IconSelector({ selectedIcon, onChange }: { selectedIcon: string, onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ICON_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`h-10 w-10 rounded-md flex items-center justify-center transition-colors border ${
            selectedIcon === option.value 
              ? 'bg-primary/20 border-primary/50' 
              : 'hover:bg-accent border-muted-foreground/20'
          }`}
          onClick={() => onChange(option.value)}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
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

  const [links, setLinks] = useState<ProjectLink[]>(project?.links || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const addLink = () => {
    setLinks([...links, { type: '', href: '', icon: 'globe' }]);
  };

  const removeLink = (indexToRemove: number) => {
    setLinks(links.filter((_, index) => index !== indexToRemove));
  };

  const updateLink = (index: number, field: keyof ProjectLink, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);
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
        links: links.filter(link => link.type && link.href),
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
              id="active" 
              checked={formData.active}
              onCheckedChange={(checked) => handleCheckboxChange('active', !!checked)} 
            />
            <Label htmlFor="active">Active/Ongoing Project</Label>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Links</Label>
            <Button 
              type="button" 
              size="sm"
              variant="outline"
              onClick={addLink}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Link
            </Button>
          </div>

          {links.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No additional links added yet. Click Add Link to create one.
            </p>
          )}

          {links.map((link, index) => (
            <div key={index} className="flex flex-col border rounded-md bg-background overflow-hidden">
              {/* Link header with remove button */}
              <div className="flex justify-between items-center px-3 py-2 bg-muted/40">
                <h4 className="text-sm font-medium">Link #{index + 1}</h4>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeLink(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Link content with consistent padding */}
              <div className="p-3 space-y-3">
                <div>
                  <Label htmlFor={`link-type-${index}`} className="block mb-2">Type/Label</Label>
                  <Input
                    id={`link-type-${index}`}
                    value={link.type}
                    onChange={(e) => updateLink(index, 'type', e.target.value)}
                    placeholder="View, Documentation, Demo..."
                    className="h-10"
                  />
                </div>

                <div>
                  <Label htmlFor={`link-href-${index}`} className="block mb-2">URL</Label>
                  <Input
                    id={`link-href-${index}`}
                    value={link.href}
                    onChange={(e) => updateLink(index, 'href', e.target.value)}
                    placeholder="https://..."
                    className="h-10"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`link-icon-${index}`} className="block mb-2">Icon</Label>
                  <IconSelector 
                    selectedIcon={link.icon || 'globe'} 
                    onChange={(value) => updateLink(index, 'icon', value)} 
                  />
                </div>
              </div>
            </div>
          ))}
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