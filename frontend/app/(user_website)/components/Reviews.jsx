"use client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const reviewsData = [
  {
    avatar: "/reviews/avatar-1.png",
    name: "Rohit Sharma",
    job: "Freelance Client",
    reviwes:
      "Vikash delivered a very polished website layout. Even though it was a demo project, he worked like a pro. Looking forward to more!",
  },
  {
    avatar: "/reviews/avatar-2.png",
    name: "Priya Singh",
    job: "Startup Owner",
    reviwes:
      "Loved the clean and responsive UI he created for our concept store. Tailwind CSS skills are on point!",
  },
  {
    avatar: "/reviews/avatar-3.png",
    name: "Amit Verma",
    job: "Test Client",
    reviwes:
      "The attention to detail and design clarity in the demo project was impressive. Vikash knows how to make things user-friendly.",
  },
  {
    avatar: "/reviews/avatar-4.png",
    name: "Sneha Tiwari",
    job: "Business Analyst",
    reviwes:
      "Vikash has a solid grip over frontend technologies. The layout he made for our mock e-commerce app was smooth and functional.",
  },
  {
    avatar: "/reviews/avatar-6.png",
    name: "Deepak Chauhan",
    job: "Project Reviewer",
    reviwes:
      "His ability to turn a simple idea into a good-looking and mobile-ready UI is commendable. Keep up the great work!",
  },

];

function Reviews() {
  return (
    <section className="mb-12 xl:mb-0 px-4">
      <div className="container  mx-auto">
        <h2 className="section-title mb-12 text-center mx-auto">Reviews</h2>

        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1400: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          className="h-[350px]"
        >
          {reviewsData.map((person, index) => {
            return (
              <SwiperSlide key={index}>
                <Card className='bg-tertiary dark:bg-secondary/40 p-8 min-h-[300px]'>
                 <CardHeader className='p-0 mb-10'>
                    <div className="flex items-center gap-x-4">
                        <Image src={person.avatar} width={70} height={70} alt="avtar" priority  />
                        <div className="flex flex-col">
                            <CardTitle>{person.name}</CardTitle>
                            <p>{person.job}</p>
                        </div>
                    </div>
                 </CardHeader>
                 <CardDescription className='text-lg text-muted-foreground'>{person.reviwes}</CardDescription>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default Reviews;
