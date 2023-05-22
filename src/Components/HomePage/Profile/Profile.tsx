import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import styles from "./Profile.module.css";

type TabList = "POST" | "SAVED_POST";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<TabList>("POST");
  const handleActiveTab = (tab: TabList) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <Navigation />
      <div className={styles.profilePic}>
        <AccountCircleIcon fontSize="inherit" />
        <div>
          <div className={styles.profileName}>
            <div>Tikesh_Singh</div>
          </div>
          <div className={styles.follow}>
            <div className={styles.following}>
              <div>2 Followers</div>
              <div>2 Following</div>
            </div>
            <div className={styles.location}>
              <FmdGoodIcon />
              Raipur Chhattisgarh 492013
            </div>
          </div>
        </div>
        <div className={styles.editProfile}>
            <button className={styles.editButton}>Edit Profile</button>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => handleActiveTab("POST")}
          className={`${activeTab === "POST" ? styles.active : null}`}
        >
          Posts
        </button>
        <button
          onClick={() => handleActiveTab("SAVED_POST")}
          className={`${activeTab === "SAVED_POST" ? styles.active : null}`}
        >
          Saved
        </button>
      </div>

      <div>
        {activeTab === "POST" ? (
          <>
            <h1>Posts</h1>
            {/* <PostGallery 
                imageList={[
                    "imageUrl1",
                    "imageURL 2"
                ]}
            /> */}
          </>
        ) : (
          <>
            <h1>Saved Posts</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
