import About from "@/app/(user_website)/components/About";
import Cta from "@/app/(user_website)/components/Cta";
import Hero from "@/app/(user_website)/components/Hero";
import Reviews from "@/app/(user_website)/components/Reviews";
import Services from "@/app/(user_website)/components/Services";
import Work from "@/app/(user_website)/components/Work";

export default function Home() {
  return (
    <section>
      <Hero />
      <About />
      <Services />
      <Work />
      <Reviews />
      <Cta />
    </section>
  );
}
