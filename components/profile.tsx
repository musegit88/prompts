import { PromptProps } from "@/types";
import PromptCard from "./prompt-card";

interface ProfileProps {
  name?: string;
  data?: PromptProps[];
}

const Profile: React.FC<ProfileProps> = ({ name, data }) => {
  return (
    <div className="w-full">
      <h1 className="font-extrabold text-center text-2xl sm:text-5xl sm:text-left mb-4 bg-gradient-to-r from-blue-400 to-fuchsia-700 bg-clip-text text-transparent">
        <span className="">{name} Profile</span>
      </h1>
      <p className="text-center text-sm sm:text-left sm:text-xl max-w-2xl">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-400 to-fuchsia-700 bg-clip-text text-transparent">
          {name}
        </span>{" "}
        profile
      </p>
      <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-4 md:columns-2 lg:columns-4 xl:columns-4">
        {data?.map((post) => (
          <PromptCard key={post.id} posts={post} />
        ))}
      </div>
    </div>
  );
};
export default Profile;
