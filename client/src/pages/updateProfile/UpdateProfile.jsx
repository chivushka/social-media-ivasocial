import "./updateProfile.scss"
import {
  useMutation,
  useQueryClient,
  useQuery
} from 'react-query';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axi.js";

const UpdateProfile = () => {

  const { currentUser, setNewChange } = useContext(AuthContext);
  const userId = currentUser.id;

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery(["user"], () =>

    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })

  );

  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    status: "",
    email: ""
  });

  useEffect(() => {
    setTexts({ name: data?.name, status: data?.status, email: data?.email });
    setCover();
    setProfile();
    console.log(texts)
  }, [])
    
  

  const upload = async (file) => {
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : data.coverPic;
    profileUrl = profile ? await upload(profile) : data.profilePic;
    makeRequest.put("/users", { ...texts, coverPic: coverUrl, profilePic: profileUrl });
    if(profile) makeRequest.post("/gallery/addpic", {img:profileUrl,type:1});
    if(cover) makeRequest.post("/gallery/addpic", {img:coverUrl,type:2});
    setNewChange();
    setCover(null);
    setProfile(null);
    navigate("/profile/"+userId);
  }

    return (
      <div className="update">
        {isLoading ? "Loading..." :<div className="wrapper">
          <h1>Update Your Profile</h1>
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  { cover ? <img src= {URL.createObjectURL(cover)} alt=""/> : <img src= {"/upload/" + data.coverPic} alt=""/>} 
                  {/* <CloudUploadIcon className="icon" /> */}
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : "/upload/" + data.profilePic
                    }
                    alt=""
                  />
                  {/* <CloudUploadIcon className="icon" /> */}
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            {/* <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
          onChange={handleChange}
          /> */}
            <label>Name</label>
            <input
              type="text"              
              name="name"
              value={texts.name}
              onChange={handleChange}
            />
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={texts.status}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="text"              
              name="email"
              value={texts.email}
              onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
          </form>
        </div>}
      </div>
    )
  }

export default UpdateProfile