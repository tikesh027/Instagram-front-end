import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import styles from "../Navigation/Navigation.module.css";
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.navContainer}>
      <div className={styles.navbar}>
        <div>
          <h1 className={styles.title}>MERNY</h1>
        </div>
        <div>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Enter The Search"
          />
        </div>
        <div className={styles.iconsContainer}>
            <button className={styles.icons}><HomeIcon /></button>
            <button className={styles.icons}><MessageIcon/></button>
            <button className={styles.icons}><NotificationsIcon/></button>
            <button className={styles.icons} onClick={handleClick} ><AccountCircleSharpIcon/></button>
        </div>
      </div>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    
    </div>
  );
};

export default Navigation;
