import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const Sidebar = () => {

const handleLogout = ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/"
}

  return (
    <div className="sidebar">
      <Link to="/skizatunes" style={{ textDecoration: "none" }}>
        <div className="top">
          <span className="logo">Tuma Energy </span>
        </div>
      </Link>
      <hr />
      <div className="center">
        <ul>
          <Link to="/skizatunes" style={{ textDecoration: "none" }}>
            <p className="title">MAIN</p>
            <li>
              <DashboardIcon className="icon" />
              <span>Our SKiza Tunes</span>
            </li>
          </Link>
          <Link to="/skizatunes/orders" style={{ textDecoration: "none" }}>
            <p className="title">CENTER</p>
            <li>
              <DashboardIcon className="icon" />
              <span>Subscribed Tunes</span>
            </li>
          </Link>
          {/* <Link to="/skizatunes/otps" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Otps</span>
            </li>
          </Link>
          <Link
            to="https://simplesms.co.ke:2121/login.xhtml"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Simple Sms</span>
            </li>
          </Link> */}

          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
