import { HackerBountyList } from "./BountyList";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";

const HackerDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <MetaHeader title="Hacker Dashboard" />

      <div className="flex flex-col items-center mt-24">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Hacker Dashboard</h2>
            <HackerBountyList
              filter={bounty => bounty.winner.toLowerCase() === connectedAddress?.toLowerCase()}
              connectedAddress={connectedAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HackerDashboard;
