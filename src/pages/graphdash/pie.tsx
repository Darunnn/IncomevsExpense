import React, { useState, useEffect } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  ResponsiveContainer // Optional but recommended for responsiveness
} from "recharts";
import { Transaction } from "@src/components/transactionTypes";

// Color palette for the pie chart
const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#8884D8', // Purple
];

const PieDashboard: React.FC = () => {
  const [categorySummary, setCategorySummary] = useState<{ category: string; value: number }[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryType, setCategoryType] = useState<'expense' | 'income'>('expense');

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      const parsedTransactions: Transaction[] = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const filteredTransactions = transactions.filter(t => 
        categoryType === 'expense' ? t.amount < 0 : t.amount > 0
      );
      
      const summary = calculateCategorySummary(filteredTransactions);
      setCategorySummary(summary);
    }
  }, [transactions, categoryType]);

  const calculateCategorySummary = (transactions: Transaction[]) => {
    return transactions.reduce((acc, transaction) => {
      const existingCategory = acc.find(item => item.category === transaction.category);
      
      if (existingCategory) {
        existingCategory.value += Math.abs(transaction.amount);
      } else {
        acc.push({
          category: transaction.category,
          value: Math.abs(transaction.amount)
        });
      }
      
      return acc;
    }, [] as { category: string, value: number }[]);
  };

  return (
    <div style={{ marginTop: "20px",width: "450px" }}>
         <h2>
        {categoryType === 'expense' 
          ? 'Expense Breakdown by Category' 
          : 'Income Breakdown by Category'}
      </h2>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '10px' 
      }}>
        <button
          onClick={() => setCategoryType('expense')}
          style={{
            marginRight: '10px',
            padding: '5px 10px',
            backgroundColor: categoryType === 'expense' ? '#8884d8' : '#f0f0f0',
            color: categoryType === 'expense' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          รายจ่าย
        </button>
        <button
          onClick={() => setCategoryType('income')}
          style={{
            padding: '5px 10px',
            backgroundColor: categoryType === 'income' ? '#82ca9d' : '#f0f0f0',
            color: categoryType === 'income' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          รายรับ
        </button>
      </div>

     
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categorySummary}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            label={({ category, value }) => `${category}: ${value.toFixed(2)}`}
          >
            {categorySummary.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieDashboard;