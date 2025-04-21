"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import ProjectList from "./project-list";
import BlurFade from "../../ui/blur-fade";
import { PlusCircle, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Project } from "../../../lib/db";

const BLUR_FADE_DELAY = 0.04;

interface AdminProjectsClientProps {
  initialProjects: Project[];
}

export default function AdminProjectsClient({ initialProjects }: AdminProjectsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProjects = initialProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Link href="/admin/projects/new" prefetch={false}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> 
              New Project
            </Button>
          </Link>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Project Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <ProjectList projects={filteredProjects} />
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              {`${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} found`}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}