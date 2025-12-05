import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader } from "./ui/card";
import { Github, Link2Icon } from "lucide-react";
import { Badge } from "./ui/badge";

function ProjectCard({ project }) {
  return (
    <Link href={project?.livelink || "#"} target="_blank">
      <Card className="group overflow-hidden relative">
        <CardHeader className="p-0">
          <div
            className="relative flex items-center justify-center w-full h-[300px] bg-trtiary dark:bg-secondary/40
        xl:bg-[url('/work/project-bg-light.png')] xl:bg-[110%] xl:dark:bg-[url('/work/project-bg-dark.png')] xl:bg-no-repeat overflow-hidden"
          >
            <Image
              className="absolute bottom-0 shadow-2xl"
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/projects/${project?.thumbnail}`}
              width={247}
              height={250}
              alt={project?.projectname}
              priority
            ></Image>

            <div className="flex gap-x-4">
              <Link href={project?.livelink} target="_blank" className="bg-secondary w-[54px] h-[54px] rounded-full flex justify-center items-center scale-0 opacity-0
            group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"><Link2Icon className="text-white" /></Link>
              <Link href={project?.repogithub} target="_blank" className="bg-secondary w-[54px] h-[54px] rounded-full flex justify-center items-center scale-0 opacity-0
            group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"><Github className="text-white" /></Link>
            </div>
          </div>
        </CardHeader>
        <div className="h-full px-8 py-6">
          <div className="flex items-center gap-x-3">

            <div className="uppercase text-sm flex items-center flex-wrap gap-3 opacity-0 duration-500  transition-all  justify-center group-hover:opacity-100  font-medium mb-2 absolute top-[-50px] group-hover:top-4 left-5">
              {
                project?.tech?.map((item,indx) => {
                  return <Badge key={indx} >
                    {item}
                  </Badge>
                })
              }
            </div>
          </div>
          <h4 className="h4 mb-1">{project?.projectname}</h4>
          <p className="text-muted-foreground text-lg line-clamp-2">{project?.description}</p>
        </div>
      </Card>
    </Link>
  );
}

export default ProjectCard;
