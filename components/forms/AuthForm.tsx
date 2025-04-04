"use client";

import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import Link from "next/link";
import { ZodType } from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUpload from "../FileUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";

import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  type,
}: Props<T>) => {
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log("FORM DATA", data);

    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn
          ? "Welcome Back to Learnables "
          : "Create Your Learnables Account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder="Upload a file"
                        folder="ids"
                        variant="dark"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {!isSignIn ? "No account yet? " : "Have an account already? "}

        <Link
          href={!isSignIn ? "/sign-in" : "/sign-up"}
          className="font-bold text-primary"
        >
          {!isSignIn ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
