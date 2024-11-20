import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { createCanvas } from "canvas";
import { NEXT_THIRDWEB_SECRET_KEY } from "./utils";

async function generateRandomImage(name:string): Promise<Buffer> {
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    ctx.fillRect(0, 0, 512, 512);

    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(name, 50, 256);

    return canvas.toBuffer("image/png");
}

export async function uploadToThirdweb(name: string) {
    const storage = new ThirdwebStorage({
        secretKey: NEXT_THIRDWEB_SECRET_KEY,
    });

    try {
        const imageBuffer = await generateRandomImage(name);
        const imageUri = await storage.upload(imageBuffer);
        console.log("Uploaded Image IPFS URI:", imageUri);

        const metadata = {
            name,
            description: "A randomly generated NFT image.",
            image: imageUri, 
        };

        const metadataUri = await storage.upload(metadata);
        console.log("Uploaded Metadata IPFS URI:", metadataUri);
        const metadataUrl =  storage.resolveScheme(metadataUri);
        const metadataUrlImage =  storage.resolveScheme(metadata.image);
        console.log("Resolved Metadata Gateway URL:", metadataUrl);
        console.log("Resolved Metadata Image Gateway URL:", metadataUrlImage);

        return {metadataUrl, metadataUrlImage};
    } catch (error) {
        console.error("Error uploading to Thirdweb:", error);
        throw error;
    }
}
