import "./profile.scss"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import {
  useMutation,
  useQueryClient,
  useQuery
} from 'react-query';
import { makeRequest } from "../../axi.js";
import { useLocation, useParams, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {useContext, useEffect, useState} from "react";


const Profile = () => {

  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery(["userProfile"], () =>

    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })

  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(["relationship"], () =>

    makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })

  );

  const queryClient = useQueryClient();

  const mutation = useMutation((following) => {
    if (following) return makeRequest.delete("/relationships?userId=" + userId);
    return makeRequest.post("/relationships", { userId });
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["relationship"])
    },
  })


  const handleFollow = () => {
    mutation.mutate(relationshipData?.includes(currentUser.id))

  }

  const handleUpdate = () => {
    navigate("/updateProfile");

  }

  return (
    <div className='profile'>
      {isLoading ? "Loading..." :
        <>
          <div className="images">
            <img src={"/upload/"+data.coverPic} alt="" className="cover" />
            <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">

              <div className="left">

              </div>

              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  {data.status}
                </div>
                {rIsLoading ? ("loading...") :
                  userId === currentUser.id ?
                    (<button onClick={handleUpdate}>update</button>) :
                    (<button onClick={handleFollow}>{relationshipData.includes(currentUser.id) ? "Following" : "Follow"}</button>)}
              </div>

              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>

            </div>
            <Posts userId={userId} />
          </div>
        </>}
    </div>
  )
}

export default Profile