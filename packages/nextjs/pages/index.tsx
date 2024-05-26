"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CreditCardIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Team from "~~/components/Team";
import { Address } from "~~/components/scaffold-eth";

// Import the Team component

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="sbfw flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">SAFE BOUNTY FUND</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <p>
            <img src="/logo/android-chrome-512x512.png" alt="Logo" />
          </p>
        </div>

        <div className="sbfc flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <CurrencyDollarIcon className="h-8 w-8 fill-secondary" />
              <p>
                Sponsors and organizers can add bounties on the{" "}
                <Link href="/create" passHref className="link">
                  Bounties dashboard
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <CreditCardIcon className="h-8 w-8 fill-secondary" />
              <p>
                Winners can claim their bounties on the{" "}
                <Link href="/results" passHref className="link">
                  Claim dashboard
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Add the Team component here */}
        <Team />
      </div>
    </>
  );
};

export default Home;
