import { useCallback, useState } from "react";
import { ZKEdDSAEventTicketPCDPackage } from "@pcd/zk-eddsa-event-ticket-pcd";
import { zuAuthPopup } from "@pcd/zuauth";
import type { NextPage } from "next";
import { hexToBigInt } from "viem";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { generateWitness, isETHBerlinPublicKey } from "~~/utils/scaffold-eth/pcd";
import { ETHBERLIN_ZUAUTH_CONFIG } from "~~/utils/zupassConstants";

// Get a valid event id from { supportedEvents } from "zuauth" or https://api.zupass.org/issue/known-ticket-types
const fieldsToReveal = {
  revealAttendeeEmail: true,
  revealEventId: true,
  revealProductId: true,
};

const Home: NextPage = () => {
  const [verifiedFrontend, setVerifiedFrontend] = useState(false);
  const [verifiedBackend, setVerifiedBackend] = useState(false);
  const [verifiedOnChain, setVerifiedOnChain] = useState(false);
  const { address: connectedAddress } = useAccount();
  const [pcd, setPcd] = useState<string>();

  const getProof = useCallback(async () => {
    if (!connectedAddress) {
      notification.error("Please connect wallet");
      return;
    }
    const result = await zuAuthPopup({ fieldsToReveal, watermark: connectedAddress, config: ETHBERLIN_ZUAUTH_CONFIG });
    if (result.type === "pcd") {
      setPcd(JSON.parse(result.pcdStr).pcd);
    } else {
      notification.error("Failed to parse PCD");
    }
  }, [connectedAddress]);

  const verifyProofFrontend = async () => {
    if (!pcd) {
      notification.error("No PCD found!");
      return;
    }

    if (!connectedAddress) {
      notification.error("Please connect wallet");
      return;
    }
    const deserializedPCD = await ZKEdDSAEventTicketPCDPackage.deserialize(pcd);

    if (!(await ZKEdDSAEventTicketPCDPackage.verify(deserializedPCD))) {
      notification.error(`[ERROR Frontend] ZK ticket PCD is not valid`);
      return;
    }

    if (!isETHBerlinPublicKey(deserializedPCD.claim.signer)) {
      notification.error(`[ERROR Frontend] PCD is not signed by ETHBerlin`);
      return;
    }

    if (deserializedPCD.claim.watermark.toString() !== hexToBigInt(connectedAddress as `0x${string}`).toString()) {
      notification.error(`[ERROR Frontend] PCD watermark doesn't match`);
      return;
    }

    setVerifiedFrontend(true);
    notification.success(
      <>
        <p className="font-bold m-0">Frontend Verified!</p>
        <p className="m-0">
          The proof has been verified
          <br /> by the frontend.
        </p>
      </>,
    );
  };

  const sendPCDToServer = async () => {
    let response;
    try {
      response = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({
          pcd: pcd,
          address: connectedAddress,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      notification.error(`Error: ${e}`);
      return;
    }

    const data = await response.json();
    setVerifiedBackend(true);
    notification.success(
      <>
        <p className="font-bold m-0">Backend Verified!</p>
        <p className="m-0">{data?.message}</p>
      </>,
    );
  };

  // mintItem verifies the proof on-chain and mints an NFT
  const { writeAsync: mintNFT, isLoading: isMintingNFT } = useScaffoldContractWrite({
    contractName: "YourCollectible",
    functionName: "mintItem",
    // @ts-ignore TODO: fix the type later with readonly fixed length bigInt arrays
    args: [pcd ? generateWitness(JSON.parse(pcd)) : undefined],
  });

  return (
    <>
     
    </>
  );
};

export default Home;
