import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import styles from "./Post.module.css";
import CommentWrapper from "../Comment/CommentWrapper";


const Post = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.postHeader}>
          <div className={styles.icon}>
            <AccountCircleIcon fontSize="inherit" />
          </div>
          <div className={styles.profiledata}>
            <div>Tikesh@22</div>
            <div>a few seconds ago</div>
          </div>
        </div>
        <div>
          <p className={styles.postTitle}>Peaceful Nature</p>
        </div>
        <div className={styles.image}>
          <img
            className={styles.image}
            src="https://wallpapercave.com/wp/7OuTFOg.jpg"
            alt="NatureImage"
          />
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.likeCommentShare}>
            <div>
              <FavoriteBorderIcon />
            </div>
            <div>
              <CommentIcon />
            </div>
            <div>
              <SendIcon />
            </div>
          </div>
          <div className={styles.savedIcon}>
            <div>
              <TurnedInNotIcon />
            </div>
          </div>
        </div>
        <div>
          <CommentWrapper />
        </div>
      </div>
    </div>
  );
};

export default Post;
