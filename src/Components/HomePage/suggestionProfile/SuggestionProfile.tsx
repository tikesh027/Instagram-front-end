import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "../suggestionProfile/SuggestionProfile.module.css";
import { TRecommendation } from "../HomePage";

type SuggestionProfileProps = TRecommendation;

const SuggestionProfile: React.FC<SuggestionProfileProps> = (props) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.icon}>
          {/* <button className={styles.profileIcon}>
            <AccountCircleIcon fontSize="inherit"/>
          </button> */}
          <img src={props.avatar} alt={props.fullname} />
        </div>
        <div className={styles.title}>
          <p className={styles.user}>{props.username}</p>
          <p className={styles.user}>{props.fullname}</p>
        </div>
        <div className={styles.follow}>
          <button className={styles.followButton}>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionProfile;
