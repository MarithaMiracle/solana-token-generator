"use client";

import { useState } from "react";

export default function TokenBalanceChecker() {
  const [walletAddress, setWalletAddress] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkBalance() {
    setLoading(true);
    setError("");
    setBalance(null);

    try {
      const res = await fetch(`/api/get-token-balance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, mintAddress }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch balance");
      } else {
        setBalance(data.balance);
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Check Token Balance</h2>

      <label style={styles.label}>
        Wallet Address:
        <input
          style={styles.input}
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter Wallet Address"
          required
        />
      </label>

      <label style={styles.label}>
        Token Mint Address:
        <input
          style={styles.input}
          type="text"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
          placeholder="Enter Token Mint Address"
          required
        />
      </label>

      <button
        style={styles.button}
        onClick={checkBalance}
        disabled={loading || !walletAddress || !mintAddress}
      >
        {loading ? "Checking..." : "Check Balance"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {balance !== null && (
        <div style={styles.result}>
          <p>
            <strong>Balance:</strong>{" "}
            <span style={styles.balanceValue}>{balance}</span>
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 24,
    borderRadius: 12,
    background: "linear-gradient(135deg, #5e4b8b, #7a5fb4)",
    color: "#e0d7f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow:
      "0 8px 20px rgba(95, 75, 135, 0.6), 0 0 40px rgba(122, 95, 180, 0.7)",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
    fontSize: 24,
  },
  label: {
    display: "block",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    marginTop: 6,
    padding: "12px 16px",
    borderRadius: 8,
    border: "none",
    fontSize: 18,
    outline: "none",
    color: "#3e2a66",
    backgroundColor: "#e0d7f5",
    fontWeight: "600",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    marginTop: 10,
    padding: "14px 16px",
    fontSize: 20,
    fontWeight: "700",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#8b63d9",
    color: "#fff",
    transition: "background-color 0.3s ease",
    width: "100%",
  },
  error: {
    marginTop: 20,
    color: "#ff6b6b",
    fontWeight: "600",
    textAlign: "center",
  },
  result: {
    marginTop: 40,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(255 255 255 / 0.18)",
    boxShadow: "0 4px 12px rgba(123, 95, 180, 0.7)",
    textAlign: "center",
    userSelect: "text",
  },
  balanceValue: {
    backgroundColor: "#6a4ab6",
    padding: "4px 12px",
    borderRadius: 8,
    color: "#e0d7f5",
    fontWeight: "700",
    fontSize: 18,
  },
};
