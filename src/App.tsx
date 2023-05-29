import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import SignUpForm from "./Components/SignInForm/SignInForm";
import LoginForm from "./Components/LogInForm/LogInForm";
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuggestionProfile from "./Components/HomePage/suggestionProfile/SuggestionProfile";
import Profile from "./Components/HomePage/Profile/Profile";
import { fetchUserLoggedInUserDetails } from "./Actions/UserDetailsAction/UserDetailsAction";

const App: React.FC = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchUserLoggedInUserDetails());
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          {/* <Route path="/suggestions" element={<SuggestionProfile />} /> */}
          <Route path="/MyProfile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
