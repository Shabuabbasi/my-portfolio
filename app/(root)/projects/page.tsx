import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectCard from "@/components/projects/project-card";
import { ResponsiveTabs } from "@/components/ui/responsive-tabs";
import { pagesConfig } from "@/config/pages";
import { ProjectInterface } from "@/config/projects";
import { getAllProjects } from "@/lib/projects-db";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
};

export const dynamic = "force-dynamic";

const renderContent = (Projects: ProjectInterface[], tabVal: string) => {
  let projectArr = Projects;
  if (tabVal === "personal") {
    projectArr = projectArr.filter((val) => val.type === "Personal");
  } else if (tabVal === "professional") {
    projectArr = projectArr.filter((val) => val.type === "Professional");
  }

  return (
    <div className="mx-auto my-4 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 static items-stretch">
      {projectArr.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const tabItems = [
    {
      value: "all",
      label: "All",
      content: renderContent(projects, "all"),
    },
    {
      value: "personal",
      label: "Personal",
      content: renderContent(projects, "personal"),
    },
    {
      value: "professional",
      label: "Professional",
      content: renderContent(projects, "professional"),
    },
  ];

  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <ResponsiveTabs items={tabItems} defaultValue="all" />
    </PageContainer>
  );
}
