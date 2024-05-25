import { FC, useCallback, useEffect, useState } from "react";
import { zuAuthPopup } from "@pcd/zuauth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { generateWitness } from "~~/utils/scaffold-eth/pcd";
import { HACKER_WINNER_ZUAUTH_CONFIG } from "~~/utils/zupassConstants";

interface Bounty {
  name: string;
  description: string;
  value: string;
  winner: string;
  sponsor: string;
  isClaimed: boolean;
}

interface BountyListProps {
  filter: (bounty: Bounty) => boolean;
  connectedAddress: string | undefined;
}

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

export const HackerBountyList: FC<BountyListProps> = ({ filter, connectedAddress }) => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [proofs, setProofs] = useState<Record<number, string>>({});
  const { writeAsync: claimBounty, isLoading: isMintingNFT } = useScaffoldContractWrite({
    contractName: "SBFModule",
    functionName: "claimBounty",
    args: ["0"], // assuming "0" is the bounty id, replace it as needed
  });

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

  const getProof = async (index: number, config: any, contractAddress: string) => {
    if (!connectedAddress) {
      notification.error("Please connect wallet");
      return;
    }
    const result = await zuAuthPopup({
      fieldsToReveal: {
        revealAttendeeEmail: true,
        revealEventId: true,
        revealProductId: true,
      },
      watermark: connectedAddress,
      config,
    });
    if (result.type === "pcd") {
      setProofs(JSON.parse(result.pcdStr).pcd);
    } else {
      notification.error("Failed to parse PCD");
    }
  };

  const handleClaim = async (index: number) => {
    const proof = proofs[index];
    if (!proof) {
      notification.error("Please generate proof first.");
      return;
    }
    try {
      await claimBounty({
        // args: [proof ? generateWitness(JSON.parse(proof)) : undefined], // assuming "0" is the bounty id, replace it as needed
        args: ["0"],
      });
      notification.success(`Bounty ${index} claimed`);
    } catch (error) {
      notification.error("Failed to claim bounty.");
    }
  };

  const handleButtonClick = async (index: number, config: any) => {
    const proof = proofs[index];
    if (!proof) {
      await getProof(index, config);
    } else {
      await handleClaim(index);
    }
  };

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
              <p className="text-sm">Sponsor: {shortenAddress(bounty.sponsor)}</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                className="btn btn-primary"
                onClick={() => handleButtonClick(index, HACKER_WINNER_ZUAUTH_CONFIG)} // Change config as needed
              >
                {!proofs[index] ? "Generate Proof" : "Claim"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
