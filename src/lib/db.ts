import { Pool } from 'pg';

// Create PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Link interface for project links
export interface ProjectLink {
  type: string;
  href: string;
  icon?: string; // Optional icon for the link
}

// Project type definition matching our PostgreSQL schema
export interface Project {
  id: number;
  title: string;
  description: string;
  slug?: string;
  year?: number;
  tags: string[];
  image?: string;
  image_light?: string;
  links?: ProjectLink[];
  active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Get all projects
export async function getProjects(): Promise<Project[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects ORDER BY year DESC');
    return result.rows;
  } finally {
    client.release();
  }
}

// Get a single project by ID
export async function getProject(id: number): Promise<Project | null> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

// Create a new project
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
  const client = await pool.connect();
  try {
    const { title, description, year, image, image_light, tags, links, active } = project;
    const result = await client.query(
      `INSERT INTO projects (title, description, year, image, image_light, tags, links, active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [title, description, year, image, image_light, tags, links ? JSON.stringify(links) : null, active ?? false]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Update an existing project
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
    if ('title' in projectData) {
      updates.push(`title = $${paramCounter}`);
      values.push(projectData.title);
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
    
    // Always update the updated_at timestamp
    updates.push(`updated_at = NOW()`);
    
    // Add id as the last parameter
    values.push(id);
    
    // If there's nothing to update, return the existing project
    if (updates.length === 1) {
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

// Delete a project
export async function deleteProject(id: number): Promise<boolean> {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  } finally {
    client.release();
  }
}