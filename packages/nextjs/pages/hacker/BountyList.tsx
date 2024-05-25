import { FC, useCallback, useEffect, useState } from "react";
import { zuAuthPopup } from "@pcd/zuauth";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { generateWitness } from "~~/utils/scaffold-eth/pcd";
import { HACKER_WINNER_ZUAUTH_CONFIG, SOCIAL_WINNER_ZUAUTH_CONFIG } from "~~/utils/zupassConstants";

interface Bounty {
  name: string;
  value: string;
  id: number;
  sponsorAddress: string;
  isClaimed: boolean;
  config: any;
}

interface BountyListProps {
  filter: (bounty: Bounty) => boolean;
  connectedAddress: string | undefined;
}

interface ProofArgs {
  _pA: [string, string];
  _pB: [[string, string], [string, string]];
  _pC: [string, string];
  _pubSignals: string[];
}

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

export const HackerBountyList: FC<BountyListProps> = ({ filter, connectedAddress }) => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [proofs, setProofs] = useState<Record<number, string>>({});
  const { address: connectedAddressFromAccount } = useAccount();
  const connectedAddressToUse = connectedAddress || connectedAddressFromAccount;

  const { writeAsync: claimBounty } = useScaffoldContractWrite({
    contractName: "SBFModule",
    functionName: "claimBounty",
    args: [],
  });

  useEffect(() => {
    const initialBounties: Bounty[] = [
      {
        name: "Social Technologies",
        value: "7,000 DAI",
        id: 0,
        sponsorAddress: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
        isClaimed: false,
        config: SOCIAL_WINNER_ZUAUTH_CONFIG,
      },
      {
        name: "Hackers' Choice Award",
        value: "7,000 DAI",
        id: 1,
        sponsorAddress: "0x199d51a2Be04C65f325908911430E6FF79a15ce3",
        isClaimed: false,
        config: HACKER_WINNER_ZUAUTH_CONFIG,
      },
    ];
    setBounties(initialBounties.filter(filter));
  }, [filter]);

  const getProof = useCallback(
    async (index: number, config: any) => {
      if (!connectedAddressToUse) {
        notification.error("Please connect wallet");
        return;
      }
      const result = await zuAuthPopup({
        fieldsToReveal: {
          revealAttendeeEmail: true,
          revealEventId: true,
          revealProductId: true,
        },
        watermark: connectedAddressToUse,
        config,
      });
      if (result.type === "pcd") {
        const pcdData = JSON.parse(result.pcdStr).pcd;

        setProofs(prev => ({ ...prev, [index]: pcdData }));
      } else {
        notification.error("Failed to parse PCD");
      }
    },
    [connectedAddressToUse],
  );

  const handleClaim = async (index: number) => {
    const proof = proofs[index];
    if (!proof) {
      notification.error("Please generate proof first.");
      return;
    }
    try {
      await claimBounty({
        args: [proof ? generateWitness(JSON.parse(proof)) : undefined],
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
              <p className="text-med mb-2">{bounty.value}</p>
              {/* <p className="text-sm">Sponsor: {shortenAddress(bounty.sponsorAddress)}</p> */}
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="btn btn-primary" onClick={() => handleButtonClick(index, bounty.config)}>
                {!proofs[index] ? "Generate Proof" : "Claim"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
