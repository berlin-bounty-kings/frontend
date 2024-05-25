import { FC, useEffect, useState } from "react";
import { notification } from "~~/utils/scaffold-eth";

export interface Bounty {
  id: string;
  description: string;
  value: string;
  sponsor: string;
  isClaimed: boolean;
}

interface BountyListProps {
  filter: (bounty: Bounty) => boolean;
}

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

export const SponsorBountyList: FC<BountyListProps> = ({ filter }) => {
  const [bounties, setBounties] = useState<Bounty[]>([]);

  useEffect(() => {
    async function fetchBounties() {
      const fetchedBounties: Bounty[] = [
        {
          id: "213102656137810142630059403125621749981",
          description: "Hacker's choice",
          value: "7,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: false,
        },
        {
          id: "213102656137810142630059403125621749982",
          description: "Defensive Tooling",
          value: "7,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: false,
        },
        {
          id: "213102656137810142630059403125621749983",
          description: "Freedom to Transact",
          value: "7,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: false,
        },
        {
          id: "213102656137810142630059403125621749984",
          description: "Social Technologies",
          value: "7,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: false,
        },
        {
          id: "213102656137810142630059403125621749985",
          description: "Infrastructure",
          value: "7,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: false,
        },
        {
          id: "213102656137810142630059403125621749986",
          description: "Best Smart Contracts",
          value: "5,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: true,
        },
        {
          id: "212756365423530032915656252450088290525",
          description: "Best Social Impact",
          value: "5,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: false,
        },
        {
          id: "213102656137810142630059403125621749987",
          description: "Best User Experience",
          value: "5,000 DAI",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
          isClaimed: true,
        },
        {
          id: "213102656137810142630059403125621749988",
          description: "Meta Award",
          value: "4,000 DAI and DEVCon7 tickets",
          sponsor: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
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
              <h3 className="text-xl font-bold">{bounty.description}</h3>
              <p className="text-med mb-2">{bounty.value}</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="btn btn-secondary w-full">{bounty.isClaimed ? "CLAIMED" : "NOT CLAIMED"}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
