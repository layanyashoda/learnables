import Link from "next/link";

import UserCard from "../UserCard";
import { Button } from "@/components/ui/button";

import { getUsers } from "@/lib/admin/actions/user";

const AccountRequests = async () => {
  const { data: latestUsers } = await getUsers({
    sort: "newest",
    page: 1,
    limit: 6,
  });

  if (!latestUsers) {
    throw new Error("Failed to fetch latest users");
  }

  return (
    <section className="bg-white p-4 rounded-xl">
      <div className="flex justify-between gap-3 items-center">
        <h3 className="font-semibold text-dark-400  text-xl">
          Account Requests
        </h3>

        <Button asChild className="view-btn">
          <Link href="/admin/account-requests">View All</Link>
        </Button>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {latestUsers?.length! > 0 &&
          latestUsers?.map(({ user }) => (
            <UserCard key={user.id} name={user.fullname} email={user.email} />
          ))}
      </div>
    </section>
  );
};

export default AccountRequests;
