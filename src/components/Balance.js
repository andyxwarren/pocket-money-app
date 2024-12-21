// src/components/Balance.js
import React from 'react';
import { getEmoji } from '../utils/emoji';

export function Balance({ balance }) {
  return (
    <div className="balance-container">
      <h2 className="balance-title">My Money Box</h2>
      <div className="balance-amount">${balance.toFixed(2)}</div>
      <div className="balance-emoji">{getEmoji(balance)} My Savings</div>
    </div>
  );
}
