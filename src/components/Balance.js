// src/components/Balance.js
import React from 'react';

export function Balance({ balance }) {
  const getEmoji = (amount) => {
    if (amount >= 50) return "🌟";
    if (amount >= 20) return "⭐";
    if (amount >= 10) return "✨";
    return "💫";
  };

  return (
    <div className="balance-container">
      <h2 className="balance-title">My Money Box</h2>
      <div className="balance-amount">${balance.toFixed(2)}</div>
      <div className="balance-emoji">{getEmoji(balance)} My Savings</div>
    </div>
  );
}