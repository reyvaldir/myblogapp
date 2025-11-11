import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { CreatePostDialog } from "./components/CreatePostDialog";
import Header from "./components/Header";
import { PostList } from "./components/PostList";
import { PostDetailPage } from "./components/PostDetailPage"; // Import the new component
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = (newPost: Post) => {
    const postWithId = {
      ...newPost,
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
    };
    setPosts([postWithId, ...posts]);
  };

  return (
    <Router>
      <Header />
      <Toaster />
      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CreatePostDialog onPostCreated={handleAddPost} />
                <PostList posts={posts} loading={loading} />
              </>
            }
          />
          <Route
            path="/posts/:id"
            element={<PostDetailPage posts={posts} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
