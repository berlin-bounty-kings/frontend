import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const teamMembers = [
  {
    name: "arjanjohan",
    image: "/pfp/milady.png",
    description: "hacker",
  },
  {
    name: "@0xjsi.eth",
    image: "/pfp/0xjsi.jpg",
    description: "hacker",
  },
  {
    name: "Sebastian",
    image: "/pfp/sebastian.jpg",
    description: "hacker",
  },
  {
    name: "David Brown",
    image: "/pfp/placeholder.png",
    description: "hacker",
  },
];

const Team: NextPage = () => {
  return (
    <>
      <MetaHeader title="Team" />
      <div className="flex flex-col items-center mt-24">
        <div className="card max-w-[90%] sm:max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="card bg-base-200 shadow-md p-4 flex flex-col items-center">
                  <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                    <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-center">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
