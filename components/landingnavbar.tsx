"use client";
import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./toogle";

const Navbar = () => {
  return (
    <>
      <div className="hidden sm:flex sm:justify-between sm:items-center sm:w-full sm:mb-20 ">
        <Link href={"/"}>
          <h4 className="text-2xl font-semibold">PROMPTS</h4>
        </Link>
        <div className="flex space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="sm:hidden flex justify-between items-center w-full mb-20 ">
        <ModeToggle />
        <Link href={"/"}>
          <h4 className="text-2xl font-semibold">PROMPTS</h4>
        </Link>
        <div className="flex space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
