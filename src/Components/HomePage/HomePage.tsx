import React, { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import styles from "./HomePage.module.css";
import SuggestionProfile from "./suggestionProfile/SuggestionProfile";
import { Box, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Profile/Post/Post";
import { TStore } from "../../Store/store";
import axios from "axios";
import { BASE_URL } from "../../Constant/Constant";

const style = {
  position: "absolute" as "absolute",
  top: "55%",
  left: "74%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
  padding: 5,
};

export type TRecommendation = {
  _id: string;
  avatar: string;
  fullname: string;
  username: string;
};

export type TPost = {
  _id: string;
  comment: string[];
  content: string;
  image: string[];
  like: string[];
  createdAt: string;
  user?: {
    fullname: string;
    username: string;
    _id: string;
    avatar: string;
  };
};

const HomePage = () => {
  const user: any = useSelector<TStore>((state) => state.User);
  const [userRecommendation, setUserRecommendation] = useState<
    TRecommendation[]
  >([]);
  const [allPosts, setAllPosts] = useState<TPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllRecommendations = async () => {
    const accessToken = user?.login?.data?.access_token;
    if (!accessToken) return;
    try {
      const data = await axios.get(`${BASE_URL}/search`, {
        headers: {
          "X-Authorization": accessToken,
        },
      });
      setUserRecommendation(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPosts = async () => {
    const accessToken = user?.login?.data?.access_token;
    if (!accessToken) return;
    try {
      const data = await axios.get(`${BASE_URL}/posts`, {
        headers: {
          "X-Authorization": accessToken,
        },
      });
      const postsArray = data.data?.post;
      const posts: TPost[] = [];
      if (postsArray.length) {
        postsArray.forEach((item: any) => {
          posts.push({
            _id: item._id,
            comment: item.comment,
            content: item.content,
            image: item.image,
            like: item.like,
            createdAt: item.createdAt,
            user: {
              _id: item.user?._id,
              fullname: item.user?.fullname,
              username: item.user?.username,
              avatar: item.user?.avatar,
            },
          });
        });
      }
      setAllPosts(posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRecommendations();
    getAllPosts();
  }, []);

  const handlePostContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPostContent(event.target.value);
  };

  const onSubmitNewPost = async () => {
    const accessToken = user?.login?.data?.access_token;
    if (!accessToken) return;
    try {
      if (newPostContent === "") {
        return;
      } else {
        const newPostData = {
          content: newPostContent,
          image: [],
        };

        const data = await axios.post(`${BASE_URL}/posts`, newPostData, {
          headers: {
            "X-Authorization": accessToken,
          },
        });
        console.log(data.data);
        handleClose();
        getAllPosts();
      }
    } catch (error) {
      console.log(error);
    }
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
          {allPosts.map((post) => (
            <Post
              reFreshPost={getAllPosts}
              openEditModal={handleOpen}
              _id={post._id}
              key={post._id}
              comment={post.comment}
              content={post.content}
              image={post.image}
              like={post.like}
              user={post.user}
              createdAt={post.createdAt}
            />
          ))}
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
              {userRecommendation.map((item) => (
                <SuggestionProfile
                  _id={item._id}
                  avatar={item.avatar}
                  fullname={item.fullname}
                  username={item.username}
                  key={item._id}
                />
              ))}
            </div>
            <div></div>
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
            <Typography
              id="modal-modal-description"
              sx={{ mb: 30, mt: 2, ml: 5, mr: 5 }}
            >
              <input
                className={styles.postTextField}
                onChange={handlePostContent}
                type="text"
                placeholder={`Hi, Tikesh@22 Whats on Your Mind ?`}
              />
            </Typography>
            <div className={styles.fileIcons}>
              <PhotoCameraIcon fontSize="inherit" />
              <InsertPhotoIcon fontSize="inherit" />
            </div>
            <div className={styles.postButton}>
              <button
                onClick={onSubmitNewPost}
                className={styles.postButtonIcon}
              >
                Post
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
