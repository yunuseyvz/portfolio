import { NextResponse } from "next/server";
import { getProject, updateProject, deleteProject, getProjectBySlug } from "../../../../lib/db";
import { auth } from "../../../../auth";
import { revalidateProjects } from "../../../../lib/server-actions";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const idOrSlug = (await props.params).id;
    
    // First try to parse as an ID
    const id = parseInt(idOrSlug, 10);
    
    // If it's a valid number, get project by ID
    if (!isNaN(id)) {
      const project = await getProject(id);
      
      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
      
      return NextResponse.json(project);
    } 
    // Otherwise, treat it as a slug
    else {
      const project = await getProjectBySlug(idOrSlug);
      
      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
      
      return NextResponse.json(project);
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    
    // Check authentication
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const id = parseInt((await props.params).id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }
    
    const projectData = await request.json();
    const updatedProject = await updateProject(id, projectData);
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Revalidate the projects page when a project is updated
    // Pass the specific project ID and slug to revalidate both the main listing and the individual project page
    revalidateProjects(updatedProject.id, updatedProject.slug);
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    
    // Check authentication
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const id = parseInt((await props.params).id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }
    
    const result = await deleteProject(id);
    
    if (!result) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Revalidate after deleting
    revalidateProjects();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}