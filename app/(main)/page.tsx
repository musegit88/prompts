"use client";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MouseEventHandler } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import SectionItem from "@/components/sections";
import ChevronDown from "@/components/chevron-down";
import MobileLandingContent from "@/components/mobilelanding-content";

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const current = useUser();
  const router = useRouter();

  const handleClick:
    | MouseEventHandler<HTMLButtonElement>
    | undefined = async () => {
    if (!isSignedIn) {
      router.push("/sign-up");
    }
    if (isSignedIn) {
      try {
        await axios.post("/api/auth", {
          userId: current.user?.id,
          name: current.user?.fullName,
          email: current.user?.emailAddresses
            .map((item) => item.emailAddress)
            .toString(),
          image: current.user?.imageUrl,
        });
        router.push("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="">
      {/* Mobile */}
      <section className="sm:hidden flex flex-col justify-center items-center w-full">
        <Header
          title="Discover & Share"
          titleBottom="AI-Powered Prompts"
          description=" Prompts is open-source AI-Powered prompting tool for modern world
        discover, create and share creative prompts"
          gradient="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        />
        <Button className="rounded-full mt-8 w-[200px]" onClick={handleClick}>
          {isSignedIn ? "Discover prompts" : "Get started"}
        </Button>
     <MobileLandingContent/>
      </section>
      {/*  */}
      {/* Desktop */}
      <div className="flex flex-col">
        <section className="relative max-[640px]:hidden flex flex-col  items-center w-full h-[90vh]">
          <h1 className="font-[inter] text-4xl font-medium sm:font-extrabold leading-[1.15] text-black dark:text-white mt-4 sm:text-5xl md:text-6xl lg:text-7xl text-center">
            Discover & Share <br />
            <span className="text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI-Powered Prompts
            </span>
          </h1>
          <p className="sm:mt-8 text-center  text-muted-foreground sm:text-xl max-w-2xl">
            Prompts is open-source AI-Powered prompting tool for modern world{" "}
            <Link
              href={"#discover"}
              className="cursor-pointer bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent"
            >
              discover,
            </Link>{" "}
            <Link
              href={"#create"}
              className="cursor-pointer bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
            >
              create
            </Link>{" "}
            and{" "}
            <Link
              href={"#share"}
              className="cursor-pointer bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              share
            </Link>{" "}
            creative prompts
          </p>
          <div>
            <Button
              className="mt-8 rounded-full w-[200px]"
              onClick={handleClick}
            >
              {isSignedIn ? "Discover prompts" : "Get started"}
            </Button>
          </div>
          <ChevronDown />
        </section>

        <section
          className="max-[640px]:hidden relative flex flex-col justify-center items-center h-[90vh]"
          id="discover"
        >
          <SectionItem
            title="Discover"
            description="Discover a world of inspiration and creativity! Our website is designed to help you find the perfect prompt to get your creative juices flowing. With a wide variety of prompts to choose from, including writing prompts, art prompts, and more, you're sure to find something that sparks your imagination."
            gradient="bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent"
            image="/compass.png"
          />

          <ChevronDown />
        </section>

        <section
          className="max-[640px]:hidden relative flex flex-col justify-center items-center h-[90vh]"
          id="create"
        >
          <SectionItem
            title="Create"
            description="From brainstorming and outlining to drafting and revising, our tools are here to help you stay organized and focused on your creative vision. So why wait? Start creating today and see where your imagination takes you!"
            gradient="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
            image="/create.png"
          />
          <ChevronDown />
        </section>

        <section
          className="max-[640px]:hidden relative max-[640px]:hidden flex items-center gap-x-4 max-w-4xl h-[90vh] "
          id="share"
        >
          <SectionItem
            title="Share"
            description="Finally, once you've finished your project, it's time to share it with the world! Our website makes it easy to share your work with others and connect with a community of like-minded creatives."
            gradient="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
            image="/compass.png"
          />
        </section>
      </div>
    </div>
  );
}
