import { uploadToThirdweb } from "./nftMetadata";
import { CONTRACT_ADDRESS, NEXT_PUBLIC_PRIVATE_KEY, RPC_URL } from "./utils";
import { ethers } from "ethers";
import { ERC721ABI } from "./abi/ERC721AI";

export async function mintRandomNFT(userAddress: string) {


    const provider = new ethers.JsonRpcProvider(RPC_URL); // Replace with your RPC URL
    const privateKey = NEXT_PUBLIC_PRIVATE_KEY; // Replace with your wallet private key
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721ABI, wallet);

    try {
        const randomName = `NFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const { metadataUrl, metadataUrlImage } = await uploadToThirdweb(randomName);

        const tx = await contract.mintAI(userAddress, randomName, metadataUrl);
        console.log("Transaction sent:", tx.hash);

        const receipt = await tx.wait();
        console.log("Transaction mined:", receipt.args,);
        const tokenMintedEvent = receipt.logs.find((log: { fragment: { name: string; }; }) => log.fragment.name === 'TokenMinted');
        let result;
        if (tokenMintedEvent) {
            result = Number(tokenMintedEvent.args[0]);
            console.log('TokenMinted args:', Number(tokenMintedEvent.args[0]));
        }

        return {metadataUrl, metadataUrlImage, result, randomName}
       
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}