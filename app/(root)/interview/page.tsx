import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Genration</h3>

      <Agent
        userName={user!.name || "user"}
        userId={user?.id}
        type="generate"
      />
    </>
  );
};

export default Page;
