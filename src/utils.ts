import dotenv from 'dotenv';
dotenv.config();
export const RPC_URL = process.env.RPC_URL!;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI!;
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
export const JWT_SECRET = "your-secret-key";
export const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY!;
export const NEXT_THIRDWEB_SECRET_KEY = process.env.NEXT_PUBLIC_THIRDWEB_SECRET
export const NEXT_PUBLIC_THIRDWEB_CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

// export const ContractAddress = {
//     usdc: process.env.NEXT_PUBLIC_USDC || "",
//     LpToken: process.env.NEXT_PUBLIC_LP_TOKEN || "",
//     Keeper: process.env.NEXT_PUBLIC_KEEPER || "",
//     Formula: process.env.NEXT_PUBLIC_FORMULA || "",
//     Referral: process.env.NEXT_PUBLIC_REFERRAL || "",
//     Diamond: process.env.NEXT_PUBLIC_DIAMOND || "",
//     Router: process.env.NEXT_PUBLIC_ROUTER || "",
//     Deposit: process.env.NEXT_PUBLIC_DEPOSIT || "",
//     Mip: process.env.NEXT_PUBLIC_MIP || "",
//     Credits: process.env.NEXT_PUBLIC_CREDITS || "",
//   };