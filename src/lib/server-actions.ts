'use server';

import { revalidatePath } from "next/cache";

/**
 * Revalidates the projects page to ensure it shows the most recent content
 * Call this function whenever projects data changes (create, update, delete)
 * 
 * @param {number} [projectId] - Optional specific project ID to revalidate
 * @param {string} [projectSlug] - Optional project slug to revalidate
 */
export async function revalidateProjects(projectId?: number, projectSlug?: string) {
  // Revalidate the main projects listing page
  revalidatePath('/projects');
  console.log("Revalidating projects page...");
  
  // If a specific project ID is provided, revalidate that project's page as a slug param
  if (projectId) {
    revalidatePath(`/projects/${projectId}`);
    console.log(`Revalidating project page with ID as slug param: /projects/${projectId}`);
  }
  
  // If a specific project slug is provided, revalidate that project's slug-based page
  if (projectSlug) {
    revalidatePath(`/projects/${projectSlug}`);
    console.log(`Revalidating project page by slug: /projects/${projectSlug}`);
  }
  
  // If no specific ID or slug provided, revalidate all project pages
  if (!projectId && !projectSlug) {
    // This uses a catch-all pattern to revalidate any potential project page
    revalidatePath('/projects/[slug]');
    console.log("Revalidating all project detail pages");
  }

  // Optionally, you can also revalidate the homepage or any other pages that depend on projects data
  // revalidatePath('/');
}