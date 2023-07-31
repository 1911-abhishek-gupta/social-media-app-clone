import React, { useContext } from 'react'
import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
      <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">SocialApp</span>
      </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
        <SearchIcon className='searchIcon'/>
        <input placeholder='Search for friends, post or any video' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon/>
            <span className="topbarIconBadge">
              1
            </span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon/>
            <span className="topbarIconBadge">
              1
            </span>
          </div>
          <Link to="/messenger">
          <div className="topbarIconItem">
            <ChatIcon/>
            <span className="topbarIconBadge">
              1
            </span>
          </div>
          </Link>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture
        ?PF+user.profilePicture
        :PF+"person/noAvatar.png"
        } alt="" className="topbarImg" />
        </Link>
      </div>

    </div>
  )
}

export default Topbar