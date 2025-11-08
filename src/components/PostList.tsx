// Import UI components from shadcn/ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the structure of a Post object
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define props for PostList component
interface PostListProps {
  posts: Post[]; // Array of posts to display
}

// PostList component to display a grid of posts
export function PostList({ posts }: PostListProps) {
  return (
    // Container with responsive grid layout
    // gap-4: spacing between cards
    // p-4: padding around the grid
    // md:grid-cols-2: 2 columns on medium screens
    // lg:grid-cols-3: 3 columns on large screens
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Map through posts array to create cards */}
      {posts.map((post) => (
        // Card component for each post
        // key: unique identifier for React's reconciliation
        // h-full: make all cards same height
        <Card key={post.id} className="h-full">
          <CardHeader>
            {/* Post title with line clamp for consistent height */}
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Post body with line clamp to prevent long text */}
            <CardDescription className="line-clamp-3">
              {post.body}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
