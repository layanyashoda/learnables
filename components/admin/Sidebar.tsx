"use client";

import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

import Avatar from "../Avatar";
import { cn } from "@/lib/utils";
import { adminSideBarLinks } from "@/constants";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            height={37}
            width={37}
            alt="site-logo"
          />
          <h1>Learnables</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link key={link.route} href={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""}  object-contain`}
                    />
                  </div>

                  <p
                    className={cn(isSelected ? "text-white" : "text-dark-200")}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user">
        <Avatar name={session?.user?.name || ""} size="md" />

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
