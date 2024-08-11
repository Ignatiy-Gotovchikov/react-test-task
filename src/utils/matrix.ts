import { Cell } from '../types';

export function generateMatrix(rows: number, cols: number): Cell[][] {
  const maxDimension = 100;
  
  const validRows = Math.min(Math.max(rows, 0), maxDimension);
  const validCols = Math.min(Math.max(cols, 0), maxDimension);
  
  let cellId = 0;
  return Array.from({ length: validRows }, () => 
    Array.from({ length: validCols }, () => ({
      id: cellId++,
      amount: Math.floor(Math.random() * 900) + 100, // случайное число от 100 до 999
    }))
  );
}

export const calculateRowSums = (matrix: Cell[][]): number[] => {
  return matrix.map(row => row.reduce((sum, cell) => sum + cell.amount, 0));
};

export function calculateColumnAverages(matrix: Cell[][]): number[] {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const averages = Array(numCols).fill(0);

  for (let col = 0; col < numCols; col++) {
    let sum = 0;
    for (let row = 0; row < numRows; row++) {
      sum += matrix[row][col].amount;
    }
    averages[col] = sum / numRows;
  }

  return averages;
}
