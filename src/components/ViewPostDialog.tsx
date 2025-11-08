import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ViewPostDialogProps {
  postId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewPostDialog({
  postId,
  isOpen,
  onClose,
}: ViewPostDialogProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId && isOpen) {
      setLoading(true);
      setPost(null); // Clear previous post
      axios
        .get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
          setPost(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          setPost(null); // Ensure post is null on error
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [postId, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{post?.title || "Post not found"}</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">{post?.body}</p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
