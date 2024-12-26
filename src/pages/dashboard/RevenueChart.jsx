// src/components/RevenueChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (USD)',
        data: revenueData,
        backgroundColor: [
          '#3b82f6',
          '#ef4444',
          '#22c55e',
          '#eab308',
          '#6366f1',
          '#f43f5e',
          '#10b981',
          '#a855f7',
          '#14b8a6',
          '#f97316',
          '#0ea5e9',
          '#db2777',
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        borderRadius: 5, // Rounded corners for bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: 'Monthly Revenue Overview',
        font: {
          size: 18,
        },
        color: '#111827',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#4b5563',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.2)', // Light grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4b5563',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.2)',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-200 via-white to-blue-100 shadow-2xl rounded-xl">
      <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">Revenue Trends</h2>
      <div className="overflow-x-auto">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Data represents the monthly revenue for the year.
      </p>
    </div>
  );
};

export default RevenueChart;
