import { Connection } from '@solana/web3.js';

async function test() {
    const connection = new Connection('https://sly-boldest-friday.solana-devnet.quiknode.pro/2c133a9e4d5fa904934113e804047cd88517d801/', 'confirmed');
    const version = await connection.getVersion();
    console.log('RPC version:', version);
}

test().catch(console.error);