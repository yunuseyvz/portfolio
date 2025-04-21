"use client";

import { Session } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Settings, BarChart3, Folder, Globe } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

interface AdminDashboardClientProps {
  session: Session;
}

export default function AdminDashboardClient({ session }: AdminDashboardClientProps) {  
  return (
    <div className="space-y-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-3xl font-bold">Welcome back, {session.user?.name || "Admin"}</h1>
        <p className="text-muted-foreground mt-2">Manage your portfolio content from here</p>
      </BlurFade>
      
      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <Card className="mt-8 border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{session.user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <span>Administrator</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}