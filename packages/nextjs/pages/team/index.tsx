import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Team from "~~/components/Team";

const TeamPage: NextPage = () => {
  return (
    <>
      <MetaHeader title="Team" />
      <Team />
    </>
  );
};

export default TeamPage;
