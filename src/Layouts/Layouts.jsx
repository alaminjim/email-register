import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";

const Layouts = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Layouts;
