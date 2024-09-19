import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react'; // Ensure you have this package installed
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [solPrice, setSolPrice] = useState(null);
  const [recipient, setRecipient] = useState(''); // State for recipient address
  const [amount, setAmount] = useState(''); // State for amount
  const [qrData, setQrData] = useState(null); // State for QR code data

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Mock wallet public key for demonstration
        const mockPublicKey = '6pEy5R6o1CotQvudNTxTNReUaeZF1cGmfCgpGT6B91UY';
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
    if (!wallet) {
      alert('Wallet is not available');
      return;
    }
    if (!recipient || !amount) {
      alert('Please enter both recipient address and amount');
      return;
    }
    try {
      const response = await axios.post('/api/send-sol', {
        from: wallet.publicKey,
        to: recipient,
        amount: parseFloat(amount),
      });
      alert(`Transaction successful! Signature: ${response.data.signature}`);
    } catch (error) {
      console.error('Error sending SOL:', error);
      alert('Error sending SOL. Please check the console for details.');
    }
  };

  const generateQrCode = () => {
    if (wallet) {
      const qrData = `solana:${wallet.publicKey}`;
      setQrData(qrData);
    } else {
      alert('Wallet is not available');
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
      <div className="form-group">
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendSol} className="btn-send">Send SOL</button>
      </div>
      <button onClick={generateQrCode} className="btn-generate-qr">Generate QR Code</button>
      {qrData && <QRCode value={qrData} />}
    </div>
  );
};

export default App;
