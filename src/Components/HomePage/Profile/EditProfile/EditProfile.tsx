import React, { useState } from "react";
import InputWithLabel from "../../../CommonComponents/InputWithLabel/InputWithLabel";
import { useSelector } from "react-redux";
import { TStore } from "../../../../Store/store";
import axios from "axios";
import { BASE_URL } from "../../../../Constant/Constant";
import styles from "./EditProfile.module.css";
import { getAccessTokenFromCookie } from "../../../../Constant/helpers";

type updateForm = {
  value: string;
  error: string;
  isValid: boolean;
};

const EditProfile: React.FC = () => {
  const user: any = useSelector<TStore>((state) => state.User);
  const userData = user?.login?.data?.user;

  const [fullName, setFullName] = useState<updateForm>({
    value: userData.username,
    error: "",
    isValid: true,
  });
  const [avatar, setAvatar] = useState<updateForm>({
    value: userData.avatar,
    error: "",
    isValid: true,
  });
  const [mobileNo, setMobileNo] = useState<updateForm>({
    value: userData.mobile,
    error: "",
    isValid: true,
  });
  const [address, setAddress] = useState<updateForm>({
    value: userData.address,
    error: "",
    isValid: true,
  });
  const [story, setStory] = useState<updateForm>({
    value: userData.story,
    error: "",
    isValid: true,
  });
  const [website, setWebsite] = useState<updateForm>({
    value: userData.website,
    error: "",
    isValid: true,
  });
  const [gender, setGender] = useState<updateForm>({
    value: userData.gender,
    error: "",
    isValid: true,
  });

  const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar({
      error: "",
      value: event.target.value,
      isValid: true,
    });
  };
  const handleMobileNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNo({
      error: "",
      value: event.target.value,
      isValid: true,
    });
  };
  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      error: "",
      value: event.target.value,
      isValid: true,
    });
  };
  const handleStory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStory({
      error: "",
      value: event.target.value,
      isValid: true,
    });
  };
  const handleWebsite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite({
      error: "",
      value: event.target.value,
      isValid: true,
    });
  };
  const handlegender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender({
      error: "",
      value: event.target.value,
      isValid: true,
    });
  };
  const handleFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName({
      error: "",
      value: event.target.value,
      isValid: true,
    });
  };

  const userValidator = () => {
    let validatorFlag = true;

    if (fullName.value === "") {
      setFullName({
        ...fullName,
        isValid: false,
        error: "please fill the username",
      });
      validatorFlag = false;
    }

    if (avatar.value === "") {
      setAvatar({
        ...avatar,
        isValid: false,
        error: "please set an avatar",
      });
      validatorFlag = false;
    }
    if (address.value === "") {
      setAddress({
        ...address,
        isValid: false,
        error: "please fill the Address",
      });
      validatorFlag = false;
    }
    if (website.value === "") {
      setWebsite({
        ...website,
        isValid: false,
        error: "please fill the website",
      });
      validatorFlag = false;
    }
    if (gender.value === "") {
      setGender({
        ...gender,
        isValid: false,
        error: "please Choose Your gender",
      });
      validatorFlag = false;
    }
    if (mobileNo.value === "") {
      setMobileNo({
        ...mobileNo,
        isValid: false,
        error: "please fill Your Mobile-Number",
      });
      validatorFlag = false;
    }
    return validatorFlag;
  };

  const editUserProfile = async () => {
    if (!userValidator()) return;
    const accessToken = getAccessTokenFromCookie();
    if (!accessToken) return;
    const userData = {
      avatar: avatar.value,
      fullname: fullName.value,
      mobile: mobileNo.value,
      address: address.value,
      story: story.value,
      website: website.value,
      gender: gender.value,
    };
    try {
      const data = await axios.post(`${BASE_URL}/user`, userData,{
        headers: {
          "X-Authorization": accessToken,
        },
      });
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="styles.editProfileContainer">
      <div>
        <InputWithLabel
          inputType="text"
          label="FullName"
          value={fullName.value}
          onChange={handleFullName}
        />
        <InputWithLabel
          inputType="text"
          label="Address"
          value={address.value}
          onChange={handleAddress}
        />
        <InputWithLabel
          inputType="text"
          label="Mobile no"
          value={mobileNo.value}
          onChange={handleMobileNo}
        />
        <InputWithLabel
          inputType="text"
          label="Avatar"
          value={avatar.value}
          onChange={handleAvatar}
        />
        <InputWithLabel
          inputType="text"
          label="Website"
          value={website.value}
          onChange={handleWebsite}
        />
        <InputWithLabel
          inputType="text"
          label="Gender"
          value={gender.value}
          onChange={handlegender}
        />
      </div>
      <div>
        <button onClick={editUserProfile}>submit</button>
      </div>
    </div>
  );
};

export default EditProfile;
