import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BountyList } from "~~/components/BountyList";
import { MetaHeader } from "~~/components/MetaHeader";
import { notification } from "~~/utils/scaffold-eth";

const SponsorDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const handleApprove = (index: number) => {
    // Placeholder for approving a bounty
    notification.success(`Bounty ${index} approved`);
  };

  const handleDispute = (index: number) => {
    // Placeholder for disputing a bounty
    notification.error(`Bounty ${index} disputed`);
  };

  return (
    <>
      <MetaHeader title="Sponsor Dashboard" />
      <div className="flex flex-col items-center mt-24">
        <div className="card max-w-[90%] sm:max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Sponsor Dashboard</h2>
            <BountyList
              filter={bounty => bounty.sponsor.toLowerCase() === connectedAddress?.toLowerCase()}
              onApproveClick={handleApprove}
              onDisputeClick={handleDispute}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorDashboard;
