import { useLocation } from 'react-router-dom';
import SomeGallery from "./SomeGallery"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Gallery = () => {
    const location = useLocation();
  return (
    <div key={location.key}>
        <SomeGallery />
    </div>
  )
}

export default Gallery