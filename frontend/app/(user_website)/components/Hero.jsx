import Link from "next/link";
import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";
import Bagde from "./Bagde";
import Socials from "./Socials";
import { RiArrowDownSLine, RiBriefcase4Fill, RiTeamFill, RiTodoFill } from "react-icons/ri";
import Rightbg from "./Rightbg";
import DevImg from "./DevImg";
import { Axiosinstance } from "@/app/utility/helper";



async function Hero() {
  const response = await Axiosinstance.get('/setting/get');
  const personalInfo = await response.data.data[0];
  const ExperienceStr = personalInfo.Experience.replace(/^\d+[km]?\s*/i, "").trim();
  const ExperienceNum = personalInfo.Experience.match(/^\d+/)[0];
  const happyUserNum = personalInfo.happyUser.match(/^\d+/)[0];

  return (
    <section className="py-12 xl:py-24 px-4 h-[84vh] xl:pt-8  bg-[url('/hero/hero-bg.png')] bg-no-repeat bg-bottom bg-cover dark:bg-none">
      <div className="container  mx-auto">
        <div className="flex justify-between gap-x-8">
          <div className="flex max-w-[600px] flex-col mx-auto justify-center xl:mx-0 text-center xl:text-left">
            <div className="md:text-sm uppercase tracking-[4px] font-semibold text-primary mb-4">MERN Stack Developer</div>
            <h1 className="h1 mb-4 ">Hello, My Name Is Vikash Kumar</h1>
            <p className="sub-title max-w-[490px] mx-auto xl:mx-0">
              I’m a web developer who loves turning ideas into real websites. I enjoy building clean, fast, and user-friendly web experiences.
            </p>
            <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0
            mb-12">
              <Link href={'/contact'}>
                <Button className='gap-x-2 cursor-pointer'>Contact me
                  <Send size={18} />
                </Button>
              </Link>

              <Link href={personalInfo?.cvUrl} target="_blank">
                <Button variant='secondary' className='gap-x-2 cursor-pointer'>Download CV
                  <Download size={18} />
                </Button>
              </Link>
            </div>

            <Socials socialLink={personalInfo} containerStyles='flex gap-x-6 mx-auto xl:mx-0' iconsStyles='text-foreground text-[22px] hover:text-primary transition-all' />
          </div>

          <div className="hidden xl:flex relative ">
            <Bagde containerStyles='absolute top-[24%] -left-[5rem]' icon={<RiBriefcase4Fill />} endCountNum={ExperienceNum} badgeText={ExperienceStr} />
            <Bagde containerStyles='absolute top-[80%] -left-[1rem]' icon={<RiTodoFill />} endCountText='+' endCountNum={25} badgeText='Finished Projects' />
            <Bagde containerStyles='absolute top-[55%] -right-8' icon={<RiTeamFill />} endCountNum={happyUserNum} endCountText='K' badgeText='Happy Users' />
            <Rightbg />
            <DevImg containerStyles=" bg-[url('/hero/shape-1.svg')] w-[510px] h-[462px] bg-no-repeat relative bg-bottom" imgSrc='/hero/developer.png' />
          </div>
        </div>

        <div className="hidden md:flex absolute left-2/4 bottom-44 xl:bottom-12 animate-bounce">
          <RiArrowDownSLine className="text-3xl text-primary" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
