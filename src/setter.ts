import { uploadToThirdweb } from "./nftMetadata";
import { CONTRACT_ADDRESS, NEXT_PUBLIC_PRIVATE_KEY, RPC_URL } from "./utils";
import { ethers } from "ethers";
import { ERC721ABI } from "./abi/ERC721AI";

export async function setter(userAddress:string) {
    const provider = new ethers.JsonRpcProvider(RPC_URL); // Replace with your RPC URL
    const privateKey = NEXT_PUBLIC_PRIVATE_KEY; // Replace with your wallet private key
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721ABI, wallet);
    try {

        const tx = await contract.setVerifiedUser(userAddress);
        console.log("Transaction sent:", tx.hash);

        // 5. Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log("Transaction mined:", receipt.transactionHash);
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}
