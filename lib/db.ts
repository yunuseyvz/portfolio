/**
 * Database module for portfolio project
 * 
 * Provides interfaces and functions for PostgreSQL database interactions
 * related to project management in the portfolio website.
 */

import { Pool } from 'pg';
import { generateSlug } from './utils';

/**
 * PostgreSQL connection pool
 * Uses the DATABASE_URL environment variable for connection details
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects ORDER BY year DESC');
    return result.rows;
  } finally {
    client.release();
  }
}

/**
 * Retrieves a single project by its ID
 * 
 * @param {number} id - The unique identifier of the project
 * @returns {Promise<Project | null>} The project or null if not found
 */
export async function getProject(id: number): Promise<Project | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

/**
 * Retrieves a single project by its slug
 * 
 * @param {string} slug - The URL-friendly slug of the project
 * @returns {Promise<Project | null>} The project or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

/**
 * Creates a new project in the database
 * 
 * @param {Omit<Project, 'id' | 'created_at' | 'updated_at' | 'slug'>} project - The project data to insert
 * @returns {Promise<Project>} The newly created project with generated ID and timestamps
 */
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'slug'>): Promise<Project> {
  const client = await pool.connect();
  try {
    const { title, description, year, image, image_light, images, tags, links, active, content } = project;
    
    // Generate a slug from the title
    const slug = generateSlug(title);
    
    const result = await client.query(
      `INSERT INTO projects (title, description, year, image, image_light, images, tags, links, active, slug, content) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *`,
      [
        title, 
        description, 
        year, 
        image, 
        image_light,
        images || [],
        tags, 
        links ? JSON.stringify(links) : null, 
        active ?? false,
        slug,
        content || null
      ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
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
  const client = await pool.connect();
  try {
    // First get the existing project
    const existingProject = await getProject(id);
    if (!existingProject) return null;

    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    let paramCounter = 1;

    // Add each field that needs to be updated
    if ('title' in projectData && projectData.title) {
      updates.push(`title = $${paramCounter}`);
      values.push(projectData.title);
      paramCounter++;
      
      // If title changes, update the slug as well (ensure title is defined)
      updates.push(`slug = $${paramCounter}`);
      values.push(generateSlug(projectData.title));
      paramCounter++;
    }
    if ('description' in projectData) {
      updates.push(`description = $${paramCounter}`);
      values.push(projectData.description);
      paramCounter++;
    }
    if ('year' in projectData) {
      updates.push(`year = $${paramCounter}`);
      values.push(projectData.year);
      paramCounter++;
    }
    if ('image' in projectData) {
      updates.push(`image = $${paramCounter}`);
      values.push(projectData.image);
      paramCounter++;
    }
    if ('image_light' in projectData) {
      updates.push(`image_light = $${paramCounter}`);
      values.push(projectData.image_light);
      paramCounter++;
    }
    if ('images' in projectData) {
      updates.push(`images = $${paramCounter}`);
      values.push(projectData.images || []);
      paramCounter++;
    }
    if ('tags' in projectData) {
      updates.push(`tags = $${paramCounter}`);
      values.push(projectData.tags);
      paramCounter++;
    }
    if ('links' in projectData) {
      updates.push(`links = $${paramCounter}`);
      values.push(JSON.stringify(projectData.links));
      paramCounter++;
    }
    if ('active' in projectData) {
      updates.push(`active = $${paramCounter}`);
      values.push(projectData.active);
      paramCounter++;
    }
    if ('content' in projectData) {
      updates.push(`content = $${paramCounter}`);
      values.push(projectData.content);
      paramCounter++;
    }
    // Allow explicit setting of slug if provided
    if ('slug' in projectData) {
      updates.push(`slug = $${paramCounter}`);
      values.push(projectData.slug);
      paramCounter++;
    }
    
    // Always update the updated_at timestamp
    updates.push(`updated_at = NOW()`);
    
    // Add id as the last parameter
    values.push(id);

    // If there's nothing to update, return the existing project
    if (updates.length === 0) {
      return existingProject;
    }

    // Execute the update query
    const result = await client.query(
      `UPDATE projects SET ${updates.join(', ')} WHERE id = $${paramCounter} RETURNING *`,
      values
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

/**
 * Deletes a project from the database
 * 
 * @param {number} id - The unique identifier of the project to delete
 * @returns {Promise<boolean>} True if the project was deleted, false if not found
 */
export async function deleteProject(id: number): Promise<boolean> {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    return (result.rowCount ?? 0) > 0;
  } finally {
    client.release();
  }
}