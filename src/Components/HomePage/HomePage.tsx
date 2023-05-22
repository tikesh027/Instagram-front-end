import React from "react";
import Navigation from "./Navigation/Navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import styles from "./HomePage.module.css";
import SuggestionProfile from "./suggestionProfile/SuggestionProfile";
import { Box, Modal, Typography } from "@mui/material";

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "66%",
    left: "74%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 8,
    padding: 5,
  };
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.postPageContainer}>
          <div className={styles.postPage}>
            <div className={styles.iconSize}>
              <AccountCircleIcon fontSize="inherit" />
            </div>
            <div>
              <button className={styles.buttonBar} onClick={handleOpen}>
                Tikesh What are you Thinking?
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.profile}>
              <div className={styles.iconSize}>
                <AccountCircleIcon fontSize="inherit" />
              </div>
              <div className={styles.profileName}>
                <span>Tikesh@22</span>
                <span>Tikesh Singh</span>
              </div>
            </div>
            <div className={styles.refresh}>
              <h2>Recommendation</h2>
              <div className={styles.refreshIcon}>
                <RefreshIcon />
              </div>
            </div>
            <div>
              <SuggestionProfile />
            </div>
            <div className={styles.suggestion}>
              <SuggestionProfile />
            </div>
            <div className={styles.suggestion}>
              <SuggestionProfile />
            </div>
            <div className={styles.suggestion}>
              <SuggestionProfile />
            </div>
          </div>
        </div>
      </div>
      <div>
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
                  Create Post
                  <hr />
                </Typography>
              </div>
              <div className={styles.cross}>
                <ClearIcon onClick={handleClose} />
              </div>
            </div>
            <Typography id="modal-modal-description" sx={{ mb: 30, mt: 2, ml:5, mr:5 }}>
              Hi, Tikesh@22 Whats on Your Mind ?
            </Typography>
            <div className={styles.fileIcons}>
              <PhotoCameraIcon fontSize="inherit" />
              <InsertPhotoIcon fontSize="inherit" />
            </div>
            <div className={styles.postButton}>
              <button className={styles.postButtonIcon}>Post</button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
