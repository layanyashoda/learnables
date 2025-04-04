import Link from "next/link";

import { Button } from "@/components/ui/button";
import BookForm from "@/components/admin/forms/ProductForm";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/products">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};

export default Page;
