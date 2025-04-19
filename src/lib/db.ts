import { createClient } from "redis";
import { DATA } from "@/data/resume";

// Create Redis client
const client = createClient({
  url: process.env.REDIS_URL || '',
});

export const getRedisClient = async () => {
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

// Get all projects
export async function getProjects() {
  const redis = await getRedisClient();
  const projectsData = await redis.get('projects');
  
  let projects = projectsData ? JSON.parse(projectsData) : null;
  
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