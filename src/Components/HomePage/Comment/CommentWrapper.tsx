import React from "react";
import Comment from "./Comment";
import styles from "./Comment.module.css";

const CommentWrapper = () => {
  return (
    <div>
      <Comment />
      <Comment />
      <Comment />
      <div className={styles.commentInputContainer}>
        <input
          className={styles.commentInput}
          type="text"
          placeholder="Add Your Comments...."
        />
        <button className={styles.commentButton}>Comments</button>
      </div>
    </div>
  );
};

export default CommentWrapper;
