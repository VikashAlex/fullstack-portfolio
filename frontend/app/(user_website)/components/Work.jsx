"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { Axiosinstance } from "@/app/utility/helper";



function Work() {
  const [projectData, setProjectData] = useState([]);
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
  
    }, []);
  return (
    <section className="relative mb-12 xl:mb-48 px-4">
      <div className="container  mx-auto">
        <div className="max-w-[400px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col items-center xl:items-start justify-center">
          <h2 className="section-title mb-4">Latest Projects</h2>
          <p className="sub-title mb-8 xl:pr-32 lg:pr-0 ">
            Here are some of the projects I’ve worked on using React, Next.js, and the MERN stack.
          </p>
          <Link href="/projects">
            <Button className='cursor-pointer'>All Projects</Button>
          </Link>
        </div>

        <div className="xl:max-w-[1000px] xl:absolute right-0 top-0">
          <Swiper
            className="h-[520px]"
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {projectData.slice(0.4).map((project, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Work;
