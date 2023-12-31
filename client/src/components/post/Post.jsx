import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import {
  useMutation,
  useQueryClient,
  useQuery
} from 'react-query';
import { makeRequest } from "../../axi.js";

const Post = ({ post, likedPost }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(['likes', post.id], () =>

    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })

  );

  const queryClient = useQueryClient();

  const mutation = useMutation((liked) => {
    if (liked) return makeRequest.delete("/likes?postId=" + post.id);
    return makeRequest.post("/likes", { postId: post.id });
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["likes"])
    },
  })

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"])
    },
  })

  const handleLike = () => {
    mutation.mutate(data?.includes(currentUser.id));
    if (likedPost) {
      window.location.reload(true);
    }

  }

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+ post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && 
          <div className="more">
            {/* <button>edit</button> */}
            <button onClick={handleDelete}>delete</button>
            </div>}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;