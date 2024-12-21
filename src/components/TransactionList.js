// TransactionList.js
import React from 'react';

const TransactionList = () => {
  return (
    <div>
      <h3>History</h3>
      <ul>
        <li>
          <span>Sample Transaction 1</span>
          <span>-$10.00</span>
        </li>
        <li>
          <span>Sample Transaction 2</span>
          <span>$20.00</span>
        </li>
      </ul>
    </div>
  );
};

export default TransactionList;
