import { ReactNode } from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

interface Props {
    children?: ReactNode
    // any props that come into the component
}
const Layout: React.FC<Props> = ({
    children
}) => {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;