import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./Comment.module.css";
import { Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";
import axios from "axios";
import { useSelector } from "react-redux";
import { TStore } from "../../../../Store/store";
import { BASE_URL } from "../../../../Constant/Constant";

export type TComment = {
  content: string;
  tag: string;
  reply: string[];
  like: string[];
  user: any;
  postId: string;
  postUserId: string;
  key: string;
  _id: string;
  refreshDeleteComment:() => Promise<void>;
}

type CommentProps = TComment & {

};

const Comment: React.FC<CommentProps> = (props) => {
  const user: any = useSelector<TStore>((state) => state.User);
  const [commentText, setCommentText] = useState(props.content);
  const [editComment, setEditComment] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };
  
  const onCommentEditComplete = async () => {
    const accessToken = user?.login?.data?.access_token;
    if(!accessToken) return;
    const userComment = {
      content: commentText
    }
    try{
      const data = await axios.post(`${BASE_URL}/comment/${props._id}`, userComment, {
        headers: {
          "X-Authorization": accessToken,
        },
      });
      props.refreshDeleteComment();
      console.log(data.data);

    }
    catch(error){
      console.log(error);
    }
    setEditComment(false);
  };
  

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onEditComment = () => {
    setEditComment(true);
    handleClose();
    
  }
  const onDelete = async () => {
    const accessToken = user?.login?.data?.access_token;
    if(!accessToken) return;
    try{
      const data = await axios.delete(`${BASE_URL}/comment/${props._id}`, {
        headers: {
          "X-Authorization": accessToken,
        },
      });
      props.refreshDeleteComment();
      console.log(data.data);
    }
    catch(error){
      console.log(error);
    }
    handleClose();
  }


  return (
    <div>
      <div className={styles.profile}>
        <div>
          <AccountCircleIcon />
        </div>
        <div>{props.user?.username}</div>
      </div>
      <div className={styles.commentWrapper}>
        <div className={styles.comments}>
          <div>
            <div>
              {editComment ? (
                <input
                  value={commentText}
                  onChange={handleCommentInput}
                  onBlur={onCommentEditComplete}
                  type="text"
                />
              ) : (
                commentText
              )}
            </div>
            <div className={styles.likeReply}>
              <div>3 seconds ago</div>
              <div>Like</div>
              <div>Reply</div>
            </div>
          </div>
          {/* <div onClick={() => setEditComment(true)} className={styles.edit}>
            <MoreVertIcon />
          </div> */}
          <div onClick={handleClick} className={styles.edit}>
            <MoreVertIcon />
          </div>
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
          <MenuItem onClick={onEditComment}>Edit Comment</MenuItem>
          <MenuItem onClick={onDelete}>Remove Comment</MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default Comment;
