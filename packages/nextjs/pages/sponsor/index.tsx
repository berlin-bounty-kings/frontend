import { SponsorBountyList } from "./BountyList";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { notification } from "~~/utils/scaffold-eth";

const SponsorDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const handleApprove = (index: number) => {
    notification.success(`Bounty ${index} approved`);
  };

  const handleDispute = (index: number) => {
    notification.error(`Bounty ${index} disputed`);
  };

  return (
    <>
      <MetaHeader title="Sponsor Dashboard" />
      <div className="flex flex-col items-center mt-24">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Sponsor Dashboard</h2>
            <SponsorBountyList
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
