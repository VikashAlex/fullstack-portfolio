'use client'
import { useRouter } from 'next/navigation';
import Link from "next/link"
import { Button } from "./ui/button"

function Cta() {
    const router = useRouter();
    const handleClick = () => {
    // Scroll trigger set karo
    sessionStorage.setItem("scrollToForm", "true");
    router.push("/contact");
  };

  return (
    <section className="py-24 bg-tertiary dark:bg-secondary/40 ">
        <div className="container  mx-auto">
            <div className="flex items-center flex-col">
                <h2 className="h3 max-w-lg mb-8 text-center"> Have a project in mind? Let’s build something amazing together.</h2>
            <Link href='/contact'>
            <Button onClick={handleClick} className='cursor-pointer'>Let's Connect</Button>
            </Link>
            </div>

        </div>
    </section>
  )
}

export default Cta