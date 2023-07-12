import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/ExitToApp';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from 'react-query';
import { makeRequest } from "../../axi.js";
import MenuIcon from '@mui/icons-material/Menu';
import Friends from "../../assets/1.png";
import Newsfeed from "../../assets/2.png";
import Gallery from "../../assets/3.png";
import Liked from "../../assets/4.png";
import Messages from "../../assets/5.png";

const Navbar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);

  const { isLoading, error, data } = useQuery(["user"], () =>

    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })

  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const [input, setInput] = useState("nothing");

  const handleChange = (e) => {
    setInput(e.target.value);
    
  };

  const clearChange = (e) => {
    setInput("none");
    document.getElementById("searchtext").value = "";
  };
  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>ivasocial</span>
        </Link>
        <MenuIcon className="mob_menu" onClick={() => setOpenMenu(!openMenu)}/>
        <HomeOutlinedIcon />
        {darkMode ? <DarkModeOutlinedIcon onClick={toggle} /> : <WbSunnyOutlinedIcon onClick={toggle} />}
        <div className="search">
          <input id="searchtext" type="text" placeholder="Search" onChange={handleChange} />
          <Link to={`/search/${input}`} onClick={clearChange} style={{ textDecoration: "none", color: "inherit" }}>
            <SearchOutlinedIcon className="icon_search" />
          </Link>
        </div>
      </div>
      <div className="right">
        <button className="icon"><PersonOutlinedIcon /></button>
        <button className="icon"><EmailOutlinedIcon /></button>
        <button onClick={handleLogout}><LogoutIcon className="logicon" /></button>
        <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }} >
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </div>
        </Link>
      </div>

      {/* burger-menu */}
      {openMenu && 
      <div className="menu_container">
         <div className="menu">
          <div className="user">
            <img
              src={"/upload/"+currentUser.profilePic}
              alt="" />
            <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }} >
              <span>{currentUser.name}</span>
            </Link>
          </div>

          <div className="item">
            <img src={Friends} alt="" />
            <Link to={`/follows`} style={{ textDecoration: "none", color: "inherit" }}>
              <span>Follows</span>
            </Link>
          </div>
          <div className="item">
            <img src={Newsfeed} alt="" />
            <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
              <span>Newsfeed</span>
            </Link>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <Link to={`/gallery/all`} style={{ textDecoration: "none", color: "inherit" }}>
              <span>Gallery</span>
            </Link>
          </div>
          <div className="item">
            <img src={Liked} alt="" />
            <Link to={`/liked`} style={{ textDecoration: "none", color: "inherit" }}>
              <span>Liked</span>
            </Link>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Navbar