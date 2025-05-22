'use client';

import { useState } from 'react';
import TokenForm from './components/TokenForm';
import TokenResult from './components/TokenResult';
import TokenBalanceChecker from './components/TokenBalanceChecker';

export default function Home() {
  const [tokenData, setTokenData] = useState(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <TokenForm onTokenCreated={setTokenData} />
      {tokenData && <TokenResult mintAddress={tokenData.mintAddress} tokenAccount={tokenData.tokenAccount} />}
      <TokenBalanceChecker />
    </div>
  );
}
