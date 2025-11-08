// Import necessary hooks and libraries
import { useState } from "react";
import { useFormik } from "formik"; // Form handling library
import * as Yup from "yup"; // Form validation library
import axios from "axios"; // HTTP client library

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
    onSubmit: async (values) => {
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

        // Reset form and close dialog on success
        formik.resetForm();
        setOpen(false);
      } catch (error) {
        console.error("Error creating post:", error);
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
          {/* Title input field */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* Show error message if title field is touched and has error */}
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>
          {/* Content input field */}
          <div>
            <Label htmlFor="body">Content</Label>
            <Input
              id="body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* Show error message if body field is touched and has error */}
            {formik.touched.body && formik.errors.body && (
              <p className="text-sm text-red-500">{formik.errors.body}</p>
            )}
          </div>
          {/* Submit button */}
          <Button type="submit">Create Post</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
