import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = ({ authenticateUser }) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    tagline: "",
    imageName: "",
    imageData: ""
  });

  const [errorData, setErrorData] = useState({ errors: null });

  const {
    name,
    email,
    password,
    passwordConfirm,
    tagline,
    imageName,
    imageData
  } = userData;

  const { errors } = errorData;

  const onChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const onPost = e => {
    const files = e.target.files;
    const file = files[0];
    console.log(file);
    const name = e.target.files[0].name;
    console.log(name);

    setUserData({
      ...userData,
      imageData: file,
      imageName: name
    });
  };

  const registerUser = async () => {
    if (password !== passwordConfirm) {
      alert("passwords do not match");
    } else {
      const newUser = {
        name: name,
        email: email,
        password: password,
        tagline: tagline,
        imageName: imageName,
        imageData: imageData
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        const body = JSON.stringify(newUser);
        const res = await axios.post(
          "http://localhost:5000/api/users",
          body,
          config
        );

        // Store user data and redirect
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("tagline", tagline);
        history.push("/");
        console.log(res.data);
        console.log(imageName);
      } catch (error) {
        // Clear user data and set errors
        localStorage.removeItem("token");

        setErrorData({
          ...errors,
          errors: error.response.data.errors
        });
      }
      authenticateUser();
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Confirm Password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={e => onChange(e)}
        />
      </div>

      <h5> Add a Profile Picture:</h5>
      <div className="input-group mb-3">
        <div className="custom-file">
          <input
            type="file"
            name="Profile Picture"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describeby="inputGroupFile01"
            accept="image/png, image/jpeg"
            placeholder="Upload a Profile Picture"
            onChange={e => onPost(e)}
          />
          <label
            className="custome-file-label"
            htmlFor="inputGroupFile01"
          ></label>
        </div>
      </div>

      <h5> Add a Tagline:</h5>
      <input
        type="text"
        name="tagline"
        placeholder="Anything for a Price"
        value={tagline}
        onChange={e => onChange(e)}
      />

      <div>
        <button onClick={() => registerUser()}>Register</button>
      </div>
      <div>
        {errors && errors.map(error => <div key={error.msg}>{error.msg}</div>)}
      </div>
    </div>
  );
};

export default Register;
