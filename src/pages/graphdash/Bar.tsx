import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Transaction } from "@src/components/transactionTypes";


const BarDashboard: React.FC = () => {
    const [chartData, setChartData] = useState<{ name: string; Income: number; Expense: number }[]>([]);

    useEffect(() => {
      const storedTransactions = localStorage.getItem("transactions");
      if (storedTransactions) {
        const transactions: Transaction[] = JSON.parse(storedTransactions);
        const monthlyData = calculateMonthlySummary(transactions);
        setChartData(monthlyData);
      }
    }, []);
  
    const calculateMonthlySummary = (transactions: Transaction[]) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const summary: { [key: string]: { Income: number; Expense: number } } = {};
  
      transactions.forEach((t) => {
        const date = new Date(t.date);
        const month = months[date.getMonth()];
  
        if (!summary[month]) {
          summary[month] = { Income: 0, Expense: 0 };
        }
  
        if (t.amount > 0) {
          summary[month].Income += t.amount;
        } else {
          summary[month].Expense += Math.abs(t.amount);
        }
      });
  
      return months.map((month) => ({
        name: month,
        Income: summary[month]?.Income || 0,
        Expense: summary[month]?.Expense || 0,
      }));
    };
  

  return (
    <div style={{ marginTop: "20px" }}>
    <h2>Income vs Expense</h2>
    <BarChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Income" fill="#82ca9d" />
      <Bar dataKey="Expense" fill="#8884d8" />
    </BarChart>
  </div>
  );
};

export default BarDashboard;