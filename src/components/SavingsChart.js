// src/components/SavingsChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function SavingsChart({ transactions }) {
  const chartData = React.useMemo(() => {
    let runningBalance = 0;
    const data = [...transactions]
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map(transaction => {
        runningBalance += transaction.amount;
        return {
          date: new Date(transaction.timestamp).toLocaleDateString(),
          balance: runningBalance
        };
      });

    return {
      labels: data.map(d => d.date),
      datasets: [
        {
          label: 'Savings',
          data: data.map(d => d.balance),
          fill: true,
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          tension: 0.4,
        },
      ],
    };
  }, [transactions]);

  return (
    <div className="chart-container">
      <Line 
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: value => `$${value}`
              }
            }
          }
        }}
      />
    </div>
  );
}
