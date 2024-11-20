import { createCanvas } from 'canvas';
import { Web3Storage, File } from 'web3.storage';

// Generate random image
async function generateRandomImage(): Promise<Buffer> {
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    // Create random color background
    ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    ctx.fillRect(0, 0, 512, 512);

    // Add random text
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Random NFT', 50, 256);

    return canvas.toBuffer('image/png');
}

// Upload to IPFS
async function uploadToIPFS(fileBuffer: Buffer): Promise<string> {
    // Replace with your Web3 Storage API key
    const web3StorageToken: string = 'YOUR_WEB3_STORAGE_API_KEY';

    if (!web3StorageToken) {
        throw new Error("Web3 Storage API key is missing.");
    }

    const storage = new Web3Storage({ token: web3StorageToken });

    // Create a File object
    const fileName = `random-image-${Date.now()}.png`;
    const file = new File([fileBuffer], fileName, { type: 'image/png' });

    // Upload file to IPFS
    const cid = await storage.put([file]);
    console.log(`File uploaded. CID: ${cid}`);

    return `https://${cid}.ipfs.w3s.link/${fileName}`;
}

// Main function
export async function generateImage() {
    try {
        const imageBuffer = await generateRandomImage();
        const ipfsUrl = await uploadToIPFS(imageBuffer);
        console.log(`Image available at: ${ipfsUrl}`);
        return ipfsUrl;
    } catch (error) {
        console.error("Error:", error);
    }
}

