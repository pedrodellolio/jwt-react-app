import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";
import { User } from "../models/User";

function Home() {
  const { user } = useAuth();
  const refresh = useRefreshToken();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await api.get("/users/", {
          signal: controller.signal,
        });
        // console.log(response.data.results);
        isMounted && setUsers(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleRefresh = () => {
    if (user) refresh(user.refresh_token);
  };

  return (
    <>
      <p style={{ wordWrap: "break-word" }}>{JSON.stringify(user)}</p>
      <br />
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((u, i) => (
            <li key={i}>{u?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <br />
      <button onClick={handleRefresh}>Refresh</button>
    </>
  );
}

export default Home;
