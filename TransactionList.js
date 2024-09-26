import React from 'react';

function TransactionList({ transactions, currentBalance }) {
  return (
    <div className="card mt-4">
      <h4 className="text-center">Transaction History</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No transactions found.</td>
            </tr>
          ) : (
            transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.type}</td>
                <td>${txn.amount !== undefined ? txn.amount.toFixed(2) : '0.00'}</td>
                <td>${txn.balance !== undefined ? txn.balance.toFixed(2) : '0.00'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="text-center mt-2">
        <h5>Current Balance: ${currentBalance.toFixed(2)}</h5>
      </div>
    </div>
  );
}

export default TransactionList;
