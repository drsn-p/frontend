import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Simulate fetching wallet and balance
    setTimeout(() => {
      setWallet({ publicKey: '3ZtJjSHgiwFg6G7gtet....' });
      setBalance(10.5); // Mock balance
    }, 1000);
  }, []);

  const sendSol = () => {
    // Logic to send SOL
    alert('Sending SOL...');
  };

  return (
    <div className="app-container">
      <h1 className="title">Solana Wallet</h1>
      <div className="wallet-info">
        <h2>Wallet: {wallet?.publicKey || 'No Wallet'}</h2>
        <h3>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</h3>
      </div>
      <button onClick={sendSol} className="btn-send">Send SOL</button>
    </div>
  );
};

export default App;
