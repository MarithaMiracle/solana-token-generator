"use client";

import React, { useState } from "react";

export default function TokenForm() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setMintAddress("");
    setWalletAddress("");

    try {
      const res = await fetch("/api/create-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, symbol, supply }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error minting token");

      setMintAddress(data.mintAddress);
      setWalletAddress(data.tokenAccount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Token Generator</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Token Name:
          <input
            style={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Input Token Name"
            required
          />
        </label>

        <label style={styles.label}>
          Token Symbol:
          <input
            style={styles.input}
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Input Token Symbol"
            required
          />
        </label>

        <label style={styles.label}>
          Supply:
          <input
            style={styles.input}
            type="number"
            min="1"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            placeholder="Input Token Supply, e.g. 100"
            required
          />
        </label>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Minting..." : "Mint Token"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {mintAddress && (
        <div style={styles.result}>
          <p style={styles.resultRow}>
            <strong>Mint Address:</strong>{" "}
            <span
              style={styles.mintAddress}
              onClick={() => copyToClipboard(mintAddress)}
              title="Click to copy"
            >
              {mintAddress}
            </span>
          </p>

          <p style={styles.resultRow}>
            <strong>Wallet Address:</strong>{" "}
            <span
              style={styles.mintAddress}
              onClick={() => copyToClipboard(walletAddress)}
              title="Click to copy"
            >
              {walletAddress}
            </span>
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
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
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
  resultRow: {
    fontSize: 18,
    marginBottom: 14,
  },
  mintAddress: {
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "600",
  },
};
