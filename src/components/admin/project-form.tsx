'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectLink } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus, Globe, Github, Video, Award, PartyPopper, ExternalLink } from 'lucide-react';

interface ProjectFormProps {
  project?: Project;
}

const ICON_OPTIONS = [
  { value: 'globe', label: 'Globe', icon: <Globe className="h-4 w-4" /> },
  { value: 'github', label: 'GitHub', icon: <Github className="h-4 w-4" /> },
  { value: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
  { value: 'award', label: 'Award', icon: <Award className="h-4 w-4" /> },
  { value: 'partyPopper', label: 'Party Popper', icon: <PartyPopper className="h-4 w-4" /> },
  { value: 'externalLink', label: 'External Link', icon: <ExternalLink className="h-4 w-4" /> },
];

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

  const getIconByName = (iconName: string) => {
    return ICON_OPTIONS.find(option => option.value === iconName)?.icon || ICON_OPTIONS[0].icon;
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
            <Label htmlFor="link">Primary Project URL</Label>
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

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Additional Links</Label>
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
            <div key={index} className="flex items-center gap-3 p-3 border rounded-md bg-background">
              <div className="flex-grow grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor={`link-type-${index}`}>Type/Label</Label>
                  <Input
                    id={`link-type-${index}`}
                    value={link.type}
                    onChange={(e) => updateLink(index, 'type', e.target.value)}
                    placeholder="View, Documentation, Demo..."
                  />
                </div>

                <div>
                  <Label htmlFor={`link-icon-${index}`}>Icon</Label>
                  <select
                    id={`link-icon-${index}`}
                    value={link.icon || 'globe'}
                    onChange={(e) => updateLink(index, 'icon', e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {ICON_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor={`link-href-${index}`}>URL</Label>
                  <Input
                    id={`link-href-${index}`}
                    value={link.href}
                    onChange={(e) => updateLink(index, 'href', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <Button 
                type="button"
                variant="ghost" 
                size="sm"
                className="self-end"
                onClick={() => removeLink(index)}
              >
                <X className="h-4 w-4" />
              </Button>
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