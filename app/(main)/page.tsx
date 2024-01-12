"use client";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MouseEventHandler } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import ChevronDown from "@/components/chevron-down";
import Image from "next/image";

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
      </section>
      {/*  */}
      {/* Desktop */}
      <div className="flex flex-col">
        <main className="relative max-[640px]:hidden flex flex-col  items-center w-full mt-20 h-[90vh]">
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
        </main>
        <main className="my-8 flex flex-col gap-40">
          <article className="max-[640px]:flex max-[640px]:flex-col sm:flex sm:items-center gap-4">
            <div className="flex-1 flex justify-center w-full">
              <div className="relative w-full h-60 rounded-md">
                <Link
                  title="Photo by 
Sigmund
Unsplash"
                  href="https://unsplash.com/@sigmund?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                  target="_blank"
                >
                  {" "}
                  <Image
                    src="/discover.jpg"
                    alt="create"
                    fill
                    className="object-cover rounded-md"
                  />
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-4xl mb-4 bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
                Discover
              </h2>
              <p className="overflow-clip">
                Discover a world of inspiration and creativity! Our website is
                designed to help you find the perfect prompt to get your
                creative juices flowing. With a wide variety of prompts to
                choose from, including writing prompts, art prompts, and more,
                you&apos;re sure to find something that sparks your imagination.
              </p>
            </div>
          </article>
          <article className="max-[640px]:flex max-[640px]:flex-col sm:flex sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-4xl mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                Create
              </h2>
              <p>
                From brainstorming and outlining to drafting and revising, our
                tools are here to help you stay organized and focused on your
                creative vision. So why wait? Start creating today and see where
                your imagination takes you!
              </p>
            </div>
            <div className="flex-1 flex justify-center w-full">
              <div className="relative w-full h-60">
                <Link
                  title="Image by kirill_makes_pics from
Pixabay"
                  href="https://pixabay.com/users/kirill_makes_pics-5203613/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3026190"
                  target="_blank"
                >
                  <Image
                    src="/create.jpg"
                    alt="create"
                    fill
                    className="object-cover rounded-md"
                  />
                </Link>
              </div>
            </div>
          </article>
          <article className="max-[640px]:flex max-[640px]:flex-col sm:flex sm:items-center gap-4">
            <div className="flex-1 flex justify-center w-full">
              <div className="relative w-full h-60">
                <Link
                  title="Image by from heinzremyschindler Pixabay"
                  href="https://pixabay.com/users/heinzremyschindler-5840905/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2482016"
                  target="_blank"
                >
                  <Image
                    src="/share.jpg"
                    alt="create"
                    fill
                    className="object-cover rounded-md"
                  />
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-4xl mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                Share
              </h2>

              <p>
                Finally, once you&apos;ve finished your project, it&apos;s time
                to share it with the world! Our website makes it easy to share
                your work with others and connect with a community of
                like-minded creatives.
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
