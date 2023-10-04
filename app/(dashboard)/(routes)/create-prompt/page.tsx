import prismaDB from "@/lib/prismaDB";
import FormPage from "@/components/form";
import { currentUser } from "@clerk/nextjs";

const CreatePage = async () => {
  const user = await currentUser();

  const prisma = await prismaDB.user.findFirst({
    where: {
      userId: user?.id,
    },
  });
  const creatorId = prisma?.id;
  if (!user) return <div>please try again</div>;
  // {user ?  <FormPage creatorId={creatorId} /> : }

  return (
    <div>
      {!user && <div>loading</div>}
      {user && <FormPage creatorId={creatorId} />}
    </div>
  );
};

export default CreatePage;
