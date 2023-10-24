import Feed from "@/components/feed";
import prismaDB from "@/lib/prismaDB";
import React from "react";
import moment from "moment";
import axios from "axios";

const HomePage = async () => {
  const prompts = await prismaDB.prompt.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedPrompts = prompts.map((item) => ({
    id: item.id,
    creatorId: item.creatorId,
    userId: item.user.userId,
    prompt: item.prompt,
    tag: item.tag,
    username: item.user.name,
    image: item.user.image,
    email: item.user.email,
    createdAt: moment(item.createdAt).format("D MMM YYYY"),
  }));

  return (
    <div className="px-4 sm:px-8 py-4">
      <Feed data={formatedPrompts} />
    </div>
  );
};

export default HomePage;
