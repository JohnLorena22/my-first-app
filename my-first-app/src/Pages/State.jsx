import { useEffect, useState } from "react";

function State() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get users from JSONPlaceholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // Add a new mock user
  const addUser = () => {
    const newUser = {
      name: "New User",
      username: "newuser",
      email: "newuser@example.com",
    };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the returned user to our React state
        setUsers((currentUsers) => [...currentUsers, data]);
      });
  };

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  return (
    <div>
      <h1>Mock Users</h1>

      <button onClick={addUser}>Add Mock User</button>

      <hr />

      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>City: {user.address?.city}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default State;