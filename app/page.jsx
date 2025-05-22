'use client';

import { useState } from 'react';
import TokenForm from './components/TokenForm';
import TokenResult from './components/TokenResult';
import TokenBalanceChecker from './components/TokenBalanceChecker';

export default function Home() {
  const [tokenData, setTokenData] = useState(null);

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          flex: '1 1 480px',
          maxWidth: '480px',
          boxSizing: 'border-box',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          // allow content to expand naturally
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <TokenForm onTokenCreated={setTokenData} />
        {tokenData && (
          <TokenResult
            mintAddress={tokenData.mintAddress}
            tokenAccount={tokenData.tokenAccount}
          />
        )}
      </div>

      <div
        style={{
          flex: '1 1 480px',
          maxWidth: '480px',
          boxSizing: 'border-box',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <TokenBalanceChecker />
      </div>
    </div>
  );
}
