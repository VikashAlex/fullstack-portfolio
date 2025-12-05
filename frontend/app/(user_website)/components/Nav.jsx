"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Links = [
  { path: "/", name: "Home" },
  { path: "/projects", name: "My Project" },
  { path: "/contact", name: "Contact" },
];

function Nav({ containerStyles, linkStyles, underlineStyles }) {
  const path = usePathname();
  return (
    <nav className={`${containerStyles}`}>
      {Links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`capitalize ${linkStyles}`}
          >
            {link.path=== path && (
                <motion.span initial={{y:'-100%'}} animate={{y:'0'}}
                transition={{type:'tween'}} layoutId="underline" className={`${underlineStyles}`}/>
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Nav;
