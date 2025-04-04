"use client";

import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";

import AuthForm from "@/components/forms/AuthForm";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullname: "",
      email: "",
      universityId: "",
      password: "",
      universityCard: "",
    }}
    onSubmit={signUp}
  />
);

export default Page;
