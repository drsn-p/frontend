import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [solPrice, setSolPrice] = useState(null);

  useEffect(() => {
    // Fetch wallet and balance
    const fetchWalletData = async () => {
      try {
        // Mock wallet public key for demonstration
        const mockPublicKey = '3ZtJjSHgiwFg6G7gtet....';
        setWallet({ publicKey: mockPublicKey });

        // Fetch balance
        const balanceResponse = await axios.get(`/api/balance?publicKey=${mockPublicKey}`);
        setBalance(balanceResponse.data);

        // Fetch SOL price
        const priceResponse = await axios.get('/api/sol-price');
        setSolPrice(priceResponse.data.price);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Check the console for details.');
      }
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
        console.error('Error sending SOL:', error);
        alert('Error sending SOL. Please check the console for details.');
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
