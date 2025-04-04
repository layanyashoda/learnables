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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/hooks/use-toast";
import { productSchema } from "@/lib/validations"; // Replace with the schema for products
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, editProduct } from "@/lib/admin/actions/product"; // Replace with product-related actions

interface Props extends Partial<Product> {
  type?: "create" | "update";
}

const ProductForm = ({ type = "create", ...product }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name || "",
      category: product.category || "",
      price: product.price || 0,
      totalStock: product.totalStock || 1,
      description: product.description || "",
      imageUrl: product.imageUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    let result;
    if (type === "create") {
      result = await createProduct(values);
    } else if (type === "update") {
      result = await editProduct({
        productId: product.id!,
        ...values,
      });
    }

    if (result?.success) {
      toast({
        title: "Success",
        description:
          type === "create"
            ? "Product added successfully."
            : "Product updated successfully.",
      });

      router.push(`/admin/products/${result.data.id}`);
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
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the product name"
                  {...field}
                  className="product-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Category
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the category"
                  {...field}
                  className="product-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the price"
                    {...field}
                    className="product-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalStock"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Stock
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter the stock quantity"
                    {...field}
                    className="product-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Thumbnail Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a thumbnail image"
                  folder="products/thumbnails"
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
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Product Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief description of the product"
                  {...field}
                  rows={10}
                  className="product-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="product-form_btn">
          {type === "create" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
