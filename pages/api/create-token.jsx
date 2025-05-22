import { Connection, Keypair } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';

const RPC_URL = process.env.RPC_URL;
const connection = new Connection(RPC_URL, 'confirmed');

const secretKey = Uint8Array.from(JSON.parse(process.env.PAYER_SECRET_KEY));
const payer = Keypair.fromSecretKey(secretKey);

let lastRequestTime = 0;

async function ensurePayerFunded() {
  const balance = await connection.getBalance(payer.publicKey);
  if (balance < 1e9) {
    console.log('Funding payer...');
    const sig = await connection.requestAirdrop(payer.publicKey, 1e9); // 1 SOL
    await connection.confirmTransaction(sig);
    console.log('Payer funded.');
  }
}

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
    await ensurePayerFunded();

    const mint = await createMint(connection, payer, payer.publicKey, null, 9);

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      BigInt(supply) * 10n ** 9n // decimals 9
    );

    res.status(200).json({
      message: `Token minted successfully!`,
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
    });
  } catch (err) {
    console.error('Error minting token:', err);
    res.status(500).json({ message: 'Token creation failed', error: err.message });
  }
}
