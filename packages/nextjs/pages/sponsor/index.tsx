import { ChangeEvent, useEffect, useState } from "react";
import { Bounty, SponsorBountyList } from "./BountyList";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { notification } from "~~/utils/scaffold-eth";

const SponsorDashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [newBounty, setNewBounty] = useState<Bounty>({ name: "", description: "", value: "", winner: "" });

  const handleApprove = (index: number) => {
    notification.success(`Bounty ${index} approved`);
  };

  const handleDispute = (index: number) => {
    notification.error(`Bounty ${index} disputed`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBounty({ ...newBounty, [name]: value });
  };

  const addBounty = async () => {
    // Placeholder for adding a new bounty to the blockchain
    if (!connectedAddress) {
      notification.error("Please connect wallet");
      return;
    }

    const newBountyEntry: Bounty = {
      name: newBounty.name,
      description: newBounty.description,
      value: newBounty.value,
      winner: "",
    };

    setBounties([...bounties, newBountyEntry]);
    setNewBounty({ name: "", description: "", value: "", winner: "" });
    notification.success("Bounty added successfully!");
  };

  return (
    <>
      <MetaHeader title="Sponsor Dashboard" />
      <div className="flex flex-col items-center mt-24">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Add a New Bounty</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newBounty.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Description"
                name="description"
                value={newBounty.description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
              />
              <input
                type="text"
                placeholder="Amount"
                name="value"
                value={newBounty.value}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
              <button className="btn btn-primary w-full" onClick={addBounty}>
                Add Bounty
              </button>
            </div>
          </div>
        </div>
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl mt-8">
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
