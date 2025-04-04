"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ColorPicker from "../ColorPicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/hooks/use-toast";
import { bookSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBook, editBook } from "@/lib/admin/actions/book";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type = "create", ...book }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book.title || "",
      author: book.author || "",
      genre: book.genre || "",
      rating: book.rating || 1,
      totalCopies: book.totalCopies || 1,
      coverUrl: book.coverUrl || "",
      coverColor: book.coverColor || "#012B48",
      description: book.description || "",
      videoUrl: book.videoUrl || "",
      summary: book.summary || "",
    },
  });

  async function onSubmit(values: z.infer<typeof bookSchema>) {
    let result;
    if (type === "create") {
      result = await createBook(values);
    } else if (type === "update") {
      result = await editBook({
        bookId: book.id!,
        ...values,
      });
    }

    if (result?.success) {
      toast({
        title: "Success",
        description:
          type === "create"
            ? "Book created successfully."
            : "Book updated successfully.",
      });

      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast({
        title: "Error",
        description: result?.error,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the book title"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the author name"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the genre of the book"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Rating
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the rating of the book"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalCopies"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Total number of books
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the total number of books"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a cover image"
                  folder="books/covers"
                  variant="light"
                  value={field.value}
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief description of the book"
                  {...field}
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Video
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/mp4,video/x-m4v,video/*"
                  placeholder="Upload a video"
                  folder="books/videos"
                  variant="light"
                  value={field.value}
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief summary of the book"
                  {...field}
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn">
          {type === "create" ? "Add Book" : "Update Book"}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
