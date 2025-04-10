import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <Agent
        userName={user?.name ?? "There"}
        userId={user?.id}
        profileImageUrl={user?.profileImageUrl ?? "/profile.png"}
        type="generate"
      />
    </>
  );
};

export default Page;
