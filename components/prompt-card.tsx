"use client";
import { PromptProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Delete, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "./alert-modal";

interface PromptCardProps {
  posts: PromptProps;
  handleTagClick?: ((a: string) => void | undefined) | undefined;
}
const PromptCard: React.FC<PromptCardProps> = ({ posts, handleTagClick }) => {
  //   console.log(posts);
  const [copied, setCopied] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  //   console.log(user);
  const pathname = usePathname();
  const router = useRouter();
  const handleCopy = (prompt: string) => {
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => setCopied(""), 2000);
  };
  const handleProfileClick = (userId: string, name: string) => {
    if (user?.id === userId) return router.push("/profile");

    router.push(`/profile/${userId}?name=${name}`);
  };
  const handleEdit = (id: string) => {
    router.push(`/updateprompt/${id}`);
  };
  const handelDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/prompts/${id}`);
      router.refresh();
      // router.push("/home");
      toast.success("Prompt deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handelDelete(posts.id)}
        loading={loading}
      />
      <Card className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-gray-400 bg-clip-padding bg-opacity-25 p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit transition ease-in-out delay-150 hover:translate-y-1 hover:scale-105 duration-200">
        <CardContent className="flex-1 flex-col space-y-2">
          <div className="flex justify-between items-start gap-5">
            <div className="flex-1 flex justify-start items-center cursor-pointer gap-2">
              <Image
                src={posts.image}
                width={40}
                height={40}
                alt=""
                className="rounded-full object-contain"
              />
              <div
                onClick={() => handleProfileClick(posts.userId, posts.username)}
                className="flex flex-col"
              >
                <h4 className="font-semibold text-gray-900">
                  {posts.username}
                </h4>
                <p className="text-xs text-gray-400">{posts.createdAt}</p>
              </div>
            </div>
            <div
              onClick={() => handleCopy(posts.prompt)}
              className="flex justify-center items-center cursor-pointer rounded-full bg-white/10 w-8 h-8"
            >
              <Image
                src={copied === posts.prompt ? "/tick.svg" : "/copy.svg"}
                alt=""
                width={12}
                height={12}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm h-[80px] overflow-y-scroll">{posts.prompt}</p>
            <p
              className="cursor-pointer flex items-center text-xs text-gray-400"
              onClick={() => handleTagClick && handleTagClick(posts.tag)}
            >
              <span>#</span>
              <span>{posts.tag}</span>
            </p>
          </div>
          {user?.id === posts.userId && pathname === "/profile" && (
            <div className="flex justify-end items-center gap-4 mt-4">
              <Button
                variant="outline"
                size="icon"
                disabled={loading}
                onClick={() => handleEdit(posts.id)}
              >
                <Edit size={20} />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setOpen(true)}
                disabled={loading}
              >
                <Trash size={20} />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PromptCard;
