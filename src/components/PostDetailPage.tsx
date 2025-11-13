import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "sonner";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostDetailPageProps = {
  posts: Post[];
};

export function PostDetailPage({ posts }: PostDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentEmail, setNewCommentEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const localPost = posts.find((p) => p.id === Number(id));
        if (localPost) {
          setPost(localPost);
          const commentsResponse = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
          );
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        } else {
          const [postResponse, commentsResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
          ]);
          const postData = await postResponse.json();
          const commentsData = await commentsResponse.json();
          setPost(postData);
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, posts]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newCommentName.trim() || !newCommentEmail.trim())
      return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        {
          method: "POST",
          body: JSON.stringify({
            body: newComment,
            email: newCommentEmail,
            name: newCommentName,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const createdComment = await response.json();
      setComments([createdComment, ...comments]);
      setNewComment("");
      setNewCommentName("");
      setNewCommentEmail("");
      toast.success("Comment posted successfully!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-[70%] px-4 y-8">
      <h2 className="text-2xl font-bold mb-4">Post Details</h2>
      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      ) : post ? (
        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
          </CardContent>
        </Card>
      ) : (
        <p>Post not found.</p>
      )}

      <div className="mt-8">
        <form
          onSubmit={handleCommentSubmit}
          className="mb-8 space-y-4 bg-gray-100 p-4 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Leave a Comments</h2>
          <Input
            value={newCommentName}
            onChange={(e) => setNewCommentName(e.target.value)}
            placeholder="Your name..."
            type="text"
            disabled={isSubmitting}
          />
          <Input
            value={newCommentEmail}
            onChange={(e) => setNewCommentEmail(e.target.value)}
            placeholder="Your email..."
            type="email"
            disabled={isSubmitting}
          />
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !newComment.trim() ||
              !newCommentName.trim() ||
              !newCommentEmail.trim()
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>

        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader>
                  <p className="font-bold">{comment.name}</p>
                  <p className="text-sm text-gray-500">{comment.email}</p>
                </CardHeader>
                <CardContent>
                  <p>{comment.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
