import React from 'react'
import { useLocation } from 'react-router-dom';
import Profile from '../../pages/profile/Profile'

const profileCover = () => {
    const location = useLocation();
  return (
    <div key={location.key}><Profile/></div>
  )
}

export default profileCover