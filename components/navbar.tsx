"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./toogle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

const MainNavbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useUser();
  return (
    <div>
      {/* Desktop */}
      <div className="hidden sm:flex sm:justify-between sm:items-center sm:w-full sm:mb-2 sm:px-4 sm:px-12 py-4 border-b">
        <Link href={"/"}>
          <h4 className="text-2xl font-semibold">PROMPTS</h4>
        </Link>

        <div className="flex space-x-8">
          <Button
            className="flex items-center gap-x-2 bg-gradient-to-l from-cyan-400 to-fuchsia-600"
            onClick={() => router.push("/create-prompt")}
          >
            <Plus />
            <span>Create</span>
          </Button>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:hidden sticky top-0 flex justify-between items-center w-full mb-2 px-4 sm:px-12 py-4 border-b">
        <ModeToggle />
        <Link href={"/"}>
          <h4 className="text-2xl font-semibold">PROMPTS</h4>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="text-center">Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserButton afterSignOutUrl="/" />
              <span className="ml-6 text-lg font-semibold">
                {user.user?.fullName}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="w-8 h-8 mr-2" />
              <Link href={"/create-prompt"} className="ml-4 text-lg font-semibold">
                Create Prompt
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MainNavbar;
// onClick={() => router.push("/create-prompt")}
