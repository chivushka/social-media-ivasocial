import "./someGallery.scss"
import React, { useState } from "react";
import {
    useMutation,
    useQueryClient,
    useQuery
  } from 'react-query';
import { makeRequest } from "../../axi.js";
import { Link, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


const SomeGallery = () => {

    const { currentUser } = useContext(AuthContext);
    const [err, setErr] = useState(null);
    const [dataImg, setDataImg] = useState({ img: "", id: 0 })
    const [menuOpen, setMenuOpen] = useState(false);

    const albumName = useLocation().pathname.split("/")[2];

    const { isLoading, error, data } = useQuery(['gallery'], () =>

        makeRequest.get("/gallery/getpics?name=" + albumName).then((res) => {
            return res.data;
        })

    );

    let dataSet = data;

    let idi = 0;
    const plus = (num) => {
        num += 1
    }

    const viewImage = (img, id) => {
        setDataImg({ img, id });
        console.log(img, id)
    }

    const imgAction = (action) => {
        let id = dataImg.id;
        if (action == 'next-img') {
            try {
                setDataImg({ img: data[id + 1].img, id: id + 1 })
            } catch (err) {
                setErr(err);
            }
        }
        if (action == 'prev-img') {
            try {
                setDataImg({ img: data[id - 1].img, id: id - 1 })
            } catch (err) {
                setErr(err);
            }
        }
        if (!action) {
            setDataImg({ img: "", id: 0 })
        }

    }

    const deleteMutation = useMutation(
        (postId) => {
          return makeRequest.delete("/gallery/" + postId);
        }, {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["gallery"])
        },
      })
    
      const handleLike = () => {
        mutation.mutate(data?.includes(currentUser.id));
        if (likedPost) {
          window.location.reload(true);
        }
    
      }
    
      const handleDelete = () => {
        deleteMutation.mutate(dataImg.id);
      }

    return (
        <>
            {dataImg.img &&
                <div className="caurosel">
                        <button className="more"><MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} /></button>
                        {menuOpen && 
                            <div>
                                <button className="delete" onClick={handleDelete}>delete</button>
                            </div>}
                        <button className="exit" onClick={() => imgAction()}><CloseIcon /></button>
                    <button className="leftArrow" onClick={() => imgAction("prev-img")}><ArrowBackIosIcon /></button>
                    <img src={"/upload/" + dataImg.img} alt="" />
                    <button className="rightArrow" onClick={() => imgAction("next-img")}><ArrowForwardIosIcon /></button>
                </div>}
            <div className="someGallery">
                <div className="prev-container">
                    <Link to={`/gallery/all`} style={{ textDecoration: "none", color: "inherit" }}>
                        <button>All</button>
                    </Link>
                    <Link to={`/gallery/avatar`} style={{ textDecoration: "none", color: "inherit" }}>
                        <button>Avatars</button>
                    </Link>
                    <Link to={`/gallery/cover`} style={{ textDecoration: "none", color: "inherit" }}>
                        <button>Covers</button>
                    </Link>
                </div>

                <div className="container">
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    >
                        <Masonry gutter="15px">
                            {isLoading ? "loading" : data.map((pic, i) => (
                                <img
                                    key={i}
                                    src={"/upload/" + pic.img}
                                    style={{ width: "100%", display: "block" }}
                                    alt=""
                                    onClick={() => viewImage(pic.img, i)}
                                />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>
        </>


    )
}

export default SomeGallery
