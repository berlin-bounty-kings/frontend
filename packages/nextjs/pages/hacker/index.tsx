import { useCallback, useState } from "react";
import { HackerBountyList } from "./BountyList";
import { zuAuthPopup } from "@pcd/zuauth";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { generateWitness } from "~~/utils/scaffold-eth/pcd";
import { HACKER_WINNER_ZUAUTH_CONFIG, SOCIAL_WINNER_ZUAUTH_CONFIG } from "~~/utils/zupassConstants";

// Get a valid event id from { supportedEvents } from "zuauth" or https://api.zupass.org/issue/known-ticket-types
const fieldsToReveal = {
  revealAttendeeEmail: true,
  revealEventId: true,
  revealProductId: true,
};

const HackerDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [pcd, setPcd] = useState<string>();

  const getProof = useCallback(async () => {
    if (!connectedAddress) {
      notification.error("Please connect wallet");
      return;
    }
    const result = await zuAuthPopup({
      fieldsToReveal,
      watermark: connectedAddress,
      config: SOCIAL_WINNER_ZUAUTH_CONFIG,
    });
    if (result.type === "pcd") {
      setPcd(JSON.parse(result.pcdStr).pcd);
    } else {
      notification.error("Failed to parse PCD");
    }
  }, [connectedAddress]);

  const { writeAsync: claimBounty, isLoading: isMintingNFT } = useScaffoldContractWrite({
    contractName: "SBFModule",
    functionName: "claimBounty",
    args: ["0"], // todo add proof and bounty id
    // args: [pcd ? generateWitness(JSON.parse(pcd)) : undefined],
  });

  const handleClaim = async (index: number) => {
    try {
      await claimBounty();
      notification.success(`Bounty ${index} claimed`);
    } catch (error) {
      notification.error("Failed to claim bounty.");
    }
  };

  return (
    <>
      <MetaHeader title="Hacker Dashboard" />

      <div className="flex flex-col items-center mt-24">
        <div className="card max-w-[90%] sm:max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Won a bounty?</h2>
            <p className="mt-0">Generate a proof using ZuPass here to claim your prize.</p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="tooltip" data-tip="Loads the Zupass UI in a modal, where you can prove your PCD.">
                <button className="btn btn-secondary w-full tooltip" onClick={getProof} disabled={!!pcd}>
                  {!pcd ? "1. Get Proof" : "1. Proof Received!"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-24">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Hacker Dashboard</h2>
            <HackerBountyList
              filter={bounty => bounty.winner.toLowerCase() === connectedAddress?.toLowerCase()}
              onClaimClick={handleClaim}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HackerDashboard;
