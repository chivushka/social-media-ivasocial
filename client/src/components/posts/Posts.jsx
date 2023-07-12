import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from 'react-query';
import { makeRequest } from "../../axi.js";



const Posts = ({ userId, liked }) => {

  let likedPost=false;
  let textReq = "";
  if (userId != undefined) {
    textReq = "/posts?userId=" + userId;
  } else {
    textReq = "/posts";
  }

  if(liked) {
    likedPost=true;
    textReq = "/posts?liked=" + liked;
  }
  console.log(userId)


  const { isLoading, error, data } = useQuery(['posts'], () =>

    makeRequest.get(textReq).then((res) => {
      return res.data;
    })

  );

  console.log(data)

  return (
    <div className='posts'>
      {error
        ? "Something went wrong!"
        : isLoading
          ? "loading"
          : data.map((post) => <Post post={post} key={post.id} likedPost={likedPost}/>)}
    </div>
  )
}

export default Posts