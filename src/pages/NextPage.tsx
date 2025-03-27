import React, { useState, useEffect } from "react";
import { Transaction, categories } from "../components/transactionTypes";
import "./css/incomeExpense.css";

const IncomeExpense: React.FC = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // ✅ บันทึกข้อมูลลง localStorage ทุกครั้งที่ transactions เปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // ✅ คำนวณยอดคงเหลือ
  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

  // ✅ ฟังก์ชันเพิ่มรายการใหม่
  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !amount || !category) return;

    const newTransaction: Transaction = {
      id: Date.now(), // ใช้ timestamp แทน transactions.length + 1 เพื่อป้องกัน ID ซ้ำ
      text,
      amount: type === "expense" ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      category,
      date,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  // ✅ ฟังก์ชันลบรายการ
  const deleteTransaction = (id: number) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?")) {
      const updatedTransactions = transactions.filter((t) => t.id !== id);
      setTransactions(updatedTransactions);
    }
  };

  // ✅ ฟังก์ชันกรองรายการ
  const filteredTransactions = transactions.filter((t) => {
    return (
      (filterCategory ? t.category === filterCategory : true) &&
      (filterType !== "all" ? (filterType === "income" ? t.amount > 0 : t.amount < 0) : true)
    );
  });

  return (
    <div className="container">
      <h2>รายรับ-รายจ่าย</h2>
      <h3>ยอดคงเหลือ: {totalBalance.toFixed(2)} บาท</h3>

      {/* ✅ ฟอร์มเพิ่มรายการ */}
      <form onSubmit={addTransaction}>
        <input type="text" placeholder="ชื่อรายการ" value={text} onChange={(e) => setText(e.target.value)} required />
        <input type="number" placeholder="จำนวนเงิน" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")}>
          <option value="income">รายรับ</option>
          <option value="expense">รายจ่าย</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">-- เลือกหมวดหมู่ --</option>
          {categories[type].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button type="submit">เพิ่มรายการ</button>
      </form>

      {/* ✅ ฟอร์มกรองข้อมูล */}
      <div style={{ marginTop: "10px" }}>
        <h3>🔍 เลือกหมวดหมู่ที่ต้องการดู</h3>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">-- แสดงทั้งหมด --</option>
          {Object.values(categories).flat().map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <h3>🔍 เลือกประเภท</h3>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}>
          <option value="all">ทั้งหมด</option>
          <option value="income">เฉพาะรายรับ</option>
          <option value="expense">เฉพาะรายจ่าย</option>
        </select>
      </div>

      {/* ✅ ตารางแสดงรายการ */}
      <ul className="transaction-list">
  {filteredTransactions.length > 0 ? (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>ชื่อรายการ</th>
          <th>หมวดหมู่</th>
          <th>จำนวนเงิน</th>
          <th>วันที่</th>
          <th>การจัดการ</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((t) => (
          <tr key={t.id} className={t.amount < 0 ? "expense-row" : "income-row"}>
            <td>{t.text}</td>
            <td>{t.category}</td>
            <td className="amount">{t.amount.toFixed(2)} บาท</td>
            <td>{t.date}</td>
            <td>
              <button className="delete-btn" onClick={() => deleteTransaction(t.id)}>❌ ลบ</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="no-data">ไม่มีรายการที่ตรงกับเงื่อนไข</p>
  )}
</ul>
    </div>
  );
};

export default IncomeExpense;
