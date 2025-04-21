'use server';

import { revalidatePath } from "next/cache";

/**
 * Revalidates the projects page to ensure it shows the most recent content
 * Call this function whenever projects data changes (create, update, delete)
 */
export async function revalidateProjects() {
  revalidatePath('/projects');
  console.log("Revalidating projects page...");
  // Optionally, you can also revalidate the homepage or any other pages that depend on projects data
    // revalidatePath('/');
}