"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./toogle";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import MobileNav from "./mobilenav";

const MainNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      {/* Desktop */}
      <div className="hidden sm:flex sm:justify-between sm:items-center sm:w-full sm:mb-2 sm:px-4 sm:px-12 py-4 border-b">
        <div className="flex items-center">
          <Link href={"/"}>
            <h4 className="text-2xl font-semibold">PROMPTS</h4>
          </Link>
          <div className="relative flex gap-2 ml-10">
            <Link
              href={"/prompt-optimization"}
              className={cn(
                "text-sm",
                pathname === "/prompt-optimization" ? "text-yellow-400" : ""
              )}
            >
              Prompt opt
            </Link>
            <Badge variant="outline" className="text-xs border-green-800">
              New
            </Badge>
          </div>
        </div>

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
      <MobileNav />
    </div>
  );
};

export default MainNavbar;
