'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectLink } from '../../../lib/db';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { X, Plus, Globe, Github, Video, Award, PartyPopper, ExternalLink, GamepadIcon, Figma, Book, ImageDownIcon, Trash } from 'lucide-react';
import Image from 'next/image';

/**
 * Props for the ProjectForm component
 * @interface ProjectFormProps
 */
interface ProjectFormProps {
  /** Optional project data for editing an existing project */
  project?: Project;
}

/**
 * Available icon options for project links
 * Each option includes a value (stored in database), display label, and icon element
 */
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

/**
 * Icon selector component for choosing link icons
 * 
 * @param {Object} props - Component props
 * @param {string} props.selectedIcon - Currently selected icon value
 * @param {Function} props.onChange - Callback function when icon selection changes
 * @returns {JSX.Element} Grid of selectable icons
 */
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

/**
 * ProjectForm component
 * 
 * Form for creating new projects or editing existing ones in the admin interface.
 * Handles form submission, validation, and API requests to save project data.
 * 
 * Features:
 * - Creation and editing of project details
 * - Dynamic management of project links with icon selection
 * - Form validation and submission handling
 * - Responsive layout
 *
 * @param {ProjectFormProps} props - The component props
 * @returns {JSX.Element} The project form
 */
export default function ProjectForm({ project }: ProjectFormProps) {
  const isEditing = !!project;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState<{ main: boolean; light: boolean; showcase: boolean }>({ 
    main: false, 
    light: false, 
    showcase: false 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputLightRef = useRef<HTMLInputElement>(null);
  const showcaseInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    year: project?.year || new Date().getFullYear(),
    image: project?.image || '',
    image_light: project?.image_light || '',
    active: project?.active || false,
  });
  
  const [showcaseImages, setShowcaseImages] = useState<string[]>(project?.images || []);
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  const [links, setLinks] = useState<ProjectLink[]>(project?.links || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const yearValue = value ? parseInt(value, 10) : null;
    setFormData((prev) => ({ ...prev, year: yearValue as number }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    
    // Split on commas for multiple tags at once
    const newTags = tagInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !tags.includes(tag));
    
    if (newTags.length > 0) {
      setTags(prevTags => [...prevTags, ...newTags]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addLink = () => {
    setLinks([...links, { type: '', href: '', icon: 'globe' }]);
  };

  const removeLink = (indexToRemove: number) => {
    setLinks(links.filter((_, index) => index !== indexToRemove));
  };
  
  const removeShowcaseImage = (indexToRemove: number) => {
    setShowcaseImages(showcaseImages.filter((_, index) => index !== indexToRemove));
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
      const projectData = {
        ...formData,
        tags,
        images: showcaseImages,
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

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    
    const response = await fetch(
      `/api/upload?filename=${encodeURIComponent(fileName)}`,
      {
        method: 'POST',
        body: file,
      }
    );
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const newBlob = await response.json();
    return newBlob.url;
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
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              value={formData.year || ''}
              onChange={handleYearChange}
              placeholder={new Date().getFullYear().toString()}
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
            <Label htmlFor="image">Image</Label>
            <div className="space-y-2">
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/project-image.png or blob URL"
                className="mb-2"
              />
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    try {
                      setIsUploading(prev => ({ ...prev, main: true }));
                      
                      // Generate a unique file name with timestamp to avoid collisions
                      const timestamp = new Date().getTime();
                      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
                      
                      // Upload directly to API route
                      const response = await fetch(
                        `/api/upload?filename=${encodeURIComponent(fileName)}`,
                        {
                          method: 'POST',
                          body: file,
                        },
                      );
                      
                      if (!response.ok) {
                        throw new Error('Upload failed');
                      }
                      
                      const newBlob = await response.json();
                      setFormData(prev => ({ ...prev, image: newBlob.url }));
                    } catch (error) {
                      console.error('Error uploading file:', error);
                      alert('Failed to upload image. Please try again.');
                    } finally {
                      setIsUploading(prev => ({ ...prev, main: false }));
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading.main}
                  className="text-sm"
                >
                  {isUploading.main ? 'Uploading...' : 'Upload Image'}
                </Button>
                {formData.image && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {formData.image && (
                <div className="mt-2">
                  <Image
                    width={500}
                    height={300}
                    src={formData.image} 
                    alt="Project Preview" 
                    className="max-h-40 rounded-md object-cover border" 
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="image_light">Light Mode Image</Label>
            <div className="space-y-2">
              <Input
                id="image_light"
                name="image_light"
                value={formData.image_light}
                onChange={handleChange}
                placeholder="/project-image-light.png or blob URL"
                className="mb-2"
              />
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputLightRef}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    try {
                      setIsUploading(prev => ({ ...prev, light: true }));
                      
                      // Generate a unique file name with timestamp to avoid collisions
                      const timestamp = new Date().getTime();
                      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
                      
                      // Upload directly to API route
                      const response = await fetch(
                        `/api/upload?filename=${encodeURIComponent(fileName)}`,
                        {
                          method: 'POST',
                          body: file,
                        },
                      );
                      
                      if (!response.ok) {
                        throw new Error('Upload failed');
                      }
                      
                      const newBlob = await response.json();
                      setFormData(prev => ({ ...prev, image_light: newBlob.url }));
                    } catch (error) {
                      console.error('Error uploading file:', error);
                      alert('Failed to upload image. Please try again.');
                    } finally {
                      setIsUploading(prev => ({ ...prev, light: false }));
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => fileInputLightRef.current?.click()}
                  disabled={isUploading.light}
                  className="text-sm"
                >
                  {isUploading.light ? 'Uploading...' : 'Upload Image'}
                </Button>
                {formData.image_light && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormData(prev => ({ ...prev, image_light: '' }))}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {formData.image_light && (
                <div className="mt-2">
                  <Image
                    width={500}
                    height={300}
                    src={formData.image_light} 
                    alt="Project Preview (Light)" 
                    className="max-h-40 rounded-md object-cover border" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Showcase Images Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Showcase Images</Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={showcaseInputRef}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  try {
                    setIsUploading(prev => ({ ...prev, showcase: true }));
                    
                    const url = await uploadImage(file);
                    setShowcaseImages(prev => [...prev, url]);
                  } catch (error) {
                    console.error('Error uploading showcase image:', error);
                    alert('Failed to upload image. Please try again.');
                  } finally {
                    setIsUploading(prev => ({ ...prev, showcase: false }));
                  }
                }}
                accept="image/*"
                className="hidden"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={() => showcaseInputRef.current?.click()}
                disabled={isUploading.showcase}
                className="text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isUploading.showcase ? 'Uploading...' : 'Add Showcase Image'}
              </Button>
            </div>
          </div>
          
          {showcaseImages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No showcase images added yet. These will appear as a gallery on the project page.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
              {showcaseImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeShowcaseImage(index)}
                      className="h-8 w-8"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="rounded-md overflow-hidden border aspect-video relative">
                    <Image
                      fill
                      src={image}
                      alt={`Project showcase image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="tags">Tags/Technologies</Label>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              name="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="React, TypeScript, Next.js (comma separated)"
            />
            <Button type="button" size="sm" onClick={addTag}>
              Add Tag
            </Button>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Enter tags separated by commas
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="active" 
            checked={formData.active}
            onCheckedChange={(checked) => handleCheckboxChange('active', !!checked)} 
          />
          <Label htmlFor="active">Active/Ongoing Project</Label>
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