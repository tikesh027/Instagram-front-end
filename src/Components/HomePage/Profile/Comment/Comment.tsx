import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./Comment.module.css";

const Comment = () => {
  const [commentText, setCommentText] = useState("Looks Good");
  const [editComment, setEditComment] = useState(false);
  const onCommentEditComplete = () => {
    setEditComment(false);
  };
  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };
  return (
    <div>
      <div className={styles.profile}>
        <div>
          <AccountCircleIcon />
        </div>
        <div>Tikesh@22</div>
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
          <div onClick={() => setEditComment(true)} className={styles.edit}>
            <MoreVertIcon />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Comment;
