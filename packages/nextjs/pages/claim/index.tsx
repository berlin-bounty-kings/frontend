import HackerBountyList from "./component/BountyList";
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
            <h2 className="card-title text-center">Claim your bounties</h2>
            <p>
              To claim the bounties you have won, first connect your Zupass account to generate a proof of winning.
              Next, claim the winnings with one click. Behind the scenes our smart contract will verify the proof before
              transferring the winnings.
            </p>
            <HackerBountyList filter={() => true} connectedAddress={connectedAddress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HackerDashboard;
