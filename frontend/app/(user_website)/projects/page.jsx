"use client";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/app/(user_website)/components/ui/tabs";
import ProjectCard from "@/app/(user_website)/components/ProjectCard";
import { Axiosinstance } from "@/app/utility/helper";

function Page() {
  const [projectData, setProjectData] = useState([]);
  const [tech, setTech] = useState([]); 
  const [category, setCategory] = useState("All Projects"); 

  
  useEffect(() => {
    // get project
    Axiosinstance.get(`/project/get`)
      .then((res) => {
        if (res.data.success) {
          setProjectData(res.data.data || []);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // get skills
    Axiosinstance.get(`/skills/get`)
      .then((res) => {
        if (res.data.success) {
          const skills = res.data.data.map((item) => item.skill);
          const uniqueSkills = [...new Set(skills)];
          setTech(uniqueSkills);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const categories = useMemo(() => {
    return ["All Projects", ...tech];
  }, [tech]);

  const filteredProjects = useMemo(() => {
    if (category === "All Projects") return projectData;

    return projectData.filter((proj) => {
      const techField = proj.tech || proj.skills || proj.technologies || "";

      if (Array.isArray(techField)) {
        return techField.includes(category);
      } else if (typeof techField === "string") {
        // try to match exact or comma separated values
        const parts = techField.split(",").map((p) => p.trim());
        return parts.includes(category);
      }
      return false;
    });
  }, [projectData, category]);

  return (
    <section className="min-h-screen pt-12 px-4">
      <div className="container mx-auto">
        <h2 className="section-title mb-8 xl:mb-16 text-center mx-auto">My Projects</h2>
        <Tabs defaultValue={category} className="mb-24 xl:mb-48">
          <TabsList className="w-full grid h-full md:grid-cols-4 lg:max-w-[640px] mb-12 mx-auto md:border dark:border-none">
            {categories.map((cat, idx) => (
              <TabsTrigger
                onClick={() => setCategory(cat)}
                value={cat}
                key={idx}
                className="capitalize w-[162px] md:w-auto"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="text-lg xl:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filteredProjects.length === 0 ? (
              <p className="col-span-full text-center">No projects found.</p>
            ) : (
              filteredProjects.map((project, index) => (
                <TabsContent value={category} key={index}>
                  <ProjectCard project={project} />
                </TabsContent>
              ))
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
