"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { currentUser, useAuth, useUser } from "@clerk/nextjs";
import { Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
        <h1 className="font-[inter] text-4xl font-medium leading-[1.15] text-black dark:text-white mt-4  text-center">
          Discover & Share <br />
          <span className="text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="mt-4 mb-8 text-center text-base text-muted-foreground  max-w-2xl">
          Prompts is open-source AI-Powered prompting tool for modern world
          discover, create and share creative prompts
        </p>
        <Button className="rounded-full w-[200px]" onClick={handleClick}>
          {/* <Link href={isSignedIn ? "/home" : "/sign-up"}>
            {isSignedIn ? "Discover prompts" : "Get started"}
          </Link> */}
          {isSignedIn ? "Discover prompts" : "Get started"}
        </Button>
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
              className="cursor-pointer bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent "
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
              {/* <Link href={isSignedIn ? "/home" : "/sign-up"}>
                {isSignedIn ? "Discover prompts" : "Get started"}
              </Link> */}
              {isSignedIn ? "Discover prompts" : "Get started"}
            </Button>
          </div>
          <div className="absolute bottom-[90px] translate-x-[-50%] animate-bounce">
            <svg width="30px" height="20px">
              <path
                stroke="#ffffff"
                fill="none"
                stroke-width="2px"
                d="M2.000,5.000 L15.000,18.000 L28.000,5.000 "
              ></path>
            </svg>
          </div>
        </section>

        <section className="relative flex flex-col justify-center items-center h-[90vh]" id="discover">
          <div className="max-[640px]:hidden flex items-center gap-x-4 max-w-4xl">
            <Card className="w-full  bg-blue-100 ">
              <CardHeader></CardHeader>
              <CardContent className="flex justify-center items-center">
                <Image
                  src="/compass.png"
                  alt="discover"
                  width={200}
                  height={200}
                  className="object-cover object-center"
                />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <div className="flex flex-col space-y-4">
              <h1 className="font-[inter] text-5xl font-bold bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent">
                Discover
              </h1>
              <p className="text-muted-foreground">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ex voluptate neque ab hic nostrum, suscipit rem praesentium
                incidunt aut adipisci doloremque earum quas iure ut illum
                architecto dignissimos error.
              </p>
            </div>
          </div>

          <div className="absolute bottom-[10px] translate-x-[-50%] animate-bounce">
            <svg width="30px" height="20px">
              <path
                stroke="#ffffff"
                fill="none"
                stroke-width="2px"
                d="M2.000,5.000 L15.000,18.000 L28.000,5.000 "
              ></path>
            </svg>
          </div>
        </section>


        <section
          className="relative flex flex-col justify-center items-center h-[90vh]"
          id="create"
        >
          <div className="max-[640px]:hidden flex items-center gap-x-4 max-w-4xl">
          <Card className="w-full  bg-blue-100 ">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center items-center">
              <Image
                src="/create.png"
                alt="create"
                width={200}
                height={200}
                className="object-cover object-center"
              />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>

          <div className="flex flex-col space-y-4">
            <h1 className="font-[inter] text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Create
            </h1>
            <p className="text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              ex voluptate neque ab hic nostrum, suscipit rem praesentium
              incidunt aut adipisci doloremque earum quas iure ut illum
              architecto dignissimos error.
            </p>
          </div>
          </div>
    
          <div className="absolute bottom-[60px] translate-x-[-50%] animate-bounce">
            <svg width="30px" height="20px">
              <path
                stroke="#ffffff"
                fill="none"
                stroke-width="2px"
                d="M2.000,5.000 L15.000,18.000 L28.000,5.000 "
              ></path>
            </svg>
          </div>
        </section>
        <section
          className="relative max-[640px]:hidden flex items-center gap-x-4 max-w-4xl h-[90vh] "
          id="share"
        >
          <Card className="w-full  bg-blue-100 ">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center items-center">
              <Image
                src="/compass.png"
                alt="share"
                width={200}
                height={200}
                className="object-cover object-center"
              />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          <div className="flex flex-col space-y-4">
            <h1 className="font-[inter] text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
              Share
            </h1>
            <p className="text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
              ex voluptate neque ab hic nostrum, suscipit rem praesentium
              incidunt aut adipisci doloremque earum quas iure ut illum
              architecto dignissimos error.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
