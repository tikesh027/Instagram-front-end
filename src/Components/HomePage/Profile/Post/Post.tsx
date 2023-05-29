import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./Post.module.css";
import CommentWrapper from "../Comment/CommentWrapper";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { TPost } from "../../HomePage";
import { formatDateToRelative, getAccessTokenFromCookie } from "../../../../Constant/helpers";
import { useSelector } from "react-redux";
import axios from 'axios';
import { BASE_URL } from "../../../../Constant/Constant";
import { TStore } from "../../../../Store/store";
import SimpleSlider from "./ImageSlider";


type PostProps = TPost & {
  openEditModal: () => void;
  reFreshPost: () => Promise<void>;
};

const Post: React.FC<PostProps> = (props) => {
  const user: any = useSelector<TStore>((state) => state.User);
  const [liked, setLiked] = useState(false);
  const [likeProcessing, setLikeProcessing] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userId = user?.login?.data?.user?._id;
  // const liked: string | undefined = props.like.find(item => item === userId);

  useEffect(()=>{
   const postLiked: string | undefined = props.like.find(item => item === userId);
   setLiked(Boolean(postLiked));
  },[]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onEdit = () => {
    props.openEditModal();
    handleClose();
    
  }
  const onDelete = () => {
    handleClose();
    deletePost();
  }


  const deletePost = async () => {
    const accessToken = getAccessTokenFromCookie();
    if (!accessToken) return;
    try {
      const data = await axios.delete(`${BASE_URL}/post/${props._id}`, {
        headers: {
          "X-Authorization": accessToken,
        },
      });
      console.log(data.data);
      props.reFreshPost();
    } catch (error) {
      console.log(error);
    }
  }

  const likedPost = async () => {
    const accessToken = getAccessTokenFromCookie();
    if (!accessToken) return;
    try {
      if(liked === false){
        setLikeProcessing(true);
        const data = await axios.get(`${BASE_URL}/post/${props._id}/like`, {
          headers: {
            "X-Authorization": accessToken,
          },
        });
        setLikeProcessing(false);
        setLiked(true);
        console.log(data.data);
      } else {
        setLikeProcessing(true);
        const data = await axios.get(`${BASE_URL}/post/${props._id}/unlike`,{
          headers: {
            "X-Authorization": accessToken,
          },
        });
        setLikeProcessing(false);
        setLiked(false);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.postHeader}>
          <div>
            <div className={styles.icon}>
              <img src={props.user?.avatar} />
            </div>
            <div className={styles.profiledata}>
              <div>{props.user?.username}</div>
              <div>{formatDateToRelative(props.createdAt)}</div>
            </div>
          </div>
          <div>
            <button onClick={handleClick}>
              <MoreHorizIcon />
            </button>
          </div>
        </div>
        <div>
          <p className={styles.postTitle}>{props.content}</p>
        </div>
        <div className={styles.image}>
          <SimpleSlider>
          {props.image.map((image) => (
            <img className={styles.image} src={`${BASE_URL}/${image}`} alt="" />
          ))}
          </SimpleSlider>
          
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.likeCommentShare}>
            <button disabled={likeProcessing} onClick={likedPost}>
              <FavoriteBorderIcon />
            </button>
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
          <CommentWrapper postId={props._id} comment={props.comment} refreshComments={props.reFreshPost}/>
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
        <div>
          <MenuItem onClick={onEdit}>Edit Profile</MenuItem>
          <MenuItem onClick={onDelete}>Remove Post</MenuItem>
          <MenuItem onClick={handleClose}>CopyLink</MenuItem>
        </div>
      </Menu>
      
    </div>
  );
};

export default Post;
