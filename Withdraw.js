import React, { useState } from 'react';

function Withdraw({ onTransaction }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransaction('Withdraw', amount); // This should also be correctly passing the amount
    setAmount('');
};


  const handleCancel = () => {
    setAmount('');
  };

  return (
    <div className="card p-4 mb-3" style={{ width: '950px', margin: '0 auto' }}>
      <h3 className="card-title1 text-center">Withdraw</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn4 btn-primary me-2">Withdraw</button>
        <button type="button" className="btn7 btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default Withdraw;
