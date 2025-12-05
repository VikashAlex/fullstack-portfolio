import "../globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Bounce, ToastContainer } from "react-toastify";


export const metadata = {
  title: "Vikash Developer.",
  description: "Create by  Vikash.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <LayoutWrapper children={children} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  )
}
