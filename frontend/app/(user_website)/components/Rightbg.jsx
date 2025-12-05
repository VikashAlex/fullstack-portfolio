'use client'
import { useTheme } from "next-themes";

export default function Rightbg() {
  const { theme } = useTheme();


  const shapeBg =
    theme === "dark"
      ? "url('/hero/shape-2-dark.svg')"
      : "url('/hero/shape-2-light.svg')";

  return (
    <div
      className="absolute -top-1 -right-2 bg-no-repeat w-[500px] h-[500px]"
      style={{ backgroundImage: shapeBg }}
    >
        
    </div>
  );
}
