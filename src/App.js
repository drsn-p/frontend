import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [solPrice, setSolPrice] = useState(null);

  useEffect(() => {
    // Simulate fetching wallet and balance
    const fetchWalletData = async () => {
      // Mock wallet public key for demonstration
      const mockPublicKey = '3ZtJjSHgiwFg6G7gtet....';
      setWallet({ publicKey: mockPublicKey });

      // Fetch balance
      const { data: balance } = await axios.get(`/api/balance?publicKey=${mockPublicKey}`);
      setBalance(balance);

      // Fetch SOL price
      const { data } = await axios.get('/api/sol-price');
      setSolPrice(data.price);
    };

    fetchWalletData();
  }, []);

  const sendSol = async () => {
    // Logic to send SOL
    const amount = prompt('Enter amount of SOL to send:');
    if (amount && wallet) {
      try {
        const response = await axios.post('/api/send-sol', {
          from: wallet.publicKey,
          to: 'recipient-public-key', // Replace with actual recipient's public key
          amount,
        });
        alert(`Transaction successful! Signature: ${response.data.signature}`);
      } catch (error) {
        alert('Error sending SOL. Please try again.');
      }
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Solana Wallet</h1>
      <div className="wallet-info">
        <h2>Wallet: {wallet?.publicKey || 'No Wallet'}</h2>
        <h3>Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</h3>
        <h3>SOL Price: {solPrice !== null ? `$${solPrice}` : 'Loading...'}</h3>
      </div>
      <button onClick={sendSol} className="btn-send">Send SOL</button>
      <button onClick={() => alert('Generate QR Code logic goes here')} className="btn-generate-qr">Generate QR Code</button>
    </div>
  );
};

export default App;
