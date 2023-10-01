import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Link } from "react-router-dom";


import Datatable from "../../components/datatable/Datatable"

function Home  () {
  return (
    <div className="list">
     
    <Sidebar/>
    <div className="">
        <Navbar />      
      
      <Datatable/>
    </div>
  </div>
  );
};

export default Home;
