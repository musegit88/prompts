import React, { useState } from "react";
import { ModeToggle } from "./toogle";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Gem, Menu, Plus } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const pathname = usePathname();
  return (
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
            <Link
              href={"/create-prompt"}
              className={cn(
                "ml-4 text-lg font-semibold",
                pathname === "/create-prompt" ? "text-yellow-400" : ""
              )}
            >
              Create Prompt
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Gem className="w-8 h-8 mr-2" />
            <Link
              href={"/prompt-optimization"}
              className={cn(
                "ml-4 text-lg font-semibold",
                pathname === "/prompt-optimization" ? "text-yellow-400" : ""
              )}
            >
              Prompt opt
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
