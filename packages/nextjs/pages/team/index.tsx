import type { NextPage } from "next";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MetaHeader } from "~~/components/MetaHeader";

const teamMembers = [
  {
    name: "arjanjohan",
    image: "/pfp/milady.png",
    description: "hacker",
    github: "https://github.com/arjanjohan",
    twitter: "https://twitter.com/arjanjohan",
  },
  {
    name: "0xjsi.eth",
    image: "/pfp/0xjsi.jpg",
    description: "hacker",
    github: "https://github.com/jacksmithinsulander",
    twitter: "https://twitter.com/0xjsieth",
  },
  {
    name: "Sebastian",
    image: "/pfp/sebastian.jpg",
    description: "hacker",
    github: "https://github.com/53bcryp70",
    linkedin: "https://www.linkedin.com/in/sebastian-s-a29b93276",
  },
  {
    name: "aliX40",
    image: "/pfp/alix40.png",
    description: "hacker",
    github: "https://github.com/aliX40",
    twitter: "https://x.com/AliX__40",
  },
];

const Team: NextPage = () => {
  return (
    <>
      <MetaHeader title="Team" />
      <div className="flex flex-col items-center mt-24">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="card bg-base-200 shadow-md p-4 flex flex-col items-center">
                  <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
                    <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-center">{member.description}</p>
                  <div className="flex mt-4 space-x-4">
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl text-gray-800 hover:text-gray-600" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <FaXTwitter className="text-2xl text-gray-800 hover:text-blue-400" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl text-gray-800 hover:text-blue-400" />
                      </a>
                    )}
                  </div>
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
