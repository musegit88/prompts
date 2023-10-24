import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
interface SectionItemProps {
  title: string;
  description: string;
  gradient: string;
  image: string;
}
const inter = Inter({ subsets: ["latin"] });
const SectionItem: React.FC<SectionItemProps> = ({
  title,
  description,
  gradient,
  image,
}) => {
  return (
    <div className="max-[640px]:hidden flex items-center gap-x-4 max-w-4xl">
      <Card className="w-full  bg-blue-100 ">
        <CardHeader></CardHeader>
        <CardContent className="flex justify-center items-center">
          <Image
            src={image}
            alt="create"
            width={200}
            height={200}
            className="object-cover object-center"
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <div className="flex flex-col space-y-4">
        <h1 className={cn("font-[inter] text-5xl font-bold", gradient)}>
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SectionItem;
