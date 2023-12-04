import { useCallback, useState } from "react";
import { api } from "../api/axios";
import { Link, redirect, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    },
    [user]
  );

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await api.post("/users/", user);
      if (response.status == 201) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={registerUser}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        alignItems: "center",
        gap: 5,
        width: "300px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" onChange={handleInputChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={handleInputChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="first_name" onChange={handleInputChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="last_name" onChange={handleInputChange} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleInputChange} />
      </div>
      {/* <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleInputChange}
        />
      </div> */}
      <button
        type="submit"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 10,
        }}
      >
        Sign Up
      </button>
      <p>
        Already have an account? <Link to="/">Sign In</Link>
      </p>
    </form>
  );
}

export default SignUp;
