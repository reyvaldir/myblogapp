// Import necessary hooks and libraries
import { useState } from "react";
import { useFormik } from "formik"; // Form handling library
import * as Yup from "yup"; // Form validation library
import axios from "axios"; // HTTP client library
import { toast } from "sonner"; // Toast notifications

// Import UI components from shadcn/ui
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define the structure of a Post
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define props for CreatePostDialog component
interface CreatePostDialogProps {
  onPostCreated: (post: Post) => void; // Callback function when a post is created
}

export function CreatePostDialog({ onPostCreated }: CreatePostDialogProps) {
  // State to control dialog open/close
  const [open, setOpen] = useState(false);

  // Initialize formik for form handling
  const formik = useFormik({
    // Initial form values
    initialValues: {
      title: "",
      body: "",
    },
    // Validation schema using Yup
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      body: Yup.string().required("Content is required"),
    }),
    // Form submission handler
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send POST request to API
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            ...values,
            userId: 1, // Hardcoded userId for demo
          }
        );

        // Notify parent component of new post
        onPostCreated(response.data);
        toast.success("Post created successfully!");

        // Reset form and close dialog on success
        formik.resetForm();
        setOpen(false);
      } catch (error) {
        console.error("Error creating post:", error);
        toast.error("Error creating post. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    // Dialog component with controlled open state
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button to trigger dialog */}
      <DialogTrigger asChild>
        <Button>Create New Post</Button>
      </DialogTrigger>
      {/* Dialog content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        {/* Form with Formik integration */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {formik.errors.title && formik.touched.title && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formik.errors.title}</AlertDescription>
            </Alert>
          )}
          {formik.errors.body && formik.touched.body && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formik.errors.body}</AlertDescription>
            </Alert>
          )}
          {/* Title input field */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
          </div>
          {/* Content input field */}
          <div>
            <Label htmlFor="body">Content</Label>
            <Textarea
              id="body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
          </div>
          {/* Submit button */}
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
