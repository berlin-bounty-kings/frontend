import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BountyList } from "~~/components/BountyList";
import { MetaHeader } from "~~/components/MetaHeader";
import { notification } from "~~/utils/scaffold-eth";

const HackerDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const handleWithdraw = (index: number) => {
    // Placeholder for withdrawing a bounty
    notification.success(`Bounty ${index} withdrawn`);
  };

  return (
    <>
      <MetaHeader title="Hacker Dashboard" />
      <div className="flex flex-col items-center mt-24">
        <div className="card max-w-[90%] sm:max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Hacker Dashboard</h2>
            <BountyList
              filter={bounty => bounty.winner.toLowerCase() === connectedAddress?.toLowerCase()}
              onApproveClick={handleWithdraw}
              onDisputeClick={() => {}} // No dispute button needed, can be left empty or removed
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HackerDashboard;
