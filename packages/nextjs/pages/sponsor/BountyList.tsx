import { FC, useEffect, useState } from "react";
import { notification } from "~~/utils/scaffold-eth";

export interface Bounty {
  name: string;
  description: string;
  value: string;
  winner: string;
  sponsor: string;
  isClaimed: boolean;
}

interface BountyListProps {
  filter: (bounty: Bounty) => boolean;
  onApproveClick: (index: number) => void;
  onDisputeClick: (index: number) => void;
}

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

export const SponsorBountyList: FC<BountyListProps> = ({ filter, onApproveClick, onDisputeClick }) => {
  const [bounties, setBounties] = useState<Bounty[]>([]);

  useEffect(() => {
    async function fetchBounties() {
      const fetchedBounties: Bounty[] = [
        {
          name: "Bug Fix",
          description: "Fix a critical bug",
          value: "1 ETH",
          winner: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: false,
        },
        {
          name: "Feature Development",
          description: "Develop a new feature",
          value: "2 ETH",
          winner: "",
          sponsor: "0xDEF...",
          isClaimed: false,
        },
      ];
      setBounties(fetchedBounties.filter(filter));
    }
    fetchBounties();
  }, [filter]);

  if (bounties.length === 0) {
    return <p>No bounties eligible.</p>;
  }

  return (
    <div className="mt-4 w-full max-w-4xl">
      {bounties.map((bounty, index) => (
        <div key={index} className="card bg-base-200 shadow-md p-4 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold">{bounty.name}</h3>
              <p className="text-sm mb-2">Value: {bounty.value}</p>
              <p className="text-sm">Winner: {bounty.winner ? shortenAddress(bounty.winner) : "No winner yet"}</p>
              <p className="text-sm">Claimed: {bounty.isClaimed ? "Yes" : "No"}</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="btn btn-success" onClick={() => onApproveClick(index)}>
                Approve
              </button>
              <button className="btn btn-error" onClick={() => onDisputeClick(index)}>
                Dispute
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
