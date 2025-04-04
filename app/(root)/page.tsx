import { desc } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(11)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
