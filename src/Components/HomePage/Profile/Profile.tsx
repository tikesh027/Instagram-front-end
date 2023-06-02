import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import styles from "./Profile.module.css";
import { Box, Modal, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditProfile from "./EditProfile/EditProfile";
import { useSelector } from "react-redux";
import { TStore } from "../../../Store/store";
import StandardImageList from "./ImageGallery";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 10,
  padding: 5,
};

type TabList = "POST" | "SAVED_POST";

const Profile = () => {
  const user: any = useSelector<TStore>((state) => state.loggedInUserDetails);
  const userData = user?.data?.userData;
  const [activeTab, setActiveTab] = useState<TabList>("POST");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleActiveTab = (tab: TabList) => {
    setActiveTab(tab);
  };

  if(user.isLoading){
    return(
      <h1>loading...</h1>
    )
  }

  return (
    <div>
      <Navigation />
      <div className={styles.profilePic}>
        <AccountCircleIcon fontSize="inherit" />
        <div>
          <div className={styles.profileName}>
            <div>{userData.username}</div>
          </div>
          <div className={styles.follow}>
            <div className={styles.following}>
              <div>{userData.follower.length} follower</div>
              <div>{userData.following.length} following</div>
            </div>
            <div className={styles.location}>
              <FmdGoodIcon />
              {userData.address}
            </div>
          </div>
        </div>
        <div className={styles.editProfile}>
          <button onClick={handleOpen} className={styles.editButton}>
            Edit Profile
          </button>
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
            <StandardImageList/>
          </>
        ) : (
          <>
            <h1>Saved Posts</h1>
            <StandardImageList/>
          </>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.modelCloseIcon}>
            <div>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Edit Profile
                <hr />
              </Typography>
            </div>
            
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mb: 10, mt: 2, ml: 5, mr: 5 }}
          >
            <div className={styles.postTextField}>
              <EditProfile />
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
