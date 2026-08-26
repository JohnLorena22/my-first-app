import React from "react";

const Sidebar = () => {
  return (
    <aside>
      <h2>MyApp</h2>

      <nav>
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
      </nav>
    </aside>
  );
};

export default Sidebar;