import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import styles from "../Navigation/Navigation.module.css";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../Constant/Constant";
import { getAccessTokenFromCookie } from "../../../Constant/helpers";
import BasicPopover from "./PopOverNotification";

export type TNotification = {
  text: string;
  user: any;
};

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [allNotifications, setAllNotifications] = useState<TNotification[]>([]);
  const open = Boolean(anchorEl);

  const getAllNotifications = async () => {
    const accessToken = getAccessTokenFromCookie();
    try {
      const notifications = await axios.get(`${BASE_URL}/notifications`, {
        headers: {
          "X-Authorization": accessToken,
        },
      });
      setAllNotifications(notifications.data.notification);
      console.log(notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

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
          <button className={styles.icons}>
            <Link className={styles.link} to={"/"}>
              <HomeIcon className={styles.homeButton}/>
            </Link>
          </button>
          <button className={styles.icons}>
            <MessageIcon />
          </button>
          <BasicPopover notification={allNotifications} />
          <button className={styles.icons} onClick={handleClick}>
            <AccountCircleSharpIcon />
          </button>
        </div>
      </div>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Link to={"/MyProfile"}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to={"/login"}>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default Navigation;
