import { ReactNode } from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./pages/auth/AuthProvider";

interface Props {
  children?: ReactNode
  // any props that come into the component
}
const Layout: React.FC<Props> = ({
  children
}) => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </AuthProvider>

    </>
  )
}

export default Layout;