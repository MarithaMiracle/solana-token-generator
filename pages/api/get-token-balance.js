import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount } from '@solana/spl-token';

const RPC_URL = 'https://sly-boldest-friday.solana-devnet.quiknode.pro/2c133a9e4d5fa904934113e804047cd88517d801/';
const connection = new Connection(RPC_URL, 'confirmed');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { walletAddress, mintAddress } = req.body;

    if (!walletAddress || !mintAddress) {
        return res.status(400).json({ message: 'Missing walletAddress or mintAddress' });
    }

    try {
        const publicKey = new PublicKey(walletAddress);
        const mintPublicKey = new PublicKey(mintAddress);

        const tokenAccount = await getAccount(connection, publicKey);

        // Alternatively, you might want to find the associated token account for wallet + mint:
        // const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: mintPublicKey });
        // Extract amount from tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount

        res.status(200).json({
            message: 'Token balance fetched successfully',
            // Replace with the actual balance
            balance: tokenAccount.amount.toString(),
        });
    } catch (error) {
        console.error('Error fetching token balance:', error);
        res.status(500).json({ message: 'Failed to fetch token balance', error: error.message });
    }
}