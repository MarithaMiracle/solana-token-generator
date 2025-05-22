'use client';

import { useState } from 'react';

export default function TokenResult({ mintAddress, tokenAccount }) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}>
      <h3>Token minted successfully!</h3>
      <p>
        <strong>Mint Address:</strong> {mintAddress}{' '}
        <button onClick={() => copyToClipboard(mintAddress)} style={{ marginLeft: '1rem' }}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </p>
      <p>
        <strong>Token Account:</strong> {tokenAccount}{' '}
        <button onClick={() => copyToClipboard(tokenAccount)} style={{ marginLeft: '1rem' }}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </p>
    </div>
  );
}
