import { Connection, Keypair } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import fs from 'fs';
import path from 'path';

const RPC_URL = 'https://sly-boldest-friday.solana-devnet.quiknode.pro/2c133a9e4d5fa904934113e804047cd88517d801/';
const connection = new Connection(RPC_URL, 'confirmed');

const keypairPath = path.resolve('./keypair.json');
const secretKey = JSON.parse(fs.readFileSync(keypairPath, 'utf8'));
const payer = Keypair.fromSecretKey(new Uint8Array(secretKey));

let lastRequestTime = 0;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const now = Date.now();
  if (now - lastRequestTime < 3000) {
    return res.status(429).json({ message: 'Too many requests. Please wait a moment.' });
  }
  lastRequestTime = now;

  const { name, symbol, supply } = req.body;

  if (!supply || isNaN(supply) || supply <= 0) {
    return res.status(400).json({ message: 'Invalid supply amount' });
  }

  try {
    const decimals = 9;

    // Create mint token
    const mint = await createMint(connection, payer, payer.publicKey, null, decimals);

    // Create associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    // Mint tokens (scaled by decimals)
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      parseInt(supply) * 10 ** decimals
    );

    res.status(200).json({
      message: 'Token minted successfully!',
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      walletAddress: payer.publicKey.toBase58(),  // <-- Add wallet address here
    });
  } catch (err) {
    console.error('Error minting token:', err);
    res.status(500).json({ message: 'Token creation failed', error: err.message });
  }
}
