import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/db";
import { auth } from "@/auth";
import { revalidateProjects } from "@/lib/server-actions";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    // Check authentication
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const projectData = await req.json();
    const newProject = await createProject(projectData);
    
    // Revalidate the projects page to reflect the new project
    revalidateProjects();
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}