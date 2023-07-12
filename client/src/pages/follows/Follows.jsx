import "./follows.scss"
import { useQuery } from 'react-query';
import { makeRequest } from "../../axi.js";
import { Link } from "react-router-dom";

const Follows = () => {

    const { isLoading, error, data } = useQuery(['follows'], () =>

        makeRequest.get("/follows?type=followed").then((res) => {
            return res.data;
        })

    );

    const { isLoading: fIsLoading, error: errIsLoading, data: fData } = useQuery(['followed'], () =>

        makeRequest.get("/follows?type=follow").then((res) => {
            return res.data;
        })

    );
    if (typeof (data) == "undefined") {
        console.log("yes")
    }

    return (
        <div className='follows'>
            <div className="container">
                <div className="item">
                    <span className="foll">Followers</span>
                    {error ? "Something went wrong!"
                        : isLoading ? "loading"
                            : data.length!=0 ? data.map((follow) =>
                                <div className="user" key={follow.id}>
                                    <div className="userInfo">
                                        <img src={"/upload/" + follow.profilePic} alt="" />
                                        <Link
                                            to={`/profile/${follow.id}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            <span>{follow.name}</span>
                                        </Link>

                                    </div>
                                    <span className="text-follow">follow you</span>
                                </div>
                            ) : <div className="none">No one follows you</div>}
                </div>
                <div className="item">
                    <span className="foll">Followed</span>
                    {errIsLoading ? "Something went wrong!"
                        : fIsLoading ? "loading"
                            : fData.length!=0 ? fData.map((followed) =>
                                <div className="user" key={followed.id}>
                                    <div className="userInfo">
                                        <img src={"/upload/" + followed.profilePic} alt="" />
                                        <Link
                                            to={`/profile/${followed.id}`}
                                            style={{ textDecoration: "none", color: "inherit" }}
                                        >
                                            <span>{followed.name}</span>
                                        </Link>
                                    </div>
                                    <span className="text-follow">you followed</span>
                                </div>
                            ): <div className="none">You followed no one</div>}
                </div>
            </div>

        </div>
    )
}

export default Follows