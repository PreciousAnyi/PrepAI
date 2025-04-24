import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <Agent
        userName={user?.name ?? "There"}
        userId={user?.id}
        profileImageUrl={user?.profileImageUrl ?? "/profile.png"}
        type="generate"
      />
    </main>
  );
};


export default Page;
