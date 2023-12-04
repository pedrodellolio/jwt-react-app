import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function SignIn() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    },
    [user]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await signIn(user.username, user.password);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
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
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleInputChange} />
      </div>
      <button
        type="submit"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 10,
        }}
      >
        Sign In
      </button>
      <p>
        First time here? <Link to="/signUp">Sign Up</Link>
      </p>
    </form>
  );
}

export default SignIn;
