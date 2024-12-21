// src/App.js
import React from 'react';
import { useState, useEffect } from 'react';
import './styles/App.css';

function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isExpense, setIsExpense] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load saved data
  useEffect(() => {
    const savedBalance = localStorage.getItem('balance');
    const savedTransactions = localStorage.getItem('transactions');
    
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [balance, transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    const newAmount = parseFloat(amount);
    const newTransaction = {
      id: Date.now(),
      amount: isExpense ? -newAmount : newAmount,
      description: description || (isExpense ? 'Spent' : 'Saved'),
      timestamp: new Date().toISOString(),
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => {
      const newBalance = prev + (isExpense ? -newAmount : newAmount);
      // Show celebration for savings milestones
      if (!isExpense && newBalance > prev && newBalance % 10 === 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      return newBalance;
    });
    setAmount('');
    setDescription('');
  };

  const deleteTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    setBalance(prev => prev - transaction.amount);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getEmoji = (amount) => {
    if (amount >= 50) return "🌟";
    if (amount >= 20) return "⭐";
    if (amount >= 10) return "✨";
    return "💫";
  };

  return (
    <div className="app">
      {showCelebration && (
        <div className="celebration">
          <div className="celebration-emoji">🎉</div>
        </div>
      )}
      
      <div className="container">
        <div className="card main-card">
          <h1 className="title">
            <span className="piggy">🐷</span> My Money Box
          </h1>
          
          <div className="balance-container">
            <div className="balance">
              ${balance.toFixed(2)}
            </div>
            <div className="balance-label">
              {getEmoji(balance)} My Savings
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="button-group">
              <button
                type="button"
                onClick={() => setIsExpense(false)}
                className={`button ${!isExpense ? 'save active' : ''}`}
              >
                ✨ Add Money
              </button>
              <button
                type="button"
                onClick={() => setIsExpense(true)}
                className={`button ${isExpense ? 'spend active' : ''}`}
              >
                🎁 Spend
              </button>
            </div>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="How much?"
              className="input"
              step="0.01"
              min="0"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's it for?"
              className="input"
            />

            <button type="submit" className="submit-button">
              Add to My Box
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="title">
            <span className="star">⭐</span> My Money History
          </h2>
          <div className="transactions">
            {transactions.length === 0 ? (
              <div className="no-transactions">
                No transactions yet! Start saving! ✨
              </div>
            ) : (
              transactions.map(transaction => (
                <div
                  key={transaction.id}
                  className={`transaction ${transaction.amount >= 0 ? 'income' : 'expense'}`}
                >
                  <div className="transaction-info">
                    <div className="transaction-description">
                      {transaction.description}
                    </div>
                    <div className="transaction-date">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="transaction-amount-container">
                    <span className="transaction-amount">
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="delete-button"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;