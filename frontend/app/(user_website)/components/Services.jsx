import { Server, LayoutDashboard , DatabaseZap  } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/(user_website)/components/ui/card";

const servicesData = [
  {
    icon: <Server size={72} strokeWidth={0.8} />,
    title: "Full-Stack Web Development",
    description:
      "I build scalable full-stack web applications using MongoDB, Express.js, React.js, and Node.js, ensuring seamless integration between frontend and backend.",
  },
  {
    icon: <LayoutDashboard  size={72} strokeWidth={0.8} />,
    title: "Frontend Development",
    description:
      "I create dynamic, user-friendly interfaces with React.js and Tailwind CSS, focused on performance and responsiveness across all devices.",
  },
  {
    icon: <DatabaseZap  size={72} strokeWidth={0.8} />,
    title: "Backend API & Database",
    description:
      "I develop secure RESTful APIs using Node.js and Express, and manage data efficiently with MongoDB, including schema design and data modeling.",
  },
];

function Services() {
  return (
    <section className="mb-12 xl:mb-36 px-4">
      <div className="container  mx-auto">
        <h2 className="section-title mb-24 xl:mb-24 text-center mx-auto">
          My Services
        </h2>

        <div className="grid xl:grid-cols-3 justify-center gap-y-12 xl:gap-y-24 xl:gap-x-8">
          {servicesData.map((item, index) => {
            return (
              <Card
                key={index}
                className="w-full max-w-[424px] h-[300px] flex flex-col pt-16 pb-10 justify-center items-center relative"
              >
                <CardHeader className="text-primary absolute -top-[60px]  w-full flex justify-center ">
                  <div className="w-[140px] h-[80px] bg-white dark:bg-background flex justify-center items-center">
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                    <CardTitle className='mb-4'>{item.title}</CardTitle>
                    <CardDescription className='text-lg'>{item.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
