import Form from "@/pages/Form";
import { MailIcon, PhoneCall, HomeIcon } from "lucide-react";
function Contact() {
  return (
    <section className="px-4">
      <div className="container  mx-auto">
        <div className="grid xl:grid-cols-2 pt-12 xl:h-[480px] mb-6 xl:mb-24">
          <div className="flex justify-center flex-col">
            <div className="flex items-center gap-x-4 text-primary text-lg mb-4">
              <span className="w-[30px] h-[2px] bg-primary"></span>
              Say Hello 👋
            </div>
            <h1 className="h1 max-w-md mb-8">Let's Work Together.</h1>
            <p className="sub-title max-w-[400px]">
              Got an idea or project in mind? Let’s connect and build something amazing together!
            </p>
          </div>

          <div
            className="hidden xl:flex w-full bg-[url('/contact/illustration-light.svg')] dark:bg-[url('/contact/illustration-dark.svg')]
          bg-contain bg-top bg-no-repeat"
          ></div>
        </div>

        <div className="grid xl:grid-cols-2 mb-24 xl:mb-32" id="contact-form">
          <div className="flex flex-col gap-y-4 xl:gap-y-14 mb-12 xl:mb-24 text-base xl:text-lg">
            <div className="flex items-center gap-x-8">
              <MailIcon size={18} className="text-primary" />
              <div>vkumar637525@gmail.com</div>
            </div>
            <div className="flex items-center gap-x-8">
              <HomeIcon size={18} className="text-primary" />
              <div>Alwar, Rajasthan, India 301406</div>
            </div>
            <div className="flex items-center gap-x-8">
              <PhoneCall size={18} className="text-primary" />
              <div>+91 8094938186</div>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </section>
  );
}

export default Contact;
