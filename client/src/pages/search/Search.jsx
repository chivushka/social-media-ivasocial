import "./search.scss";
import { useLocation, useParams, useNavigate} from "react-router-dom";
import { useQuery } from 'react-query';
import { makeRequest } from "../../axi.js";
import { Link } from "react-router-dom";


const Search = () => {
    
    const text = useLocation().pathname.split("/")[2];
    let check=1;
    console.log(text)
    const { isLoading, error, data } = useQuery(['humans'], () =>

        makeRequest.get("/search?text="+ text).then((res) => {
            return res.data;
        })

    );
    console.log(data)
    

    return (
        <div className="searching">
            <div className="container">
                <div className="item">
                    <span className="foll">People</span>
                    {error ? "Something went wrong!"
                        : isLoading ? "loading"
                            : data.length!=0 ? data.map((humans) =>
                                <div className="user" key={humans.id}>
                                    <div className="userInfo">
                                        <img src={"/upload/" + humans.profilePic} alt="" />
                                        <Link
                                            to={`/profile/${humans.id}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            <span>{humans.name}</span>
                                        </Link>

                                    </div>
                                </div>
                            ):<div className="none" style={{color: "gray" }}>Nothing found.</div>}
                </div>
            </div>
        </div>

    )
}

export default Search