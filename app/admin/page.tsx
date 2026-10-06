import { Metadata } from "next";

import AdminDashboard from "@/components/admin/admin-dashboard";
import AdminLogin from "@/components/admin/admin-login";
import { Projects as staticProjects } from "@/config/projects";
import { isAdmin } from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/mongodb";
import { getStoredProjects } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin configured={Boolean(process.env.ADMIN_PASSWORD)} />;
  }

  const projects = await getStoredProjects();
  return (
    <AdminDashboard
      projects={projects}
      dbConfigured={isDbConfigured()}
      builtInProjects={staticProjects.map((p) => p.companyName)}
    />
  );
}
