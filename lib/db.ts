/**
 * Database module for portfolio project
 * 
 * Provides interfaces and functions for Supabase database interactions
 * related to project management in the portfolio website.
 */

import { supabaseAdmin } from './supabase/client';
import { generateSlug } from './utils';

/**
 * Represents a link associated with a project
 * @interface ProjectLink
 */
export interface ProjectLink {
  /** Display text/label for the link */
  type: string;
  /** URL that the link points to */
  href: string;
  /** Optional icon identifier to display with the link */
  icon?: string;
}

/**
 * Represents a portfolio project
 * Structure mirrors the PostgreSQL database schema
 * @interface Project
 */
export interface Project {
  /** Unique identifier for the project */
  id: number;
  /** Project title */
  title: string;
  /** Detailed project description */
  description: string;
  /** URL-friendly slug derived from title */
  slug: string;
  /** Year the project was completed or worked on */
  year?: number;
  /** Array of technologies or skills used in the project */
  tags: string[];
  /** Path to the project image for dark mode */
  image?: string;
  /** Path to the project image for light mode */
  image_light?: string;
  /** Array of additional project showcase images */
  images?: string[];
  /** HTML content for the project page */
  content?: string;
  /** Array of related links (source, demo, etc.) */
  links?: ProjectLink[];
  /** Whether the project is currently active/ongoing */
  active?: boolean;
  /** Timestamp when the project was created in the database */
  created_at?: Date;
  /** Timestamp when the project was last updated in the database */
  updated_at?: Date;
}

/**
 * Retrieves all projects from the database
 * 
 * @returns {Promise<Project[]>} Array of projects sorted by year in descending order
 */
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return data || [];
}

/**
 * Retrieves a single project by its ID
 * 
 * @param {number} id - The unique identifier of the project
 * @returns {Promise<Project | null>} The project or null if not found
 */
export async function getProject(id: number): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows found
      return null;
    }
    throw new Error(`Failed to fetch project: ${error.message}`);
  }

  return data;
}

/**
 * Retrieves a single project by its slug
 * 
 * @param {string} slug - The URL-friendly slug of the project
 * @returns {Promise<Project | null>} The project or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows found
      return null;
    }
    throw new Error(`Failed to fetch project by slug: ${error.message}`);
  }

  return data;
}

/**
 * Creates a new project in the database
 * 
 * @param {Omit<Project, 'id' | 'created_at' | 'updated_at' | 'slug'>} project - The project data to insert
 * @returns {Promise<Project>} The newly created project with generated ID and timestamps
 */
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'slug'>): Promise<Project> {
  const { title, description, year, image, image_light, images, tags, links, active, content } = project;
  
  // Generate a slug from the title
  const slug = generateSlug(title);
  
  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert({
      title,
      description,
      year,
      image,
      image_light,
      images: images || [],
      tags,
      links,
      active: active ?? false,
      slug,
      content: content || null
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  return data;
}

/**
 * Updates an existing project in the database
 * Only updates fields that are provided in the projectData parameter
 * 
 * @param {number} id - The unique identifier of the project to update
 * @param {Partial<Project>} projectData - Partial project data with fields to update
 * @returns {Promise<Project | null>} The updated project or null if not found
 */
export async function updateProject(id: number, projectData: Partial<Project>): Promise<Project | null> {
  // First check if the project exists
  const existingProject = await getProject(id);
  if (!existingProject) return null;

  // Build update object based on provided fields
  const updateData: any = {};

  // Add each field that needs to be updated
  if ('title' in projectData && projectData.title) {
    updateData.title = projectData.title;
    // If title changes, update the slug as well (ensure title is defined)
    updateData.slug = generateSlug(projectData.title);
  }
  if ('description' in projectData) {
    updateData.description = projectData.description;
  }
  if ('year' in projectData) {
    updateData.year = projectData.year;
  }
  if ('image' in projectData) {
    updateData.image = projectData.image;
  }
  if ('image_light' in projectData) {
    updateData.image_light = projectData.image_light;
  }
  if ('images' in projectData) {
    updateData.images = projectData.images || [];
  }
  if ('tags' in projectData) {
    updateData.tags = projectData.tags;
  }
  if ('links' in projectData) {
    updateData.links = projectData.links;
  }
  if ('active' in projectData) {
    updateData.active = projectData.active;
  }
  if ('content' in projectData) {
    updateData.content = projectData.content;
  }
  // Allow explicit setting of slug if provided
  if ('slug' in projectData) {
    updateData.slug = projectData.slug;
  }

  // Always update the updated_at timestamp
  updateData.updated_at = new Date().toISOString();

  // If there's nothing to update, return the existing project
  if (Object.keys(updateData).length === 1) { // Only updated_at
    return existingProject;
  }

  // Execute the update query
  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  return data;
}

/**
 * Deletes a project from the database
 * 
 * @param {number} id - The unique identifier of the project to delete
 * @returns {Promise<boolean>} True if the project was deleted, false if not found
 */
export async function deleteProject(id: number): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  return true;
}