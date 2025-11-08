// Import necessary dependencies and components
import "./App.css";
import { CreatePostDialog } from "./components/CreatePostDialog";
import Header from "./components/Header";
import { PostList } from "./components/PostList";
import { ViewPostDialog } from "./components/ViewPostDialog";
import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of our Post data using TypeScript interface
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  // Initialize state for storing posts array and loading status
  // posts: stores all blog posts
  // loading: tracks the loading state while fetching data
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch posts when component mounts
  useEffect(() => {
    // Define async function to fetch posts from API
    const fetchPosts = async () => {
      try {
        // Make GET request to JSONPlaceholder API
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        // Update posts state with fetched data
        setPosts(response.data);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error("Error fetching posts:", error);
      } finally {
        // Set loading to false regardless of success/failure
        setLoading(false);
      }
    };

    // Call the fetch function when component mounts
    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  // Handler function for adding new posts
  // Adds the new post to the beginning of the posts array
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleAddPost = (newPost: Post) => {
    // Add new post with an incremented ID
    const postWithId = {
      ...newPost,
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
    };
    setPosts([postWithId, ...posts]);
  };

  // Main component render
  return (
    <>
      {/* Header component for the blog */}
      <Header />

      <div className="p-4">
        {/* Dialog component for creating new posts */}
        <CreatePostDialog onPostCreated={handleAddPost} />

        {/* Component to display all posts */}
        <PostList
          posts={posts}
          loading={loading}
          onPostSelect={(post) => {
            setSelectedPostId(post.id);
            setViewDialogOpen(true);
          }}
        />

        {/* Dialog for viewing posts */}
        <ViewPostDialog
          postId={selectedPostId}
          isOpen={viewDialogOpen}
          onClose={() => {
            setViewDialogOpen(false);
          }}
        />
      </div>
    </>
  );
}

// Export the App component as the default export
export default App;
