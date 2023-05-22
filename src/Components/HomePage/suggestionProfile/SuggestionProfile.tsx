import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "../suggestionProfile/SuggestionProfile.module.css";

const SuggestionProfile = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.icon}>
          <button className={styles.profileIcon}>
            <AccountCircleIcon fontSize="inherit"/>
          </button>
        </div>
        <div className={styles.title}>
          <p className={styles.user}>Tikesh@22</p>
          <p className={styles.user}>Tikesh Singh</p>
        </div>
        <div className={styles.follow}>
          <button className={styles.followButton}>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionProfile;
