"use client";
import { useState } from 'react';

export default function TokenForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, symbol, supply }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to create token');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Create Solana Token</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Name (optional):<br />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Token Name"
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Symbol (optional):<br />
            <input
              type="text"
              value={symbol}
              onChange={e => setSymbol(e.target.value)}
              placeholder="Token Symbol"
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Supply (required):<br />
            <input
              type="number"
              min="1"
              value={supply}
              onChange={e => setSupply(e.target.value)}
              placeholder="Total Supply"
              required
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? 'Creating...' : 'Create Token'}
        </button>
      </form>

      {error && (
        <p style={{ marginTop: 12, color: 'red' }}>
          Error: {error}
        </p>
      )}

      {result && (
        <div style={{ marginTop: 12, padding: 12, background: '#e0ffe0', borderRadius: 6 }}>
          <p><strong>{result.message}</strong></p>
          <p><strong>Mint Address:</strong> <code>{result.mintAddress}</code></p>
          <p><strong>Token Account:</strong> <code>{result.tokenAccount}</code></p>
        </div>
      )}
    </div>
  );
}
