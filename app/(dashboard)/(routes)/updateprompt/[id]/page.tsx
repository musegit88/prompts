import prismaDB from "@/lib/prismaDB";
import FormPage from "@/components/form";
import { currentUser } from "@clerk/nextjs";

interface UpdateProps {
  params: {
    id: string;
  };
}

const UpdatePage: React.FC<UpdateProps> = async ({ params }) => {
  const user = await currentUser();

  const prisma = await prismaDB.prompt.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!user) return <div>please try again</div>;

  return (
    <div>
      {!user && <div>loading</div>}
      {user && <FormPage initialData={prisma} />}
    </div>
  );
};

export default UpdatePage;
