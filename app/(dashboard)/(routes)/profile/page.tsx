import Profile from "@/components/profile";
import prismaDB from "@/lib/prismaDB";
import { currentUser } from "@clerk/nextjs";
import moment from "moment";

const ProfilePage = async () => {
  const current = await currentUser();
  const profileUser = await prismaDB.user.findFirst({
    where: {
      userId: current?.id,
    },
    include: {
      prompts: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedUser = profileUser?.prompts.map((item) => ({
    id: item.id,
    creatorId: item.creatorId,
    userId: item.userId,
    prompt: item.prompt,
    tag: item.tag,
    username: profileUser.name,
    image: profileUser.image,
    email: profileUser.email,
    createdAt: moment(item.createdAt).format("D MMM YYYY"),
  }));
  return (
    <div className="px-4 sm:px-12 py-4">
      <Profile name={profileUser?.name} data={formatedUser} />
    </div>
  );
};
export default ProfilePage;
