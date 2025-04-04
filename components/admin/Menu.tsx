"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MenuItem {
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

interface Props {
  label: string;
  initialValue: string;
  items: MenuItem[];
}

const Menu = ({ label, initialValue, items }: Props) => {
  const [activeItem, setActiveItem] = useState(initialValue);

  const handleItemClick = (value: string) => {
    setActiveItem(value);
    console.log(`Clicked: ${value}`);
  };

  const getItemStyle = (item: MenuItem) => {
    return cn(
      "capitalize w-fit text-center text-sm font-medium px-5 py-1 rounded-full",
      item.bgColor,
      item.textColor
    );
  };

  const activeMenuItem =
    items.find((item) => item.value === activeItem) || items[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          getItemStyle(activeMenuItem),
          "outline-none ring-0 focus:ring-0"
        )}
      >
        {activeMenuItem.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-2" />
        {items.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleItemClick(item.value)}
          >
            <p className={cn(getItemStyle(item))}>{item.label}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
