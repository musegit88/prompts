import Profile from "@/components/profile";
import prismaDB from "@/lib/prismaDB";
import moment from "moment";

interface ProfilesPageProps {
  params: {
    userId: string;
  };
}

const ProfilePage: React.FC<ProfilesPageProps> = async ({ params }) => {
  const posts = await prismaDB.prompt.findMany({
    where: {
      userId: params.userId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedPosts = posts.map((item) => ({
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

  const users = posts.splice(-1).map((item) => item.user.name);

  return (
    <div className="px-4 sm:px-12 py-4">
      <Profile name={users.toString()} data={formatedPosts} />
    </div>
  );
};

export default ProfilePage;
