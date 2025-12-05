import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/app/(user_website)/components/Header";
import Footer from "@/app/(user_website)/components/Footer";
import { ThemeProvider } from "@/app/(user_website)/components/ThemeProvider";




const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Vikash Developer.",
  description: "Create by  Vikash.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        suppressContentEditableWarning
        className={`${outfit.variable} font-sans antialiased `}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
