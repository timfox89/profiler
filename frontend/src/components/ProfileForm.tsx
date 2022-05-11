import Button from "@mui/material/Button";
import CustomTextField from "./CustomTextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Post } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/ProfileForm.scss";

const ProfileForm = () => {
  type Errors = {
    usernameError: boolean;
  };

  type Inputs = {
    username: string;
  };

  const [errors, setErrors] = useState<Errors>({
    usernameError: false
  });

  const [input, setInput] = useState<Inputs>({
    username: "",
  });

  const [profile, setProfile] = useState<any>({});

  const fetchProfile = async () => {
    const response = await Post("/githubProfile", {
      username: input.username,
    });
    if (response.message) {
      toast("Profile not found");
      setProfile({});
      return;
    }
    setProfile(response);
  };

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!input.username) {
      toast("Username is required");
      setErrors({
        usernameError: true
      });
      return;
    }
    fetchProfile();
  };

  return (
    <div className="profile-form">
      <Typography variant={"h2"}>GitHub Profiler</Typography>
      <form onSubmit={handleSubmit}>
        <fieldset className="outerFieldset">
          <label className="outerLabel">github.com/</label>
          <CustomTextField
            changeHandler={handleChange}
            label={"Username"}
            name={"username"}
            className={errors.usernameError ? "error" : ""}
          />
          <Button
            type={"submit"}
            variant="contained"
          >
            Get Profile
          </Button>
        </fieldset>
      </form>
      {profile.profileImg && (
        <div className="profileData show">
          <Typography variant={"h3"}>{profile.name}</Typography>
          <img src={profile.profileImg} alt={profile.name} />
          <Typography variant={"h4"}>Stars: {profile.stars}</Typography>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProfileForm;
