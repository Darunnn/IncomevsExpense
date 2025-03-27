export interface Transaction {
    id: number;
    text: string;
    amount: number; 
    category: string;
    date: string;
  }
  export const categories: Record<string, string[]> = {
    income: ["เงินเดือน", "โบนัส", "รายได้เสริม"],
    expense: ["อาหาร", "ค่าเดินทาง", "ค่าที่พัก", "อื่นๆ"]
  };