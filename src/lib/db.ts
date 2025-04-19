import { createClient } from "redis";

// Create Redis client
const client = createClient({
  url: process.env.REDIS_URL || '',
});

// Connect to Redis (will be done on first use)
const getRedisClient = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
};

// Project type definition
export interface Project {
  id: string;
  title: string;
  description: string;
  slug?: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  imageLight?: string;
  video?: string;
  featured?: boolean;
  dates: string;
  active?: boolean;
  technologies?: string[];
  links?: Array<{ href: string; type: string; icon?: any }>;
}

// Initialize projects from resume data (if needed)
export async function initializeProjects() {
  const redis = await getRedisClient();
  
  // Check if projects already exist
  const existingProjects = await redis.get('projects')
    .then(data => data ? JSON.parse(data) : null)
    .catch(() => null);
  
  if (!existingProjects || existingProjects.length === 0) {
    // We'll initialize with an empty array for now, 
    // can import from resume data if needed
    await redis.set('projects', JSON.stringify([]));
    return [];
  }
  
  return existingProjects;
}

// Get all projects
export async function getProjects() {
  const redis = await getRedisClient();
  const projectsData = await redis.get('projects');
  
  let projects = projectsData ? JSON.parse(projectsData) : null;
  
  // Initialize if no projects exist
  if (!projects || projects.length === 0) {
    projects = await initializeProjects();
  }
  
  return projects || [];
}

// Get a single project by ID
export async function getProject(id: string) {
  const projects = await getProjects();
  return projects.find((project: Project) => project.id === id) || null;
}

// Create a new project
export async function createProject(project: Omit<Project, 'id'>) {
  const projects = await getProjects();
  
  const newProject = {
    ...project,
    id: `project-${Date.now()}`,
  };
  
  const updatedProjects = [...projects, newProject];
  
  const redis = await getRedisClient();
  await redis.set('projects', JSON.stringify(updatedProjects));
  
  return newProject;
}

// Update an existing project
export async function updateProject(id: string, projectData: Partial<Project>) {
  const projects = await getProjects();
  const index = projects.findIndex((p: Project) => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProject = { 
    ...projects[index], 
    ...projectData 
  };
  
  projects[index] = updatedProject;
  
  const redis = await getRedisClient();
  await redis.set('projects', JSON.stringify(projects));
  
  return updatedProject;
}

// Delete a project
export async function deleteProject(id: string) {
  const projects = await getProjects();
  const filteredProjects = projects.filter((project: Project) => project.id !== id);
  
  if (filteredProjects.length === projects.length) {
    return false; // No project was deleted
  }
  
  const redis = await getRedisClient();
  await redis.set('projects', JSON.stringify(filteredProjects));
  
  return true;
}