import { PipelineEdDSATicketZuAuthConfig } from "@pcd/passport-interface";

export const ETHBERLIN_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "53edb3e7-6733-41e0-a9be-488877c5c572",
    eventName: "ETHBerlin04",
    productId: "",
    productName: "",
  },
];

export const SOCIAL_WINNER_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "5b101ef7-80a3-59eb-9195-607f7561a4f6",
    // eventId: "70ddfc2c-4f83-44ff-b38d-88057eb33798",
    eventName: "ETHBerlin04 ([TEST] Social Technologies Winner)",
    productId: "9d4d095b-5980-5ad8-8c24-edef0cc0a909",
    productName: "",
  },
];

export const HACKER_WINNER_ZUAUTH_CONFIG: PipelineEdDSATicketZuAuthConfig[] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204",
    ],
    eventId: "a00f62b0-5007-5eb2-8a7e-295b62ea08dd",
    // eventId: "70ddfc2c-4f83-44ff-b38d-88057eb33798",
    eventName: "ETHBerlin04 ([TEST] Hacker's Choice Winner)",
    productId: "64031133-8ca4-57b0-94bc-af4fc9e5013a",
    productName: "",
  },
];
