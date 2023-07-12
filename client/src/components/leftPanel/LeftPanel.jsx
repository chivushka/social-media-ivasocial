import "./leftPanel.scss"
import Friends from "../../assets/1.png";
import Newsfeed from "../../assets/2.png";
import Gallery from "../../assets/3.png";
import Liked from "../../assets/4.png";
import Messages from "../../assets/5.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useQuery} from 'react-query';
import { makeRequest } from "../../axi.js";

const LeftPanel = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='leftPanel'>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/"+currentUser.profilePic}
              alt="" />
            <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }} >
              <span>{currentUser.name}</span>
            </Link>
            {/* <a href={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }} >
              <span>{currentUser.name}</span>
              </a> */}
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
    </div >
  )
}

export default LeftPanel