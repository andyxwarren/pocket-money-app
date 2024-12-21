// src/components/TransactionForm.js
import React, { useState } from 'react';

export function TransactionForm({ onAddTransaction }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isExpense, setIsExpense] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    onAddTransaction({
      id: Date.now(),
      amount: isExpense ? -parseFloat(amount) : parseFloat(amount),
      description: description || (isExpense ? 'Spent' : 'Saved'),
      timestamp: new Date().toISOString()
    });

    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {/* Form implementation */}
    </form>
  );
}
