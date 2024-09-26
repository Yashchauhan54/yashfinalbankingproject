import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function BankTransactions() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(0);

  const username = localStorage.getItem('loginuser'); // Get the logged-in username from local storage

  const fetchTransactions = () => {
    const config = {
      method: 'GET',
      url: 'https://api.jsonbin.io/v3/b/66f44783e41b4d34e4378c6f/latest',
      headers: {
        'X-Master-Key': '$2a$10$qAPEIbalyriaFMpiZz7XDeh9e.1rt6g3VQtlC8CZlRRhza.IQT4cO',
      },
    };

    axios(config)
      .then((response) => {
        const allTransactions = Array.isArray(response.data.record) ? response.data.record : [];
        // Filter transactions based on the logged-in user
        const userTransactions = allTransactions.filter((t) => t.username === username);
        setTransactions(userTransactions);

        // Calculate balance for the logged-in user
        const userBalance = userTransactions.reduce((acc, curr) => {
          return curr.type === 'deposit' ? acc + parseFloat(curr.amount) : acc - parseFloat(curr.amount);
        }, 0);
        setBalance(userBalance);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  };

  const handleTransaction = (e) => {
    e.preventDefault();

    const transactionData = {
      username, // Add the logged-in username to the transaction data
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString(),
    };

    const config = {
      method: 'GET',
      url: 'https://api.jsonbin.io/v3/b/66f44783e41b4d34e4378c6f/latest',
      headers: {
        'X-Master-Key': '$2a$10$qAPEIbalyriaFMpiZz7XDeh9e.1rt6g3VQtlC8CZlRRhza.IQT4cO',
      },
    };

    // First fetch existing transactions
    axios(config)
      .then((response) => {
        const allTransactions = Array.isArray(response.data.record) ? response.data.record : [];
        // Append the new transaction to the existing transactions
        const updatedTransactions = [...allTransactions, transactionData];

        // Save the updated transactions to JSON Bin
        const putConfig = {
          method: 'PUT',
          url: 'https://api.jsonbin.io/v3/b/66f44783e41b4d34e4378c6f',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$qAPEIbalyriaFMpiZz7XDeh9e.1rt6g3VQtlC8CZlRRhza.IQT4cO',
          },
          data: JSON.stringify(updatedTransactions),
        };

        return axios(putConfig);
      })
      .then((response) => {
        console.log(response.data);
        setMessage('Transaction successful!');
        fetchTransactions(); // Refresh transactions after successful update
        clearForm();
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Transaction failed.');
      });
  };

  const clearForm = () => {
    setAmount('');
    setType('deposit');
  };

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when the component mounts
  }, []);

  return (
    <div className="container mt-5">
      <h1 className='head text-center' style={{color:'darkred'}}>Bank Transactions</h1>
      <form onSubmit={handleTransaction} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type:</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <button type="submit" className="btn5 btn-primary">Submit</button>
      </form>
      {message && <div className="alert alert-info">{message}</div>}

      <h4 className='text-center' style={{color:'darkred',fontSize:'50px'}}>Total Balance: ${balance.toFixed(2)}</h4>

      <h1 style={{color:'darkred',fontSize:'50px'}}> Transactions for {username}</h1>
      <ul className="list-group mb-4">
        {transactions.map((transaction, index) => (
          <li key={index} className="list-group-item">
            <strong>{transaction.type}</strong> of ${transaction.amount.toFixed(2)} on {new Date(transaction.date).toLocaleString()}
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default BankTransactions;
