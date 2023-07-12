import "./liked.scss"
import Posts from "../../components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Liked = () => {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='liked'>
      <Posts liked={currentUser.id} />

    </div>
  )
}

export default Liked