import DevImg from "./DevImg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/(user_website)/components/ui/tabs";
import {
  User2,
  MailIcon,
  HomeIcon,
  PhoneCall,
  GraduationCap,
  Calendar,
  Briefcase,
} from "lucide-react";

const infoData = [
  {
    icon: <User2 size={20} />,
    text: "Vikash Kumar",
  },
  {
    icon: <PhoneCall size={20} />,
    text: "+91 80949 38186",
  },
  {
    icon: <MailIcon size={20} />,
    text: "vkumar637525@gmail.com",
  },
  {
    icon: <GraduationCap size={20} />,
    text: "Bachelor of Computer Applications (BCA)",
  },
  {
    icon: <HomeIcon size={20} />,
    text: "Pathroda, Alwar – 301406",
  },
];

const qualificationData = [
  {
    title: "education",
    data: [
      {
        university: "University of Technology",
        qualification: "Bachelor of Computer Applications (BCA)",
        Years: "2022 – 2025",
      },
      {
        university: "WsCube Tech",
        qualification: "MERN Stack Web Development Training",
        Years: "Jan 2025 – July 2025",
      },
    ],
  },
  {
    title: "experience",
    data: [
      {
        company: "WsCube Tech",
        role: "MERN Stack Intern",
        years: "Jan 2025 – July 2025",
      },
      {
        company: "Freelance Projects",
        role: "Frontend Developer (React & Next.js)",
        years: "2024 – Present",
      },
    ],
  },
];


const skillData = [
  {
    title: "skills",
    data: [
      { name: "HTML, CSS, JavaScript, C" },
      { name: "Frontend : (React.js, Responsive Design, Tailwind CSS, Bootstrap)" },
      { name: "Backend : (Node.js, Express.js , MongoDB)" },
    ],
  },
  {
    title: "tools",
    data: [
      { imgPath: "/about/vscode.svg" },
      { imgPath: "/about/figma.svg" },
      { imgPath: "/about/notion.svg" },
      { imgPath: "/about/wordpress.svg" },
    ],
  },
];

function About() {
  const getData = (arr, title) => {
    return arr.find((item) => item.title === title);
  };
  return (
    <section className="xl:h-[860px] pb-12 xl:py-24 px-4">
      <div className="container  mx-auto">
        <h2 className="section-title mb-8 xl:mb-16 text-center mx-auto">
          About me
        </h2>

        <div className="flex flex-col xl:flex-row">
          <div className="hidden xl:flex flex-1 relative">
            <DevImg
              containerStyles="bg-[url('/about/shape-light.svg')] dark:bg-[url('/about/shape-dark.svg')]
                    w-[505px] h-[505px] bg-no-repeat relative
                    "
              imgSrc="/about/developer.png"
            />
          </div>

          <div className="flex-1">
            <Tabs defaultValue="personal">
              <TabsList className="w-full grid xl:grid-cols-3 xl:max-w-[520px] xl:border dark:border-none">
                <TabsTrigger className="w-[162px] xl:w-auto" value="personal">
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  className="w-[162px] xl:w-auto"
                  value="qualification"
                >
                  Qualification
                </TabsTrigger>
                <TabsTrigger className="w-[162px] xl:w-auto" value="skills">
                  Skills
                </TabsTrigger>
              </TabsList>

              <div className="text-lg mt-12 xl:mt-8">
                <TabsContent value="personal">
                  <div className="text-center xl:text-left">
                    <h3 className="h3 mb-4">
                      Delivering Quality Code for Over a Year
                    </h3>
                    <p className="sub-title max-w-xl mx-auto xl:mx-0">
                      I'm a BCA student and passionate web developer who loves
                      turning ideas into real digital experiences. With over a
                      year of hands-on practice, I build clean, fast, and
                      user-friendly websites.
                    </p>
                    <div className="grid xl:grid-cols-2 gap-4 mb-12">
                      {infoData.map((item, index) => {
                        return (
                          <div
                            className="flex items-center gap-x-4 mx-auto xl:mx-0"
                            key={index}
                          >
                            <div className="text-primary">{item.icon}</div>
                            <div>{item.text}</div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <div className="text-primary">Langauge Skills</div>
                      <div className="border-b border-border"></div>
                      <div>Hindi, English</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="qualification">
                  <div>
                    <h3 className="h3 mb-8 text-center xl:text-left">
                      My Awesome Journey
                    </h3>

                    <div className="grid md:grid-cols-2 gap-y-8">
                      <div className="flex flex-col gap-y-6">
                        <div className="flex gap-x-4 items-center text-[22px] text-primary">
                          <Briefcase />
                          <h4 className="capitalize font-medium">
                            {getData(qualificationData, "experience").title}
                          </h4>
                        </div>

                        <div className="flex flex-col gap-8">
                          {getData(qualificationData, "experience").data.map(
                            (item, index) => {
                              const { company, role, years } = item;
                              return (
                                <div key={index} className="flex gap-x-8 group">
                                  <div className="h-[84px] w-[1px] bg-border relative ml-2">
                                    <div
                                      className="w-[11px] h-[11px] rounded-full bg-primary absolute -left-[5px] group-hover:translate-y-[84px]
                                transition-all duration-500"
                                    ></div>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-xl leading-none mb-2">
                                      {company}
                                    </div>
                                    <div className="text-lg leading-none text-muted-foreground mb-4">
                                      {role}
                                    </div>
                                    <div className="text-base font-medium">
                                      {years}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-y-6">
                        <div className="flex gap-x-4 items-center text-[22px] text-primary">
                          <GraduationCap size={28} />
                          <h4 className="capitalize font-medium">
                            {getData(qualificationData, "education").title}
                          </h4>
                        </div>

                        <div className="flex flex-col gap-8">
                          {getData(qualificationData, "education").data.map(
                            (item, index) => {
                              const { university, qualification, Years } = item;
                              return (
                                <div key={index} className="flex gap-x-8 group">
                                  <div className="h-[84px] w-[1px] bg-border relative ml-2">
                                    <div
                                      className="w-[11px] h-[11px] rounded-full bg-primary absolute -left-[5px] group-hover:translate-y-[84px]
                                transition-all duration-500"
                                    ></div>
                                  </div>
                                  <div>
                                    <div className="font-semibold text-xl leading-none mb-2">
                                      {university}
                                    </div>
                                    <div className="text-lg leading-none text-muted-foreground mb-4">
                                      {qualification}
                                    </div>
                                    <div className="text-base font-medium">
                                      {Years}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skills">
                  <div className="text-center xl:text-left">
                    <h3 className="h3 mb-8">What I Use Every Day</h3>
                    <div className="mb-16">
                      <h4 className="font-semibold mb-2 text-xl xl:text-left">
                        Skills
                      </h4>
                      <div className="border-b border-border mb-4"></div>
                      <div>
                        {getData(skillData, "skills").data.map(
                          (item, index) => {
                            const { name } = item;
                            return (
                              <div
                                key={index}
                                className="w-2/3 text-center xl:text-left mx-auto xl:mx-0"
                              >
                                <div className="font-medium">{name}</div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-xl xl:text-left">
                        Tools
                      </h4>
                      <div className="border-b border-border mb-4"></div>

                      <div className="flex gap-x-8 justify-center xl:justify-start">
                        {getData(skillData, "tools").data.map((item, index) => {
                          const { imgPath } = item;
                          return (
                            <div key={index}>
                              <Image
                                src={imgPath}
                                width={48}
                                height={48}
                                alt="vikash dev"
                                priority="true"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
