import { Outlet } from "react-router-dom";
import HeaderTop from "../HeaderTop";
import HeaderBottom from "./../HeaderBottom";
import Footer from "../Footer";
export default function MainLayout() {
  return (
    <>
      <header >
        <HeaderTop />
        <HeaderBottom />
      </header>
      <div style={{background:"#012348"}}>
      <Outlet />
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}
