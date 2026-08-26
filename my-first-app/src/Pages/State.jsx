import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function State() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // GET - Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setPosts(data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // POST - Create a post
  const addPost = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Please enter a title and body");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1,
        }),
      });

      const newPost = await response.json();

      setPosts([newPost, ...posts]);

      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // PUT - Update a post
  const updatePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: "Updated Post",
          body: "This post has been updated.",
          userId: 1,
        }),
      });

      const updatedPost = await response.json();

      setPosts(
        posts.map((post) =>
          post.id === id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // DELETE - Delete a post
  const deletePost = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h1>JSONPlaceholder CRUD</h1>

      {/* CREATE */}
      <form onSubmit={addPost}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button type="submit">Add Post</button>
      </form>

      <hr />

      {/* READ */}
      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>

          {/* UPDATE */}
          <button onClick={() => updatePost(post.id)}>
            Update
          </button>

          {/* DELETE */}
          <button onClick={() => deletePost(post.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default State;